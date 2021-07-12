const express = require("express");
const cors = require("cors");
const app = express();
const { router: usersRouter } = require("./routes/users");
const { sequelize } = require('./db');

app.use(express.json());
app.use(cors());
app.use("/users", usersRouter);


app.listen(3001, async() => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  console.log("Server is running on port 3001");
});

