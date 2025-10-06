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
document.getElementById("loginBtn").addEventListener("click", async function () {
    const nome = document.getElementById("loginName").value.trim();
    const senha = document.getElementById("loginPassword").value.trim();

    if (!nome || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            salvarUsuario(dados.usuario);  // Salva dados do usuário no localStorage
            alert(dados.mensagem);
            window.location.href = "home.html";
        } else {
            alert(dados.mensagem);
        }
    } catch (erro) {
        alert("Erro ao fazer login: " + erro.message);
    }
});

// Evento de cadastro
document.getElementById("registerBtn").addEventListener("click", async function () {
    const nome = document.getElementById("registerName").value.trim();
    const email = document.getElementById("registerEmail").value.trim();
    const senha = document.getElementById("registerPassword").value.trim();

    if (!nome || !email || !senha) {
        alert("Preencha todos os campos!");
        return;
    }

    try {
        const resposta = await fetch("http://localhost:3000/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, email, senha })
        });

        const dados = await resposta.json();

        if (resposta.ok) {
            // Salva o usuário no localStorage logo após o cadastro (simulando login)
            salvarUsuario({ nome, email });
            alert(dados.mensagem);
            window.location.href = "home.html";
        } else {
            alert(dados.mensagem);
        }
    } catch (erro) {
        alert("Erro ao se registrar: " + erro.message);
    }
});