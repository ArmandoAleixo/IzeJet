const mongoose = require("mongoose");

const CatalogoSchema = new mongoose.Schema({

produto:{
type:String,
required:true
},

descricao:{
type:String,
required:true
},

preco:{
type:Number,
required:true
}

});

module.exports = mongoose.model("Catalogo", CatalogoSchema);