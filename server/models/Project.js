const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
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
    type: DataTypes.ENUM('planning', 'active', 'on-hold', 'completed', 'cancelled'),
    defaultValue: 'planning',
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
  startDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  budget: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
  },
  color: {
    type: DataTypes.STRING,
    defaultValue: '#3B82F6',
    validate: {
      is: /^#[0-9A-F]{6}$/i,
    },
  },
  isArchived: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  settings: {
    type: DataTypes.JSON,
    defaultValue: {
      visibility: 'team',
      allowGuestAccess: false,
      autoArchive: false,
    },
  },
  // Foreign key for project owner
  ownerId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
}, {
  tableName: 'projects',
  timestamps: true,
  indexes: [
    {
      fields: ['status'],
    },
    {
      fields: ['ownerId'],
    },
    {
      fields: ['createdAt'],
    },
  ],
});

module.exports = Project;