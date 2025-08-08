const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  type: {
    type: DataTypes.ENUM(
      'task_created',
      'task_updated',
      'task_completed',
      'task_deleted',
      'project_created',
      'project_updated',
      'project_completed',
      'project_deleted',
      'comment_added',
      'user_joined',
      'user_left',
      'milestone_reached',
      'file_uploaded',
      'status_changed'
    ),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  // Foreign keys
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  projectId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'projects',
      key: 'id',
    },
  },
  taskId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
}, {
  tableName: 'activities',
  timestamps: true,
  indexes: [
    {
      fields: ['type'],
    },
    {
      fields: ['userId'],
    },
    {
      fields: ['projectId'],
    },
    {
      fields: ['createdAt'],
    },
  ],
});

module.exports = Activity;