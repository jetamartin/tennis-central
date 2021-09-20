const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

// Model Definition
const Partner = sequelize.define("Partner", {
  contact: {
    // Contact info is added by the user..not part of user_id
    //{"contact: {"email": email, "tel_num": string}}
    // SQL Query syntax for accessin gemail: SELECT contact ->> 'email' AS email  from public."Partners";
    type: DataTypes.JSONB,
    defaultValue: {},
  },
});

module.exports = { Partner };
