const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");
const auth = require("../middleware/auth");

router.post("/",auth,async(req,res)=>{

const {usuario,cpf,produto} = req.body;

const reserva = new Reserva({

usuario,
cpf,
produto

});

await reserva.save();

res.json(reserva);

});

router.get("/",auth,async(req,res)=>{

const reservas = await Reserva.find()
.populate("usuario")
.populate("produto");

res.json(reservas);

});

module.exports = router;