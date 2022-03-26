const express = require('express')
const router = express.Router()
const Gabarito = require('../models/Gabarito')

router.get("/", async (req, res) => {
    try {
      const result = await Gabarito.find({status: true});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Gabarito.findOne({_id : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Gabarito.create({...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Gabarito.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/tipo/:tipo", async (req, res) => {
    try {
      const result = await Gabarito.find({status: true, tipo:  req.params.tipo});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/intervalo", async (req, res) => {
    try {
      const result = await Gabarito.find({data: {
        $gte: req.body.dataInicial, 
        $lt: req.body.dataFinal
    }});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/gerente/:id", async (req, res) => {
    try {
      const result = await Gabarito.find({gerenteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/vendedor/:id", async (req, res) => {
    try {
      const result = await Gabarito.find({vendedorId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/cliente/:id", async (req, res) => {
    try {
      const result = await Gabarito.find({clienteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  


module.exports = router
