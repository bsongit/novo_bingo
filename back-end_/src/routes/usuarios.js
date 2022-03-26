const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')

router.get("/", async (req, res) => {
    try {
      const result = await Usuario.find({});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Usuario.findOne({_id : req.body.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Usuario.create({...req.body});
      res.json(result);
    } catch (error) {
      res.status(200).json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Usuario.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/clientes", async (req, res) => {
    try {
      const result = await Usuario.find({perfil: 'CLIENTE'});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/vendedores", async (req, res) => {
    try {
      const result =  req.body.perfil == 'GERENTE'? await Usuario.find({perfil: 'VENDEDOR' ,tutorId : req.body._id}) : await Usuario.find({perfil: 'VENDEDOR'})
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/gerentes", async (req, res) => {
    try {
      const result = await Usuario.find({perfil: 'GERENTE'});
      res.send(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/populate-tutor", async (req, res) => {
    try {
      const result = await Usuario.findOne({_id: req.body._id}).select('tutorId').populate('tutorId');
      res.send(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
