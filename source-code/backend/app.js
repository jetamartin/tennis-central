const express = require("express");
const cors = require("cors");
const app = express();

const { authenticateJWT } = require("./middleware/auth");
const { router: authRouter } = require("./routes/auth");
const { router: usersRouter } = require("./routes/users");
const { router: messagesRouter } = require("./routes/messages");
const { router: partnersRouter } = require("./routes/partners");
// const { sequelize } = require("./db");
// const { seedData } = require("./seed");
const ErrorRequest = require("./expressError");
// const PORT = process.env.PORT || 3001;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.get("/favicon..ico", (req, res) => res.sendStatus(204));
app.use(authenticateJWT);

app.use("/auth", authRouter);

app.use("/users", usersRouter);
app.use("", messagesRouter);
app.use("", partnersRouter);
app.use((req, res, next) => {
  const error = new ErrorRequest(404, "Page not found");
  next(error);
});

app.use((error, req, res, next) => {
  // Default status is 500: Server Internal Error
  let status = error.status || 500;
  let message = error.msg;

  return res.status(status).json({
    error: { message, status },
  });
});

module.exports = app; 
