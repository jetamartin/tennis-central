const { User } = require("./User");
const { Message } = require("./Message");
const { Partner } = require("./Partner");

/* All Relationships go here */

// Users + Messages
Message.belongsTo(User, { as: "fromUser" });
Message.belongsTo(User, { as: "toUser" });
User.hasMany(Message, { foreignKey: "fromUserId", as: "sentMessages" });
User.hasMany(Message, { foreignKey: "toUserId", as: "receivedMessages" });

Partner.belongsTo(User, { as: "player" });
Partner.belongsTo(User, { as: "partner" });
User.hasMany(Partner, { foreignKey: "playerId", as: "players" });
User.hasMany(Partner, { foreignKey: "partnerId", as: "partners" });

module.exports = {
  User,
  Partner,
  Message,
};
