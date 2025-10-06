// Função para salvar usuário no localStorage
function salvarUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Função para recuperar usuário do localStorage
function pegarUsuario() {
    const userStr = localStorage.getItem("usuario");
    return userStr ? JSON.parse(userStr) : null;
}
const bcrypt = require('bcryptjs');

// Rota de cadastro
app.post('/register', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        // Verifica se o usuário já existe
        const existente = await Usuario.findOne({ email });
        if (existente) return res.status(400).json({ mensagem: "Usuário já existe." });

        // Criptografa a senha antes de salvar
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        const novoUsuario = new Usuario({ nome, email, senha: senhaCriptografada });
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
        // Busca o usuário no banco
        const usuario = await Usuario.findOne({ nome });
        if (!usuario) return res.status(401).json({ mensagem: "Credenciais inválidas." });

        // Compara a senha fornecida com a senha criptografada no banco
        const senhaValida = await bcrypt.compare(senha, usuario.senha);
        if (!senhaValida) return res.status(401).json({ mensagem: "Credenciais inválidas." });

        res.json({ mensagem: "Login bem-sucedido!" });
    } catch (error) {
        res.status(500).json({ erro: error.message });
    }
});