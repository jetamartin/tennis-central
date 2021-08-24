const express = require("express");
const cors = require("cors");
const app = express();

const { authenticateJWT } = require("./middleware/auth");
const { router: authRouter } = require("./routes/auth");
const { router: usersRouter } = require("./routes/users");
const { router: messagesRouter } = require("./routes/messages");
const { router: partnersRouter } = require("./routes/partners");
const { sequelize } = require("./db");
const { seedData } = require("./seed");
const ErrorRequest = require("./ExpressError");
const PORT = process.env.PORT || 3001;
//process.env.DATABASE_URL,

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get('/favicon..ico', (req, res) => res.sendStatus(204));
app.use(authenticateJWT);

app.use("/auth", authRouter); 
app.use("/users", usersRouter);
// app.use("/users/:userId/messages", messagesRouter);
app.use("", messagesRouter);

// app.use("/users/:userId/partners", partnersRouter);
app.use("", partnersRouter);



app.use(( req, res, next) => {
  debugger;
  const error = new ErrorRequest(404, "Page not found");
  next(error)
});

app.use((error, req, res, next) => {
  // Default status is 500: Server Internal Error 
  let status = error.status || 500;
  let message = error.msg;

  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, async () => {
// app.listen(3001, async () => {
  // console.log("Server is running on port 3001");
  try {
    // Establish connection to DB
    await sequelize.authenticate();
    // Synchronizes all Models with the DB by dropping DB table and
    // re-creating it to match model attributes    //
    await sequelize.sync({ force: true });
    // console.log("Connection has been established successfully.");
    await seedData();
    // console.log("Database has been seeded successfully");
  } catch (error) {
    // console.error("Unable to connect to the database:", error);
  }
});
