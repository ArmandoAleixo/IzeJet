const express = require("express");
const router = express.Router();
const Reserva = require("../models/Reserva");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    try {
        const { usuario, cpf, produto } = req.body;

        if (!usuario || !cpf || !produto) {
            return res.status(400).json({ msg: "Por favor, preencha todos os campos obrigatórios." });
        }

        const reserva = new Reserva({
            usuario,
            cpf,
            produto
        });

        await reserva.save();
        res.status(201).json(reserva);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor ao criar reserva." });
    }
});

router.get("/", auth, async (req, res) => {
    try {
        const reservas = await Reserva.find()
            .populate("usuario", "-senha")
            .populate("produto");

        res.json(reservas);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor ao buscar reservas." });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { cpf, produto } = req.body;
        let reserva = await Reserva.findById(req.params.id);

        if (!reserva) {
            return res.status(404).json({ msg: "Reserva não encontrada." });
        }

        reserva.cpf = cpf || reserva.cpf;
        reserva.produto = produto || reserva.produto;

        await reserva.save();
        res.json(reserva);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor ao atualizar reserva." });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const reserva = await Reserva.findById(req.params.id);

        if (!reserva) {
            return res.status(404).json({ msg: "Reserva não encontrada." });
        }

        await reserva.deleteOne();
        res.json({ msg: "Reserva cancelada com sucesso." });
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor ao cancelar reserva." });
    }
});

module.exports = router;