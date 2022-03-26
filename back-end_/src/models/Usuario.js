const mongoose = require('mongoose');
const _ = require('lodash');

const usuarioSchema = new mongoose.Schema({
  data: { type: Date},
  status: { type: Boolean, default: true },
  tutorId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  perfil: {
    type: String,
    enum: ['ADMIN','SUBADMIN', 'GERENTE', 'VENDEDOR']
  },
  endereco: { type: String, default: '' },
  comissao: { type: Number, default : 0.0},
  nome: { type: String, unique: true  , required: true },
  email: { type: String, unique: true  , required: true },
  senha: { type: String, required: true},
  telefone: { type: String, unique: true }
});

module.exports = Usuario = mongoose.model('usuarios', usuarioSchema);
