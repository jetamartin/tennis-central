const { User } = require("./User");
const { Message } = require("./Message");
const { Partner } = require("./Partner");

/* All Relationships go here */

// Users + Messages
Message.belongsTo(User, { as: "fromUser" });
Message.belongsTo(User, { as: "toUser" });
User.hasMany(Message, { foreignKey: "fromUserId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "toUserId", as: "receivedMessages" });

module.exports = {
  User,
  Partner,
  Message,
};
