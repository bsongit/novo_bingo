const express = require('express')
const { randomCode } = require("../utils/geradores");
const router = express.Router()
const Pedido = require('../models/Pedido')
const Cartela = require('../models/Cartela')
const Usuario = require('../models/Usuario')
const Parametro = require('../models/Parametro')
const Transacao = require('../models/Transacao')

router.get("/", async (req, res) => {
    try {
      const result = await Pedido.find({status: true});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/validados/", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, validado: true});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/ativos", async (req, res) => {
    try {
      const result = await Pedido.find({status: true,}).populate('vendedorId');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/desative", async (req, res) => {
    try {
      const result = await Pedido.updateOne({_id : req.body._id},{status: false, validade: false})
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/:id", async (req, res) => {
    try {
      const result = await Pedido.findOne({_id : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/codigo/:codigo", async (req, res) => {
    try {
      const result = await Pedido.findOne({status: true, codigo : req.params.codigo});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Pedido.create({...req.body, codigo: randomCode()});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });
  router.post("/admin/create", async (req, res) => {
    try {
      const cartela = await Cartela.findOne({codigo : req.body.cartelaCodigo}).select('_id');
      if(cartela){
        const parametro = await Parametro.findOne({}).select('valorCartelaAtual');
        const vendedor = await Usuario.findOne({_id : req.body.vendedorId}).select('tutorId comissao');
        const transacao = await Transacao.create({data: req.body.data, valor: parametro.valorCartelaAtual, taxaComissao: vendedor.comissao, gerenteId: vendedor.tutorId, vendedorId: vendedor._id,});
        const result = await Pedido.create({...req.body, listaCartelasId : [cartela._id], gerenteId: vendedor.tutorId, valorCadaCartela : parametro.valorCartelaAtual, transacaoId: transacao._id, codigo: randomCode() });
        res.send('Pedido criado com sucesso!');
      }
      else{
        res.send('Cartela não encontrada no banco de dados!');
      }

    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Pedido.updateOne({_id: req.body._id},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/gerente/:id", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, gerenteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/gerente/validados/:id", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, validado: true, gerenteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/vendedor/:id", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, vendedorId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/vendedor/validados/:id", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, validado: true, vendedorId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


  router.get("/cliente/:id", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, clienteId : req.params._id});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/populate/cartelas", async (req, res) => {
    try {
      const result = await Pedido.findOne({_id : req.body._id}).populate('listaCartelasId')
      res.json(result.listaCartelasId);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/validos-populados", async (req, res) => {
    try {
      const result = await Pedido.find({status: true, validade: true}).select('listaCartelasId').populate('listaCartelasId')
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/intervalo", async (req, res) => {
    try {
      let result = []; 
      if(!req.body.gerenteId){
          result = await Pedido.find({
            validade: true,
            data: {
            $gt: req.body.dataInicial, 
            $lt: req.body.dataFinal? req.body.dataFinal : new Date()
            }}).populate('gerenteId vendedorId');
      }
      else if(req.body.gerenteId && !req.body.vendedorId){
          result = await Pedido.find({
            validade: true,
            gerenteId: req.body.gerenteId,
            data: {
            $gt: req.body.dataInicial, 
            $lt: req.body.dataFinal? req.body.dataFinal : new Date()
            }}).populate('gerenteId vendedorId');
      }
      else if(req.body.gerenteId && req.body.vendedorId){
          result = await Pedido.find({
            validade: true,
            gerenteId: req.body.gerenteId,
            vendedorId: req.body.vendedorId,
            data: {
            $gt: req.body.dataInicial, 
            $lt: req.body.dataFinal? req.body.dataFinal : new Date()
            }}).populate('gerenteId vendedorId');
      }
      res.send(result);
    } catch (error) {
      res.json(error);
    }
  });




module.exports = router
