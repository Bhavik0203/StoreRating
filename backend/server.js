// server.js
const app = require('./app');
const sequelize = require('./config/database');
const models = require('./models');

// Set the port
const PORT = process.env.PORT || 5000;

// Database connection and server start
const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    
    // Sync database tables (use {force: true} to reset tables in development)
    await sequelize.sync({ force: false });
    console.log('Database tables synchronized.');
    
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
};

// Run the server
startServer();