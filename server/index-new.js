const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const path = require('path');
require('dotenv').config();

// Import database models and setup
const { 
  sequelize, 
  User, 
  Project, 
  Task, 
  Activity, 
  ProjectMember, 
  initializeDatabase, 
  seedDatabase 
} = require('./models');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

// Middleware
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../client/build')));

// Database initialization
let isDbInitialized = false;

const initDB = async () => {
  if (!isDbInitialized) {
    const success = await initializeDatabase();
    if (success) {
      await seedDatabase();
      isDbInitialized = true;
      console.log('🎉 Database ready for use!');
    } else {
      console.error('❌ Failed to initialize database');
      process.exit(1);
    }
  }
};

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);
  
  socket.on('join_project', (projectId) => {
    socket.join(`project_${projectId}`);
    console.log(`User ${socket.id} joined project ${projectId}`);
  });
  
  socket.on('leave_project', (projectId) => {
    socket.leave(`project_${projectId}`);
    console.log(`User ${socket.id} left project ${projectId}`);
  });
  
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    database: isDbInitialized ? 'Connected' : 'Disconnected'
  });
});

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user in database
    const user = await User.findOne({ where: { email } });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    await user.update({ lastLoginAt: new Date() });
    
    res.json({ 
      user: user.toJSON(),
      token: `mock_token_${user.id}` // In production, use JWT
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = await User.create({
      email,
      name,
      password,
      role: 'member'
    });
    
    res.json({ 
      user: newUser.toJSON(),
      token: `mock_token_${newUser.id}`
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Projects routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({
      include: [
        {
          model: User,
          as: 'owner',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'members',
          attributes: ['id', 'name', 'email'],
          through: { attributes: ['role'] }
        },
        {
          model: Task,
          as: 'tasks',
          attributes: ['id', 'status']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    // Format response to include task counts
    const formattedProjects = projects.map(project => {
      const tasks = project.tasks || [];
      const completedTasks = tasks.filter(t => t.status === 'done').length;
      
      return {
        ...project.toJSON(),
        tasks: tasks.length,
        completed: completedTasks,
        team: project.members ? project.members.map(m => m.name) : []
      };
    });
    
    res.json(formattedProjects);
  } catch (error) {
    console.error('Get projects error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/projects', async (req, res) => {
  try {
    const { name, description, status, priority, ownerId, startDate, endDate, budget, color } = req.body;
    
    const newProject = await Project.create({
      name,
      description,
      status: status || 'planning',
      priority: priority || 'medium',
      ownerId: ownerId || '1', // Default to first user for demo
      startDate,
      endDate,
      budget,
      color: color || '#3B82F6'
    });
    
    // Get the project with owner info
    const projectWithOwner = await Project.findByPk(newProject.id, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }]
    });
    
    // Emit to all connected clients
    io.emit('project_created', projectWithOwner);
    
    res.json(projectWithOwner);
  } catch (error) {
    console.error('Create project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await project.update(req.body);
    
    // Get updated project with owner info
    const updatedProject = await Project.findByPk(projectId, {
      include: [{
        model: User,
        as: 'owner',
        attributes: ['id', 'name', 'email']
      }]
    });
    
    // Emit to all connected clients
    io.emit('project_updated', updatedProject);
    
    res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findByPk(projectId);
    
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    await project.destroy();
    
    // Emit to all connected clients
    io.emit('project_deleted', projectId);
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error('Delete project error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Tasks routes
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        },
        {
          model: User,
          as: 'creator',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    
    // Format response to match frontend expectations
    const formattedTasks = tasks.map(task => ({
      ...task.toJSON(),
      assignee: task.assignee ? task.assignee.name : 'Unassigned',
      project: task.project ? task.project.name : 'No Project',
      dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : null
    }));
    
    res.json(formattedTasks);
  } catch (error) {
    console.error('Get tasks error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/tasks', async (req, res) => {
  try {
    const { title, description, status, priority, projectId, assigneeId, createdById, dueDate, tags } = req.body;
    
    const newTask = await Task.create({
      title,
      description,
      status: status || 'todo',
      priority: priority || 'medium',
      projectId,
      assigneeId,
      createdById: createdById || '1', // Default to first user for demo
      dueDate,
      tags: tags || []
    });
    
    // Get the task with related data
    const taskWithData = await Task.findByPk(newTask.id, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ]
    });
    
    // Create activity
    await Activity.create({
      type: 'task_created',
      title: 'New task created',
      description: `Task "${title}" was created`,
      userId: createdById || '1',
      projectId,
      taskId: newTask.id
    });
    
    // Emit to all connected clients
    io.emit('task_created', taskWithData);
    
    res.json(taskWithData);
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.put('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    const oldStatus = task.status;
    await task.update(req.body);
    
    // Get updated task with related data
    const updatedTask = await Task.findByPk(taskId, {
      include: [
        {
          model: User,
          as: 'assignee',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        }
      ]
    });
    
    // Create activity for status change
    if (req.body.status && req.body.status !== oldStatus) {
      let activityType = 'task_updated';
      let activityDescription = `Task "${task.title}" status changed to ${req.body.status}`;
      
      if (req.body.status === 'done') {
        activityType = 'task_completed';
        activityDescription = `Task "${task.title}" was completed`;
        await task.update({ completedAt: new Date() });
      }
      
      await Activity.create({
        type: activityType,
        title: activityType === 'task_completed' ? 'Task completed' : 'Task updated',
        description: activityDescription,
        userId: req.body.updatedBy || '1',
        projectId: task.projectId,
        taskId: task.id
      });
    }
    
    // Emit to all connected clients
    io.emit('task_updated', updatedTask);
    
    res.json(updatedTask);
  } catch (error) {
    console.error('Update task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    const task = await Task.findByPk(taskId);
    
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    
    await task.destroy();
    
    // Emit to all connected clients
    io.emit('task_deleted', taskId);
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Delete task error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Activities routes
app.get('/api/activities', async (req, res) => {
  try {
    const activities = await Activity.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email']
        },
        {
          model: Project,
          as: 'project',
          attributes: ['id', 'name']
        },
        {
          model: Task,
          as: 'task',
          attributes: ['id', 'title']
        }
      ],
      order: [['createdAt', 'DESC']],
      limit: 50
    });
    
    // Format response to match frontend expectations
    const formattedActivities = activities.map(activity => ({
      ...activity.toJSON(),
      user: activity.user ? activity.user.name : 'Unknown User',
      timestamp: activity.createdAt.toISOString()
    }));
    
    res.json(formattedActivities);
  } catch (error) {
    console.error('Get activities error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Users routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role', 'isActive', 'lastLoginAt', 'createdAt']
    });
    
    res.json(users);
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Analytics routes
app.get('/api/analytics/overview', async (req, res) => {
  try {
    const [totalProjects, totalTasks, completedTasks, totalUsers] = await Promise.all([
      Project.count(),
      Task.count(),
      Task.count({ where: { status: 'done' } }),
      User.count()
    ]);
    
    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      totalUsers,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Catch-all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('🚨 Server error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
  try {
    // Initialize database first
    await initDB();
    
    // Start the server
    server.listen(PORT, () => {
      console.log(`🚀 Revolution SaaS Server running on port ${PORT}`);
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🌐 CORS enabled for: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('🛑 SIGINT received, shutting down gracefully...');
  await sequelize.close();
  process.exit(0);
});

module.exports = { app, server, io };