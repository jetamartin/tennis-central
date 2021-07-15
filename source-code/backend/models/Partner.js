const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");
// Imported so I could reference user model for foreign key reference
const { user } = require("../models/user");


// Model Definition
const Partner = sequelize.define(
  "Partner", 
  {
    user_id: {
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
    partner_id: {
      type: DataTypes.INTEGER,
      allowNuml: false,
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
    contact: {
      // Contact info is added by the user..not part of user_id
      //{"contact: {"email": email, "tel_num": string}}
     // SQL Query syntax for accessin gemail: SELECT contact ->> 'email' AS email  from public."Partners";
      type: DataTypes.JSONB
    },

  }
);



module.exports = { Partner };