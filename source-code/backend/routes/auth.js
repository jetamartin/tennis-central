const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const ExpressError = require("../ExpressError");

router.post("/register", async (req, res, next) => {
  try {
    const newUser = await User.register(req.body);
    debugger;
    const token = "123";
    return res
      .status(201)
      .json({
        userinfo: { token, userId: newUser.id, username: newUser.username },
      });
  } catch (error) {
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    // const validator = jsonschema.validate(req.body, userAuthSchema);
    // if (!validator.valid) {
    //   const errs = validator.errors.map(e => e.stack);
    //   throw new BadRequestError(errs);
    // }

    const { username, password } = req.body;
    const user = await User.authenticate(username, password);
    // const token = createToken(user);
    const token = 123;
    return res.json({
      userinfo: { token, userId: user.id, username: user.username },
    });
  } catch (err) {
    return next(err);
  }
});

module.exports = { router };
