// Verifica se o usuário está logado ao carregar a página
function verificarUsuario() {
    const usuario = localStorage.getItem('usuario');
    if (!usuario) {
        window.location.href = 'index.html';
    }
}
window.onload = verificarUsuario;

// Função para logout
function logout() {
    localStorage.removeItem("usuario");
    window.location.href = "index.html";
}