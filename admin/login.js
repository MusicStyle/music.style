function login() {
  const nomeCorreto = "admin";
  const senhaCorreta = "admin";

  const nome = document.getElementById("name").value;
  const senha = document.getElementById("password").value;

  if (nome === nomeCorreto && senha === senhaCorreta) {
    alert("Login bem-sucedido!");
    window.location.href = "painel.html"; // ou dashboard.html, etc.
  } else {
    alert("Nome de usuário ou senha incorretos.");
  }
}