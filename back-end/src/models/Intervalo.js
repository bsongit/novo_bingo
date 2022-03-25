const mongoose = require("mongoose");

const intervaloSchema = new mongoose.Schema({
  dataInicial: {type: Date , required: true, unique: true },
  dataFinal: {type: Date , unique: true },
  qtdGerada: {type: Number , default: 0},
  qtdRestante: {type: Number , default: 0},
  status: {type: Boolean , default: true}
});

module.exports = Intervalo = mongoose.model("intervalos", intervaloSchema);
