"use strict";
process.env.NODE_ENV = "test";
const app = require("./app");
const { PORT } = require("./config");
const { sequelize } = require("./db");

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    // Establish connection to DB
    await sequelize.authenticate();
  } catch (error) {
    // console.error("Unable to connect to the database:", error);
  }
});
