const express = require("express");
const router = express.Router();
const Catalogo = require("../models/Catalogo");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
    try {
        const { produto, descricao, preco } = req.body;

        if (!produto || !descricao || preco == null) {
            return res.status(400).json({ msg: "Por favor, preencha todos os campos." });
        }

        const item = new Catalogo({
            produto,
            descricao,
            preco
        });

        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor." });
    }
});

router.get("/", async (req, res) => {
    try {
        const itens = await Catalogo.find();
        res.json(itens);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor." });
    }
});

router.put("/:id", auth, async (req, res) => {
    try {
        const { produto, descricao, preco } = req.body;
        let item = await Catalogo.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item não encontrado." });
        }

        item.produto = produto || item.produto;
        item.descricao = descricao || item.descricao;
        item.preco = preco != null ? preco : item.preco;

        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor." });
    }
});

router.delete("/:id", auth, async (req, res) => {
    try {
        const item = await Catalogo.findById(req.params.id);

        if (!item) {
            return res.status(404).json({ msg: "Item não encontrado." });
        }

        await item.deleteOne();
        res.json({ msg: "Item removido do catálogo." });
    } catch (err) {
        res.status(500).json({ msg: "Erro no servidor." });
    }
});

module.exports = router;