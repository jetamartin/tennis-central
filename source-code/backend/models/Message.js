const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");
// const { User } = require("../models/User");

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

// Message.belongsTo(User, { as: "fromUser" });
// Message.belongsTo(User, { as: "toUser" });
// User.hasMany(Message, { foreignKey: "fromUserId", as: "sentMessages" });
// User.hasMany(Message, { foreignKey: "toUserId", as: "receivedMessages" });

module.exports = { Message };
