const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [1, 255],
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('todo', 'in-progress', 'review', 'done', 'cancelled'),
    defaultValue: 'todo',
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium',
  },
  progress: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    validate: {
      min: 0,
      max: 100,
    },
  },
  estimatedHours: {
    type: DataTypes.DECIMAL(8, 2),
    allowNull: true,
  },
  actualHours: {
    type: DataTypes.DECIMAL(8, 2),
    defaultValue: 0,
  },
  dueDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  tags: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
  metadata: {
    type: DataTypes.JSON,
    defaultValue: {},
  },
  // Foreign keys
  projectId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id',
    },
  },
  assigneeId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  createdById: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
  parentTaskId: {
    type: DataTypes.UUID,
    allowNull: true,
    references: {
      model: 'tasks',
      key: 'id',
    },
  },
}, {
  tableName: 'tasks',
  timestamps: true,
  indexes: [
    {
      fields: ['status'],
    },
    {
      fields: ['priority'],
    },
    {
      fields: ['projectId'],
    },
    {
      fields: ['assigneeId'],
    },
    {
      fields: ['dueDate'],
    },
    {
      fields: ['createdAt'],
    },
  ],
});

module.exports = Task;