const express = require("express");
const router = express.Router();
const { Message } = require("../models");
const ExpressError = require("../expressError");

/* 
  get /messages  (read)
  post /messages (create)
  get /messages/:id (read)
  patch /messages/:id (update)
  delete /messages/:id (delete)
 */

router.get("/users/:userId/messages", async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    const messages = await Message.findAll({ where: { fromUserId: userId } });
    return res.status(201).json({ messages });
  } catch (error) {
    console.log(error);
  }
});

router.post("/users/:userId/messages", async (req, res, next) => {
  try {
    const fromUserId = +req.params.userId;
    const msgBody = req.body;
    msgBody.fromUserId = fromUserId;
    const message = await Message.create(msgBody);
    res.json({ message });
  } catch (error) {
    console.log(error);
  }
});

router.get("/users/:userId/messages/:id", async (req, res, next) => {
  try {
    // ??? Do I need the users or will I only need the message id?
    const userId = +req.params.userId;
    const message = await Message.findOne({ where: { id: req.params.id }, returning: true });
    if (!message) throw new ExpressError(404, "User not found");
    return res.json({ message });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.patch("/users/:userId/messages/:id", async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    const result = await Message.update(req.body, { where: { id: +req.params.id }, returning: true  });
    if (result[0] === 0) throw new ExpressError(404, "Message not found");
    const message = result[1][0].get();
    res.status(200).json({ message });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

router.delete("/users/:userId/messages/:id", async (req, res, next) => {
  try {
    const requestedId = req.params.id;
    const result = await Message.destroy({
      where: { id: requestedId },
      returning: true,
    });
    if (result === 0) throw new ExpressError(404, "Message not found");
    return res.status(200).json({ deleted: requestedId });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = { router };
