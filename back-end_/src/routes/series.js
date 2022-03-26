const express = require('express')
const router = express.Router()
const Serie = require('../models/Serie');
const { generateSerie, generateSerieVendedor } = require('../utils/geradores');

router.get("/", async (req, res) => {
    try {
      const result = await Serie.find({status: true});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Serie.findOne({_id : req.body.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = req.body.vendedorId? generateSerieVendedor(req.body) : generateSerie(req.body)
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Serie.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/tipo/gerente", async (req, res) => {
    try {
      const result = req.body.perfil == 'GERENTE'?  await Serie.find({tipo: 'GERENTE',gerenteId: req.body._id}).populate('gerenteId vendedorId') : await Serie.find({tipo: 'GERENTE'}).populate('gerenteId vendedorId');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/tipo/vendedor", async (req, res) => {
    try {
      const result = req.body.perfil == 'GERENTE'?  await Serie.find({tipo: 'VENDEDOR', gerenteId: req.body._id}).populate('gerenteId vendedorId') : await Serie.find({tipo: 'VENDEDOR'}).populate('gerenteId vendedorId');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


  router.get("/gerente/:id", async (req, res) => {
    try {
      const result = await Serie.find({status: true, gerenteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/gerente/tipo/:id", async (req, res) => {
    try {
      const result = await Serie.find({status: true, tipo: 'GERENTE', gerenteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/vendedor/:id", async (req, res) => {
    try {
      const result = await Serie.find({status: true, vendedorId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/vendedor/tipo/:id", async (req, res) => {
    try {
      const result = await Serie.find({status: true, tipo: 'VENDEDOR', vendedorId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/intervalo", async (req, res) => {
    try {
      const result = await Serie.find({data: {
        $gte: req.body.dataInicial, 
        $lt: req.body.dataFinal
    }});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
