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

// Mock data storage (in production, use a real database)
let users = [
  {
    id: '1',
    email: 'demo@revolution.com',
    name: 'Demo User',
    password: 'demo123', // In production, hash passwords
    role: 'admin',
    preferences: {
      theme: 'dark',
      notifications: true,
      sound: true,
      animations: true
    },
    stats: {
      tasksCompleted: 42,
      projectsCreated: 8,
      streakDays: 7,
      totalPoints: 1250
    }
  }
];

let projects = [
  {
    id: '1',
    name: 'Product Redesign',
    description: 'Complete overhaul of the main product interface',
    progress: 65,
    tasks: 12,
    completed: 8,
    dueDate: '2024-03-01',
    team: ['Sarah Chen', 'Alex Kim', 'David Park'],
    status: 'active',
    priority: 'high',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'E-commerce Platform',
    description: 'Build a new e-commerce platform from scratch',
    progress: 35,
    tasks: 24,
    completed: 8,
    dueDate: '2024-04-15',
    team: ['Mike Johnson', 'Lisa Wang', 'Tom Brown'],
    status: 'active',
    priority: 'medium',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Mobile App',
    description: 'Develop a companion mobile app',
    progress: 85,
    tasks: 18,
    completed: 15,
    dueDate: '2024-02-28',
    team: ['Emma Wilson', 'Chris Lee', 'Anna Garcia'],
    status: 'active',
    priority: 'high',
    createdAt: new Date().toISOString()
  }
];

let tasks = [
  {
    id: '1',
    title: 'Design System Implementation',
    description: 'Create and implement a comprehensive design system for the new product',
    status: 'in-progress',
    priority: 'high',
    assignee: 'Sarah Chen',
    dueDate: '2024-02-15',
    project: 'Product Redesign',
    tags: ['Design', 'UI/UX'],
    progress: 75,
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'API Integration',
    description: 'Integrate third-party APIs for payment processing',
    status: 'todo',
    priority: 'medium',
    assignee: 'Mike Johnson',
    dueDate: '2024-02-20',
    project: 'E-commerce Platform',
    tags: ['Backend', 'API'],
    progress: 0,
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'User Testing',
    description: 'Conduct user testing sessions for the new mobile app',
    status: 'done',
    priority: 'low',
    assignee: 'Emma Wilson',
    dueDate: '2024-02-10',
    project: 'Mobile App',
    tags: ['Testing', 'UX'],
    progress: 100,
    createdAt: new Date().toISOString()
  }
];

let activities = [
  {
    id: '1',
    type: 'task_completed',
    user: 'Sarah Chen',
    action: 'completed the task',
    target: 'Design System Implementation',
    timestamp: new Date().toISOString()
  },
  {
    id: '2',
    type: 'comment',
    user: 'Mike Johnson',
    action: 'commented on',
    target: 'API Integration task',
    timestamp: new Date(Date.now() - 5 * 60000).toISOString()
  },
  {
    id: '3',
    type: 'task_created',
    user: 'Emma Wilson',
    action: 'created a new task',
    target: 'User Testing Session',
    timestamp: new Date(Date.now() - 10 * 60000).toISOString()
  }
];

// API Routes

