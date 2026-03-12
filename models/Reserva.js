const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Usuario",
    required: true
  },
  cpf: {
    type: String,
    required: true,
    trim: true
  },
  produto: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Catalogo",
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Reserva", ReservaSchema);