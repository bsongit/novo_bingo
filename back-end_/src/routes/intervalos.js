const express = require('express')
const router = express.Router()
const Intervalo = require('../models/Intervalo')

router.get("/", async (req, res) => {
    try {
      const result = await Intervalo.find({});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Intervalo.findOne({_id : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Intervalo.create({...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Intervalo.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/current", async (req, res) => {
    try {
      const result = await Intervalo.findOne({status: true});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