// Auth routes
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user (in production, verify hashed password)
    const user = users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ 
      user: userWithoutPassword,
      token: `mock_token_${user.id}` // In production, use JWT
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    
    // Check if user exists
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      password, // In production, hash password
      role: 'user',
      preferences: {
        theme: 'dark',
        notifications: true,
        sound: true,
        animations: true
      },
      stats: {
        tasksCompleted: 0,
        projectsCreated: 0,
        streakDays: 0,
        totalPoints: 0
      }
    };
    
    users.push(newUser);
    
    // Remove password from response
    const { password: _, ...userWithoutPassword } = newUser;
    
    res.json({ 
      user: userWithoutPassword,
      token: `mock_token_${newUser.id}`
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Projects routes
app.get('/api/projects', (req, res) => {
  res.json(projects);
});

app.post('/api/projects', (req, res) => {
  const newProject = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  projects.push(newProject);
  
  // Emit to all connected clients
  io.emit('project_created', newProject);
  
  res.json(newProject);
});

app.put('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  projects[projectIndex] = { ...projects[projectIndex], ...req.body };
  
  // Emit to all connected clients
  io.emit('project_updated', projects[projectIndex]);
  
  res.json(projects[projectIndex]);
});

app.delete('/api/projects/:id', (req, res) => {
  const projectId = req.params.id;
  const projectIndex = projects.findIndex(p => p.id === projectId);
  
  if (projectIndex === -1) {
    return res.status(404).json({ error: 'Project not found' });
  }
  
  projects.splice(projectIndex, 1);
  
  // Emit to all connected clients
  io.emit('project_deleted', projectId);
  
  res.json({ message: 'Project deleted successfully' });
});

// Tasks routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    ...req.body,
    createdAt: new Date().toISOString()
  };
  
  tasks.push(newTask);
  
  // Add activity
  activities.unshift({
    id: Date.now().toString(),
    type: 'task_created',
    user: req.body.assignee || 'Unknown User',
    action: 'created a new task',
    target: newTask.title,
    timestamp: new Date().toISOString()
  });
  
  // Emit to all connected clients
  io.emit('task_created', newTask);
  io.emit('activity_added', activities[0]);
  
  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  const oldTask = tasks[taskIndex];
  tasks[taskIndex] = { ...oldTask, ...req.body };
  
  // Add activity if status changed
  if (req.body.status && req.body.status !== oldTask.status) {
    const activityType = req.body.status === 'done' ? 'task_completed' : 'task_updated';
    const action = req.body.status === 'done' ? 'completed the task' : 'updated the task';
    
    activities.unshift({
      id: Date.now().toString(),
      type: activityType,
      user: req.body.assignee || oldTask.assignee,
      action,
      target: tasks[taskIndex].title,
      timestamp: new Date().toISOString()
    });
    
    io.emit('activity_added', activities[0]);
  }
  
  // Emit to all connected clients
  io.emit('task_updated', tasks[taskIndex]);
  
  res.json(tasks[taskIndex]);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Task not found' });
  }
  
  tasks.splice(taskIndex, 1);
  
  // Emit to all connected clients
  io.emit('task_deleted', taskId);
  
  res.json({ message: 'Task deleted successfully' });
});

// Activities route
app.get('/api/activities', (req, res) => {
  res.json(activities);
});

// Analytics routes
app.get('/api/analytics/overview', (req, res) => {
  const overview = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    totalProjects: projects.length,
    activeProjects: projects.filter(p => p.status === 'active').length,
    productivity: Math.round(Math.random() * 30 + 70), // Mock data
    teamEfficiency: Math.round(Math.random() * 20 + 80) // Mock data
  };
  
  res.json(overview);
});

app.get('/api/analytics/charts', (req, res) => {
  // Mock chart data
  const chartData = {
    productivity: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.round(Math.random() * 40 + 60)
    })),
    tasks: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      value: Math.round(Math.random() * 20 + 5)
    }))
  };
  
  res.json(chartData);
});

// Catch all handler: send back React's index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);
  
  // Join user to their personal room
  socket.on('join_user_room', (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined their room`);
  });
  
  // Handle real-time task updates
  socket.on('task_update', (data) => {
    socket.broadcast.emit('task_updated', data);
  });
  
  // Handle real-time comments
  socket.on('add_comment', (data) => {
    // Add to activities
    const activity = {
      id: Date.now().toString(),
      type: 'comment',
      user: data.user,
      action: 'commented on',
      target: data.target,
      timestamp: new Date().toISOString()
    };
    
    activities.unshift(activity);
    
    // Broadcast to all clients
    io.emit('activity_added', activity);
    io.emit('comment_added', data);
  });
  
  // Handle user presence
  socket.on('user_online', (userId) => {
    socket.broadcast.emit('user_status_changed', { userId, status: 'online' });
  });
  
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Handle user going offline
    socket.broadcast.emit('user_status_changed', { userId: socket.userId, status: 'offline' });
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5001;

server.listen(PORT, () => {
  console.log(`🚀 Revolution SaaS Server running on port ${PORT}`);
  console.log(`📱 Client URL: ${process.env.CLIENT_URL || 'http://localhost:3000'}`);
  console.log(`🌟 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔥 Server ready! Visit http://localhost:3000 to see the app`);
});

module.exports = { app, server, io }; 