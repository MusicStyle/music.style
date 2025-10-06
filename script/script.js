// Função que verifica o localStorage ao carregar a página
function verificarUsuario() {
  const usuario = localStorage.getItem('usuario');
  if (!usuario) {
    window.location.href = 'index.html';
  }
}
window.onload = verificarUsuario;

// Função para fazer logout
function logout() {
    window.location.href = "index.html";
    localStorage.removeItem("usuario");
}