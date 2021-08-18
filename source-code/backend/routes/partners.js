const express = require("express");
const router = express.Router();
const { Partner } = require("../models");
const { User } = require("../models");
const ExpressError = require("../ExpressError");
const { ensureCorrectUserOrAdmin } = require("../middleware/auth");

/* 
  get /partners  (read)
  post /partners (create)
  get /partners/:id (read)
  patch /partners/:id (update)
  delete /partners/:id (delete)
 */
router.get("/users/:userId/partners", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const userId = +req.params.userId;
    let partners = await Partner.findAll({
      include: [{ model: User, as: "partner" }],
      where: { playerId: userId },
    });

    if (partners === null) {
      partners = [];
    }

    return res.status(200).json(partners);
  } catch (error) {
    return next(error);
  }
});

// ************** Previous route ********************
// router.post("", async (req, res) => {
// router.post("/users/:userId/partners/", ensureCorrectUserOrAdmin, async (req, res, next) => {
//   try {
//     debugger
//     const playerId = +req.params.userId;
//     const partnerBody = req.body;
//     partnerBody.playerId = playerId;
//     const partner = await Partner.create(partnerBody);
//     return res.status(201).json({ partner });
//   } catch (error) {
//     return next(error);
//   }
// });

router.post("/users/:userId/partners/:partnerId", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    debugger
    const playerId = +req.params.userId;
    const partnerId = +req.params.partnerId;
    const partner = await Partner.create({
      partnerId, playerId
    })

    return res.status(201).json({ partner });
  } catch (error) {
    return next(error)
  }
})

// router.get("/:id", async (req, res, next) => {
router.get("/users/:userId/partners/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const playerId = +req.params.userId;
    const partnerId = +req.params.id;
    // const partner = await Partner.findOne({ where: { id: req.params.id } });
    const partner = await Partner.findOne({ where: { partnerId: partnerId } });

    if (!partner) throw new ExpressError(404, "User not found");
    return res.json({ partner });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// router.patch("/:id", async (req, res, next) => {
router.patch("/users/:userId/partners/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const playerId = +req.params.userId;
    const partnerId = +req.params.id;
    const partnerBody = req.body;
    // partnerBody.playerId = playerId;
    const result = await Partner.update(partnerBody, {
      where: { id: partnerId },
      returning: true,
    });
    if (result[0] === 0) throw new ExpressError(404, "Partner not found");
    const partner = result[1][0].get();
    res.status(200).json({ partner });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// router.delete("/:id", async (req, res, next) => {
router.delete("/users/:userId/partners/:id", ensureCorrectUserOrAdmin, async (req, res, next) => {
  try {
    const playerId = +req.params.userId;
    const requestedId = +req.params.id;
    const result = await Partner.destroy({
      where: { id: requestedId },
      returning: true,
    });
    if (result === 0) throw new ExpressError(404, "Partner not found");
    return res.status(200).json({ deleted: requestedId });
  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = { router };
