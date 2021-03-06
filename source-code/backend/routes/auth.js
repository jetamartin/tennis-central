const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const { createToken } = require("../helpers/tokens");
const ExpressError = require("../expressError");

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.register(req.body);
    const token = createToken(newUser);
    return res
      .status(201)
      .json({
        userinfo: { token, userId: newUser.id, username: newUser.username, firstName: newUser.firstName },
      });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    const token = await createToken(user);
    return res.json({
      userinfo: { token, userId: user.id, username: user.username, firstName: user.firstName },
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = { router };
