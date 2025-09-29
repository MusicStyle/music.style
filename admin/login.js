function login() {
  const nomeCorreto = "admin";
  const senhaCorreta = "music123";

  const nome = document.getElementById("name").value;
  const senha = document.getElementById("password").value;

  if (nome === nomeCorreto && senha === senhaCorreta) {
    sessionStorage.setItem("logado", "true"); // ← novo
    alert("Login bem-sucedido!");
    window.location.href = "painel.html";
  } else {
    alert("Nome de usuário ou senha incorretos.");
  }
}
