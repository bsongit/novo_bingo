const mongoose = require("mongoose");

const transacaoSchema = new mongoose.Schema({
  data: { type: Date },
  status: { type: Boolean, default: true },
  valor: { type: Number, default: 0 },
  documento: String,
  taxaComissao: { type: Number, default: 0 },
  vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  gerenteId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" }
});

module.exports = Transacao = mongoose.model("transacoes", transacaoSchema);
