const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Conexão com MongoDB
mongoose.connect('mongodb://localhost:27017/musicstyle', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Conectado ao MongoDB"))
  .catch(err => console.error("Erro ao conectar ao MongoDB:", err));

// Modelo do Usuário
const Usuario = mongoose.model('Usuario', {
    nome: String,
    email: String,
    senha: String
});

// Rota de Cadastro
app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const existente = await Usuario.findOne({ email });
        if (existente) {
            return res.status(400).json({ mensagem: "Usuário já existe." });
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({
            nome,
            email,
            senha: senhaCriptografada
        });

        await novoUsuario.save();
        res.json({ mensagem: "Usuário registrado com sucesso!" });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Rota de Login
app.post('/login', async (req, res) => {
    const { nome, senha } = req.body;
    try {
        const usuario = await Usuario.findOne({ nome });
        if (!usuario) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) {
            return res.status(401).json({ mensagem: "Credenciais inválidas." });
        }

        res.json({ mensagem: "Login bem-sucedido!", usuario: { nome: usuario.nome, email: usuario.email } });

    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});