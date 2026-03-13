const express = require("express");
const router = express.Router();
const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
    try {
        const { email, senha, cpf } = req.body;

        if (!email || !senha || !cpf) {
            return res.status(400).json({ msg: "Por favor, preencha todos os campos." });
        }

        let usuarioExiste = await Usuario.findOne({ cpf });
        if (usuarioExiste) {
            return res.status(400).json({ msg: "CPF já cadastrado." });
        }

        usuarioExiste = await Usuario.findOne({ email });
        if (usuarioExiste) {
            return res.status(400).json({ msg: "E-mail já cadastrado." });
        }

        const hash = await bcrypt.hash(senha, 10);

        const usuario = new Usuario({
            email,
            senha: hash,
            cpf
        });

        await usuario.save();

        res.status(201).json({
            _id: usuario._id,
            email: usuario.email,
            cpf: usuario.cpf
        });
    } catch (err) {
        console.error("Erro ao registrar usuário:", err);
        res.status(500).json({
            msg: "Erro no servidor ao registrar usuário.",
            erro: err.message
        });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { email, senha } = req.body;

        if (!email || !senha) {
            return res.status(400).json({ msg: "Por favor, forneça e-mail e senha." });
        }

        const usuario = await Usuario.findOne({ email });

        if (!usuario) {
            return res.status(400).json({ msg: "Usuário não encontrado." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ msg: "Senha inválida." });
        }

        const token = jwt.sign(
            { id: usuario._id },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.json({
            token,
            usuario: {
                _id: usuario._id,
                email: usuario.email,
                cpf: usuario.cpf
            }
        });
    } catch (err) {
        console.error("Erro ao fazer login:", err);
        res.status(500).json({
            msg: "Erro no servidor ao fazer login.",
            erro: err.message
        });
    }
});

module.exports = router;