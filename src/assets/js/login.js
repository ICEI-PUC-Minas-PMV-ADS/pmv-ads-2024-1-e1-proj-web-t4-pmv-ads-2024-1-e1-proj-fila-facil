const formSection = document.querySelector(".mensagem");
const loginButton = document.getElementById("BtnEntrar");
const emailInput = document.getElementById("email_user");
const passwordInput = document.getElementById("senha_user");

function getUserFromLocalStorage(email) {
  return JSON.parse(localStorage.getItem(email));
}

loginButton.addEventListener("click", function (event) {
  event.preventDefault();

  if (emailInput.value != "" && passwordInput.value != "") {
    var user = getUserFromLocalStorage(emailInput.value);

    if (user && user.password === passwordInput.value) {
      alert("Login realizado com sucesso!");
      window.location.href = "restaurantes.html";
      localStorage.setItem("userLoggedIn", "true");
    } else if (user) {
      formSection.textContent = "Senha incorreta!";
      formSection.style.display = "block";
      formSection.style.color = "red";
    } else {
      formSection.textContent = "Usuário não encontrado!";
      formSection.style.display = "block";
      formSection.style.color = "red";
    }
  }

  if (emailInput.value === "") {
    formSection.textContent = "O campo de email não pode estar vazio!";
    formSection.style.display = "block";
    formSection.style.color = "red";
    return;
  }

  if (passwordInput.value === "") {
    formSection.textContent = "O campo de senha não pode estar vazio!";
    formSection.style.display = "block";
    formSection.style.color = "red";
    return;
  }
});
