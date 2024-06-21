/**
 * Verifica se o usuário está logado. Caso contrário, redireciona para a página de login.
 * @returns {void}
 */
function checkUserLoggedIn() {
  const userLoggedIn = localStorage.getItem("userLoggedIn");
  if (userLoggedIn !== "true") {
    alert("Você precisa estar logado para acessar esta página!");
    window.location.href = "./login.html";
  }
}

window.onload = function () {
  checkUserLoggedIn();
};
