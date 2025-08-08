const { sequelize } = require('../config/database');
const User = require('./User');
const Project = require('./Project');
const Task = require('./Task');
const Activity = require('./Activity');

// Define associations
User.hasMany(Project, { 
  foreignKey: 'ownerId', 
  as: 'ownedProjects' 
});
Project.belongsTo(User, { 
  foreignKey: 'ownerId', 
  as: 'owner' 
});

Project.hasMany(Task, { 
  foreignKey: 'projectId', 
  as: 'tasks',
  onDelete: 'CASCADE' 
});
Task.belongsTo(Project, { 
  foreignKey: 'projectId', 
  as: 'project' 
});

User.hasMany(Task, { 
  foreignKey: 'assigneeId', 
  as: 'assignedTasks' 
});
Task.belongsTo(User, { 
  foreignKey: 'assigneeId', 
  as: 'assignee' 
});

User.hasMany(Task, { 
  foreignKey: 'createdById', 
  as: 'createdTasks' 
});
Task.belongsTo(User, { 
  foreignKey: 'createdById', 
  as: 'creator' 
});

// Self-referencing association for subtasks
Task.hasMany(Task, { 
  foreignKey: 'parentTaskId', 
  as: 'subtasks' 
});
Task.belongsTo(Task, { 
  foreignKey: 'parentTaskId', 
  as: 'parentTask' 
});

// Activity associations
User.hasMany(Activity, { 
  foreignKey: 'userId', 
  as: 'activities' 
});
Activity.belongsTo(User, { 
  foreignKey: 'userId', 
  as: 'user' 
});

Project.hasMany(Activity, { 
  foreignKey: 'projectId', 
  as: 'activities' 
});
Activity.belongsTo(Project, { 
  foreignKey: 'projectId', 
  as: 'project' 
});

Task.hasMany(Activity, { 
  foreignKey: 'taskId', 
  as: 'activities' 
});
Activity.belongsTo(Task, { 
  foreignKey: 'taskId', 
  as: 'task' 
});

// Project Members (Many-to-Many)
const ProjectMember = sequelize.define('ProjectMember', {
  role: {
    type: sequelize.Sequelize.ENUM('owner', 'admin', 'member', 'viewer'),
    defaultValue: 'member',
  },
  joinedAt: {
    type: sequelize.Sequelize.DATE,
    defaultValue: sequelize.Sequelize.NOW,
  },
}, {
  tableName: 'project_members',
  timestamps: true,
});

User.belongsToMany(Project, {
  through: ProjectMember,
  foreignKey: 'userId',
  otherKey: 'projectId',
  as: 'projects'
});

Project.belongsToMany(User, {
  through: ProjectMember,
  foreignKey: 'projectId',
  otherKey: 'userId',
  as: 'members'
});

// Export all models and sequelize instance
module.exports = {
  sequelize,
  User,
  Project,
  Task,
  Activity,
  ProjectMember,
  
  // Initialize database
  initializeDatabase: async () => {
    try {
      // Test connection
      await sequelize.authenticate();
      console.log('✅ Database connection established successfully.');
      
      // Sync all models (force recreate in development)
      await sequelize.sync({ force: true });
      console.log('✅ Database models synchronized successfully.');
      
      return true;
    } catch (error) {
      console.error('❌ Database initialization failed:', error);
      return false;
    }
  },
  
  // Seed database with initial data (disabled - users can add their own data)
  seedDatabase: async () => {
    try {
      console.log('🎯 Database initialized - ready for user data.');
      return true;
    } catch (error) {
      console.error('❌ Database seeding failed:', error);
      return false;
    }
  },
};