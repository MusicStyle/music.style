if (sessionStorage.getItem("logado") !== "true") {
  alert("Acesso não autorizado. Faça login primeiro.");
  window.location.href = "admin/index.html";
}
function logout() {
  sessionStorage.removeItem("logado");
  window.location.href = "admin/index.html";
}
