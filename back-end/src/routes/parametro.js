const express = require('express')
const router = express.Router()
const Parametro = require('../models/Parametro')

router.get("/", async (req, res) => {
  try {
    const result = await Parametro.findOne({});
    res.json(result);
  } catch (error) {
    res.json(error);
  }
});

router.get("/privado/", async (req, res) => {
    try {
      const result = await Parametro.findOne({}).select('gerentesDoGiro batidasAtivas');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/limitado/", async (req, res) => {
    try {
      const result = await Parametro.findOne({})
      .select(['vendaBloqueada', 
      'valorCartelaAtual', 
      'urlLiveStream', 
      'baseComissaoGerente', 
      'baseComissaoVendedor',
      'valorLinha',
      'valorColuna',
      'valorCruz?',
      'valorCantos',
      'valorCheia',
      'valorL',
      'valorX',
      'valorJanelinha',
      'valorJanelao',
      'valorGiro',
      'valorSuperGiro',
      'raffleNumbers'
    ]);
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/banner/", async (req, res) => {
    try {
      const result = await Parametro.findOne({}).select('banner');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/regulamento/", async (req, res) => {
    try {
      const result = await Parametro.findOne({}).select('regulamento');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.get("/premios/", async (req, res) => {
    try {
      const result = await Parametro.findOne({}).select('mensagemPremios');
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.post("/create", async (req, res) => {
    try {
      const result = await Parametro.create({...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });

  router.put("/update", async (req, res) => {
    try {
      const result = await Parametro.updateMany({},{...req.body});
      res.json(result);
    } catch (error) {
      res.json(error);
    }
  });


module.exports = router
