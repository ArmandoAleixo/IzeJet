const express = require("express");
const router = express.Router();
const Catalogo = require("../models/Catalogo");
const auth = require("../middleware/auth");

router.post("/",auth,async(req,res)=>{

const {produto,descricao,preco} = req.body;

const item = new Catalogo({

produto,
descricao,
preco

});

await item.save();

res.json(item);

});

router.get("/",async(req,res)=>{

const itens = await Catalogo.find();

res.json(itens);

});

module.exports = router;