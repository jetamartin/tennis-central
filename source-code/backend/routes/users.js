const express = require("express");
const router = express.Router();
const { User } = require("../models/User");
const ExpressError = require("../ExpressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

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
  }
});

// Sample code to generate error messages from validation errors
// if (error.name === "SequelizeValidationError") {
//   return res.status(400).json({
//     error: {
//       message: error.errors.map((e) => e.message),
//     },
//   });

router.get("/:userId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) throw new ExpressError(404, "User not found");
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:userId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    // First check to see if requested record exist in db
    const userId = req.params.userId;
    const result = await User.update(req.body, {
      where: { id: userId },
      returning: true,
    });
    if (result[0] === 0) throw new ExpressError(404, "User not found");
    const user = result[1][0].get();
    return res.status(200).json({ user });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:userId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const userId = req.params.id;
    const result = await User.destroy({
      where: { id: userId },
      returning: true,
    });
    if (result === 0) throw new ExpressError(404, "User not found");
    return res.status(200).json({ deleted: userId });
  } catch (error) {
    return next(error);
  }
});

// ?? shouldn't I be exporting userRouter?? rather than router
module.exports = { router };
