const express = require("express");
const cors = require("cors");
const app = express();
const { router: usersRouter } = require("./routes/users");
const { router: messagesRouter } = require("./routes/messages");
const { router: partnersRouter } = require("./routes/partners");
const { sequelize } = require("./db");
const { seedData} = require("./seed");

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);
app.use("/messages", messagesRouter);
app.use("/partners", partnersRouter);

app.listen(3001, async () => {
  console.log("Server is running on port 3001");
  try {
    // Establish connection to DB
    await sequelize.authenticate();
    // Synchronizes all Models with the DB by dropping DB table and
    // re-creating it to match model attributes    //
    await sequelize.sync({ force: true });
    console.log("Connection has been established successfully.");
    await seedData(); 
    console.log("Database has been seeded successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }

});
