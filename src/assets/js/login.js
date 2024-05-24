const formSection = document.querySelector('.mensagem');
const loginButton = document.getElementById('BtnEntrar');
const emailInput = document.getElementById('email_user');
const passwordInput = document.getElementById('senha_user');


function getUserFromLocalStorage(email) {
  return JSON.parse(localStorage.getItem(email));
}


loginButton.addEventListener('click', function (event) {
  event.preventDefault(); 


  var user = getUserFromLocalStorage(emailInput.value);

  if (user && user.password === passwordInput.value) {
    alert("Login realizado com sucesso!");

    window.location.href = "restaurantes.html";
  } else {
    formSection.textContent = "E-mail ou senha incorretos!";
    formSection.style.display = "block";
    formSection.style.color = "red"; 
  }
});
