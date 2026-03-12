const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true
  },
  senha: {
    type: String,
    required: true
  },
  cpf: {
    type: String,
    required: true,
    unique: true,
    trim: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Usuario", UsuarioSchema);