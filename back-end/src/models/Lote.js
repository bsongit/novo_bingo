const mongoose = require("mongoose");

const loteSchema = new mongoose.Schema({
  listaCartelasId: [],
  numero: { type: Number, required: true},
});

module.exports = Lote = mongoose.model("lotes", loteSchema);
