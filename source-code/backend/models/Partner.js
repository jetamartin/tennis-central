const { Sequelize, DataTypes, ENUM } = require("sequelize");
const { sequelize } = require("../db");
// Imported so I could reference user model for foreign key reference

// Model Definition
const Partner = sequelize.define("Partner", {
  contact: {
    // Contact info is added by the user..not part of user_id
    //{"contact: {"email": email, "tel_num": string}}
    // SQL Query syntax for accessin gemail: SELECT contact ->> 'email' AS email  from public."Partners";
    type: DataTypes.JSONB,
  },
});

module.exports = { Partner };
