const express = require('express')
const router = express.Router()
const Cartela = require('../models/Cartela')

router.get("/", async (req, res) => {
    try {
      const result = await Cartela.find({});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Cartela.findOne({_id : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Cartela.create({...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Cartela.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/encontrar-por-numeros", async (req, res) => {
    try {
    const result = await Cartela.find({numeros : new RegExp(req.body.regexpString)});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/delete", async (req, res) => {
    try {
      const result = await Cartela.findOne({}).skip(Math.floor(Math.random() * 10));
      const deleted = await Cartela.remove({_id: result._id})
      res.json(deleted);
    } catch (error) {
      res.json(error);
    }
  });

module.exports = router
