const { DataTypes } = require('sequelize');

// Import the Sequelize instance for database connection
const sequelize = require('../database');

// Define the Seller model using Sequelize's define method
const Seller = sequelize.define('Seller', {
  // Define the id property as an auto-incrementing integer and the primary key
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  // Define the name property as a string and make it required
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  // Define the email property as a string, make it required, unique, and validate it as an email
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
});

// Export the Seller model for use in other parts of the application
module.exports = Seller;