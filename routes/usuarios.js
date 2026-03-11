const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req,res)=>{

const {email,senha,cpf} = req.body;

try{

const cpfExiste = await Usuario.findOne({cpf});

if(cpfExiste){
return res.status(400).json({msg:"CPF já cadastrado"});
}

const hash = await bcrypt.hash(senha,10);

const usuario = new Usuario({

email,
senha:hash,
cpf

});

await usuario.save();

res.json(usuario);

}catch(err){

res.status(500).send(err);

}

});

router.post("/login", async(req,res)=>{

const {email,senha} = req.body;

try{

const usuario = await Usuario.findOne({email});

if(!usuario){
return res.status(400).json({msg:"Usuário não encontrado"});
}

const senhaValida = await bcrypt.compare(senha,usuario.senha);

if(!senhaValida){
return res.status(400).json({msg:"Senha inválida"});
}

const token = jwt.sign(
{id:usuario._id},
process.env.JWT_SECRET,
{expiresIn:"1h"}
);

res.json({token});

}catch(err){

res.status(500).send(err);

}

});

module.exports = router;