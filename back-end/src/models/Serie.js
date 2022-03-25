const mongoose = require("mongoose");

const serieSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  tamanhoInicial: {type: Number, default: 0},
  listaCartelasId: [],
  vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  gerenteId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  numero: Number,
  printNumber: {type: Number, default: 0},
  tipo: {
    type: String,
    enum: ["GERENTE", "VENDEDOR"]
  }
});

module.exports = Serie = mongoose.model("series", serieSchema);
