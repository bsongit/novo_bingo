const mongoose = require("mongoose");

const cartelaSchema = new mongoose.Schema({
  codigo: { type: String, required: true, unique: true },
  numeros: { type: String, required: true, unique: true }
});

module.exports = Cartela = mongoose.model("cartelas", cartelaSchema);
