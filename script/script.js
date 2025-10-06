function logout() {
    window.location.href = "index.html";
    localStorage.removeItem("usuario");
}