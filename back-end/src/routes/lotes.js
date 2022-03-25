const express = require('express')
const router = express.Router()
const Lote = require('../models/Lote');
const { generateLote } = require("../utils/geradores");

router.get("/", async (req, res) => {
    try {
      const result = await Lote.find({});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Lote.findOne({_id : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", (req, res) =>  {
    generateLote(req.body.qtdCartelas/1000)
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Lote.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
