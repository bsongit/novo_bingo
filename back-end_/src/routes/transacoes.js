const express = require('express')
const router = express.Router()
const Transacao = require('../models/Transacao')

router.get("/", async (req, res) => {
    try {
      const result = await Transacao.find({});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Transacao.findOne({_id : req.body.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Transacao.create({...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Transacao.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
