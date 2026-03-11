const mongoose = require("mongoose");

const ReservaSchema = new mongoose.Schema({

usuario:{
type:mongoose.Schema.Types.ObjectId,
ref:"Usuario"
},

cpf:{
type:String,
required:true
},

produto:{
type:mongoose.Schema.Types.ObjectId,
ref:"Catalogo"
}

});

module.exports = mongoose.model("Reserva", ReservaSchema);