const { Sequelize } = require('sequelize');
require('dotenv').config();

// Database configuration for different environments
const config = {
  development: {
    dialect: 'sqlite',
    storage: './server/database/development.sqlite',
    logging: console.log, // Enable logging in development
  },
  test: {
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  },
  production: {
    dialect: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'revolutionary_saas',
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    logging: false,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

// Create Sequelize instance
const sequelize = new Sequelize(dbConfig);

// Test the connection
const testConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    return true;
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error.message);
    return false;
  }
};

module.exports = {
  sequelize,
  testConnection,
  config,
};