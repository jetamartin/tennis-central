const express = require("express");
const router = express.Router();
const { Message } = require("../models/message");

/* 
  get /messages  (read)
  post /messages (create)
  get /messages/:id (read)
  patch /messages/:id (update)
  delete /messages/:id (delete)
 */

router.get("", async (req, res) => {
  const messages = await Message.findAll();
  res.json(messages);
});

router.post("", async (req, res) => {
  const message = await Message.create(req.body);
  res.json(message);
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
