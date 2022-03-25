const mongoose = require("mongoose");

const gabaritoSchema = new mongoose.Schema({
  data: { type: Date, default: Date.now },
  status: { type: Boolean, default: true },
  numeros: [],
  valorDoPremio: { type: Number, default: 0.0 },
  clienteName: { type: String, default: 'Cliente avulso'},
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  vendedorId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios"},
  gerenteId: { type: mongoose.Schema.Types.ObjectId, ref: "usuarios" },
  tipo: {
    type: String,
    enum: ["GIRO","CRUZ","LINHA", "COLUNA","CANTOS","JANELINHA","JANELAO","CHEIA","L","X"]
  }
});

module.exports = Gabarito = mongoose.model("gabaritos", gabaritoSchema);
