const express = require("express");
const router = express.Router();
const { Partner } = require("../models/partner");
/* 
  get /partners  (read)
  post /partners (create)
  get /partners/:id (read)
  patch /partners/:id (update)
  delete /partners/:id (delete)
 */
  router.get("", async (req, res) => {
    const partners = await Partner.findAll();
    res.json(partners);
  });
  
  router.post("", async (req, res) => {
    const partner = await Partner.create(req.body);
    res.json(partner);
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