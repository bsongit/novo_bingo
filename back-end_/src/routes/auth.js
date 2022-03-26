const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')

router.post("/sign-in", async (req, res) => {
    try {
      const user = await Usuario.findOne({email: req.body.email});
      if(!user){
        res.json({menssage: 'Email inválido!'})
      }
      else if(user.senha != req.body.senha){
        res.json({menssage: 'Senha inválida!'})
      }
      else{
        res.json({
          _id: user._id, 
          nome: user.nome, 
          status: user.status, 
          perfil: user.perfil, 
          endereco: user.endereco,
          email: user.email,
          telefone: user.telefone,
          tutorId: user.tutorId, 
        })
      }
    } catch (error) {
      res.json(error);
    }
  });

  module.exports = router