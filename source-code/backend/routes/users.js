const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const ExpressError = require("../ExpressError");

/* 
  get /users  (read)
  post /users (create)
  get /users/:id (read)
  patch /users/:id (update)
  delete /users/:id (delete)
 */

router.get("", async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt", "password", "telNum"] },
    });
    res.json({ users });
  } catch (error) {
    console.log(error);
  }
});

// Sample code to generate error messages from validation errors
// if (error.name === "SequelizeValidationError") {
//   return res.status(400).json({
//     error: {
//       message: error.errors.map((e) => e.message),
//     },
//   });

router.get("/:id", async (req, res, next) => {
  try {
    // debugger;
    const requestedId = req.params.id;
    const user = await User.findOne({ where: { id: requestedId } });
    if (!user) throw new ExpressError(404, "User not found");
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    // debugger;
    // First check to see if requested record exist in db
    const requestedId = req.params.id;
    const result = await User.update(req.body, {
      where: { id: requestedId },
      returning: true,
    });
    if (result[0] === 0) throw new ExpressError(404, "User not found");
    const user = result[1][0].get();
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const requestedId = req.params.id;
    const result = await User.destroy({
      where: { id: requestedId },
      returning: true,
    });
    console.log("Result ======>", result);
    if (result === 0) throw new ExpressError(404, "User not found");
    return res.status(200).json({ deleted: requestedId });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// ?? shouldn't I be exporting userRouter?? rather than router
module.exports = { router };
