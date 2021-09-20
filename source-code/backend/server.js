"use strict";

const app = require("./app");
const { PORT } = require("./config");
const { sequelize } = require("./db");

// app.listen(PORT, function () {
//   console.log(`Started on http://localhost:${PORT}`);
// });

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  try {
    // Establish connection to DB
    await sequelize.authenticate();
    //
    // // Synchronizes all Models with the DB by dropping DB table and
    // // re-creating it to match model attributes    //
    // await sequelize.sync({ force: true });
    // // console.log("Connection has been established successfully.");
    // await seedData();
    // // console.log("Database has been seeded successfully");
  } catch (error) {
    // console.error("Unable to connect to the database:", error);
  }
});

