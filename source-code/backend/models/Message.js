const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");

// Model Definition
const Message = sequelize.define("Message", {
  // Model attributes are defined here

  sentDate: {
    // Date and Time message was sent
    type: DataTypes.DATE,
    // allowNull: false
  },

  subject: {
    type: DataTypes.STRING,
    // allowNull: false,
  },

  content: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  read: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
  },
});

module.exports = { Message };
