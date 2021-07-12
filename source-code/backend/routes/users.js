const express = require("express");
const router = express.Router();
const { User } = require("../models/User");

/* 
  get /users  (read)
  post /users (create)
  get /users/:id (read)
  patch /users/:id (update)
  delete /users/:id (delete)
 */

router.get("", async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

router.post("", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

router.patch("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

router.delete("/:id", (req, res) => {
  res.json({ id: req.params.id });
});

module.exports = { router };
