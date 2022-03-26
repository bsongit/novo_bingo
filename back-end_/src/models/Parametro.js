const mongoose = require('mongoose')

const parametroSchema = new mongoose.Schema({
  raffleNumbers:  { type: [], default: [] },
  vendaBloqueada: { type: Boolean, default: false },
  urlLiveStream: String,
  regulamento: String,
  mensagemPremios: String,
  banner: String,
  baseComissaoGerente: Number,
  baseComissaoVendedor: Number,
  valorCartelaAtual: { type: Number, default: 0 },
  dataDoSorteio: Date,
  gerentesDoGiro: [],
  valorLinha:  { type: Number, default: 0 },
  valorColuna:  { type: Number, default: 0 },
  valorCruz:  { type: Number, default: 0 },
  valorCantos:  { type: Number, default: 0 },
  valorCheia:  { type: Number, default: 0 },
  valorL:  { type: Number, default: 0 },
  valorX:  { type: Number, default: 0 },
  valorJanelinha:  { type: Number, default: 0 },
  valorJanelao:  { type: Number, default: 0 },
  valorGiro:  { type: Number, default: 0 },
  valorSuperGiro:  { type: Number, default: 0 },
  
})

module.exports = Parametro = mongoose.model('parametro', parametroSchema)
