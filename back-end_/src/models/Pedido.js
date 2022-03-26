const mongoose = require("mongoose");
const Cartela = require("./Cartela");

const pedidoSchema = new mongoose.Schema({
  data: { type: Date},
  status:   {type: Boolean, default: true },
  validade:   {type: Boolean, default: true },
  codigo: { type: String, required: true},
  valorCadaCartela: { type: Number, default: 0.0 },
  listaCartelasId: [{type: mongoose.Schema.Types.ObjectId, ref: "cartelas"}],
  clienteNome: { type: String, default: 'Cliente avulso'},
  vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  gerenteId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  transacaoId: { type: mongoose.Schema.Types.ObjectId, ref: "transacoes" },
  tipo: {
    type: String,
    enum: ["AVULSO", "ONLINE"],
    default: 'AVULSO'
  }
});

module.exports = Pedido = mongoose.model("pedidos", pedidoSchema);
