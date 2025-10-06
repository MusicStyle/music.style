const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conectar ao MongoDB
mongoose.connect('mongodb://localhost:27017/musicstyle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error(err));

// Modelo do usuário
const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: String
});

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const existente = await Usuario.findOne({ email });
        if (existente) return res.status(400).json({ mensagem: "Usuário já existe." });

        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.json({ mensagem: "Usuário registrado com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota de login
app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ nome, senha });
        if (!usuario) return res.status(401).json({ mensagem: "Credenciais inválidas." });

        res.json({ mensagem: "Login bem-sucedido!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});