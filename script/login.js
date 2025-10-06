// Função para salvar usuário no localStorage
function salvarUsuario(usuario) {
    localStorage.setItem("usuario", JSON.stringify(usuario));
}

// Função para recuperar usuário do localStorage
function pegarUsuario() {
    const userStr = localStorage.getItem("usuario");
    return userStr ? JSON.parse(userStr) : null;
}

// Evento de login
document.getElementById("loginBtn").addEventListener("click", function () {
    const nome = document.getElementById("loginName").value.trim();
    const senha = document.getElementById("loginPassword").value.trim();

    if (!nome || !senha) {
        alert("Por favor, preencha todos os campos do login!");
        return;
    }

    const usuarioSalvo = pegarUsuario();

    if (!usuarioSalvo) {
        alert("Nenhum usuário cadastrado. Por favor, registre-se primeiro.");
        return;
    }

    if (usuarioSalvo.nome === nome && usuarioSalvo.senha === senha) {
        alert("Login realizado com sucesso!");
        window.location.href = "home.html";
    } else {
        alert("Nome ou senha incorretos.");
    }
});

// Evento de registro
document.getElementById("registerBtn").addEventListener("click", function () {
    const nome = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const senha = document.getElementById("registerPassword").value.trim();

    if (!nome || !email || !senha) {
        alert("Por favor, preencha todos os campos do cadastro!");
        return;
    }

    const usuario = { nome, email, senha };
    salvarUsuario(usuario);

    alert("Cadastro realizado com sucesso!");
    window.location.href = "home.html";
});