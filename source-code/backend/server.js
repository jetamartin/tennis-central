"use strict";
// process.env.NODE_ENV ="test";
// process.env.NODE_ENV = "dev";
const app = require("./app");
const { PORT } = require("./config");
const { sequelize } = require("./db");

debugger;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    debugger;
    // Establish connection to DB
    await sequelize.authenticate();
    // if ((process.env.NODE_ENV = "test")) {
    //   // await sequelize.sync({ force: true });
    //   // console.log("Connection has been established successfully.");
    //   // await seedData();
    // }
  } catch (error) {
    // console.error("Unable to connect to the database:", error);
  }
});
