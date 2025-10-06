const usuario = {
    nome: "",
    email: "",
    senha: ""
};

document.getElementById("loginBtn").addEventListener("click", function () {
    usuario.nome = document.getElementById("loginName").value;
    usuario.senha = document.getElementById("loginPassword").value;
    console.log(usuario);
    window.location.href = "home.html";
});

    document.getElementById("registerBtn").addEventListener("click", function () {
    usuario.nome = document.getElementById("registerName").value;
    usuario.email = document.getElementById("registerEmail").value;
    usuario.senha = document.getElementById("registerPassword").value;
    console.log(usuario);
    window.location.href = "home.html";
});
const usuarioLogin = JSON.parse(localStorage.getItem("usuario"));
if (usuario.nome && usuario.senha) {
    window.location.href = "home.html";
} else {
    alert("Por favor, preencha todos os campos!");
}