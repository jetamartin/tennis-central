const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");
const { user } = require("../models/user");
// Model Definition
const Message = sequelize.define(
"Message", 
{ // Model attributes are defined here
  to_user: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    references: {
      // This is a reference to another model
      model: user,
      // This is the column name of the referenced model
      key: 'id',

      // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
      // deferrable: Deferrable.INITIALLY_IMMEDIATE
      // Options:
      // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
      // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
      // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    }
  },
  from_user: {
    type: DataTypes.INTEGER,
    // allowNull: false,
    // references: {
    //   // This is a reference to another model
    //   model: user,
    //   // This is the column name of the referenced model
    //   key: 'id',

    //   // With PostgreSQL, it is optionally possible to declare when to check the foreign key constraint, passing the Deferrable type.
    //   // deferrable: Deferrable.INITIALLY_IMMEDIATE
    //   // Options:
    //   // - `Deferrable.INITIALLY_IMMEDIATE` - Immediately check the foreign key constraints
    //   // - `Deferrable.INITIALLY_DEFERRED` - Defer all foreign key constraint check to the end of a transaction
    //   // - `Deferrable.NOT` - Don't defer the checks at all (default) - This won't allow you to dynamically change the rule in a transaction
    // }
  },
  msg_sent_date: {
    // Date and Time message was sent
    type: DataTypes.DATE,
    // allowNull: false
  },

  msg_subject: {
    type: DataTypes.STRING,
    // allowNull: false,
  },

  msg_content: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  msg_read: {
    type: DataTypes.BOOLEAN,
    // allowNull: false,
  },

}
);

module.exports = { Message };