const formSection = document.querySelector(".mensagem");
const loginButton = document.getElementById("BtnEntrar");
const emailInput = document.getElementById("email_user");
const passwordInput = document.getElementById("senha_user");

// variáveis globais de reset de senha
const modal = new bootstrap.Modal(document.querySelector('.modal'));
const emailInputReset = document.getElementById('email__reset');
const passwordReset = document.getElementById('nova-senha__reset');
const passwordResetConfirmation = document.getElementById('confirmar-senha__reset');
const showPassword = document.getElementById('showPassword');
const showConfirmPassword = document.getElementById('showConfirmPassword');

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
      localStorage.setItem("lastEmail", emailInput.value);
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

// Lógica para reset da senha

/**
 * Função que valida se um email é válido
 * @param {string} email 
 * @returns 
 */
function emailIsValid(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Função que adiciona a classe is-invalid ao input e exibe a mensagem de erro
 */
function showInputError(input, divError="", message="") {
  input.classList.add("is-invalid");
  divError.textContent = message;
}

/**
 * Função que remove a classe is-invalid do input e limpa a mensagem de erro
 */
function clearInputError(input, divError="") {
  input.classList.remove("is-invalid");
  divError.textContent = "";
}

/**
 * Função que compara as senhas digitadas no formulário de reset de senha
 */
function comparePasswords() {
  if (!(passwordReset.value === passwordResetConfirmation.value)) {
    showInputError(passwordReset);
    showInputError(passwordResetConfirmation, document.getElementById('password-error__reset'), 'As senhas não coincidem');
  } else {
    passwordReset.classList.remove('is-invalid');
    passwordResetConfirmation.classList.remove('is-invalid');  
    passwordReset.classList.add('is-valid');
    passwordResetConfirmation.classList.add('is-valid');
    document.getElementById('password-error__reset').textContent = '';
  }
}

/**
 * Função que atualiza a classe de um elemento
 */
function updateClass(element, add, className) {
  if (add) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Função que exibe a senha do input e muda o ícone do botão de exibir senha
 */
showPassword.addEventListener("click", function () {
  const isPassword = passwordReset.type === "password";
  passwordReset.type = isPassword ? "text" : "password";
  updateClass(showPassword, isPassword, "bi-eye-slash");
  updateClass(showPassword, !isPassword, "bi-eye-fill");
});


/**
 * Função que exibe a senha do input de confirmar senha e muda o ícone do botão de exibir senha
 */
showConfirmPassword.addEventListener("click", function () {
  const isPassword = passwordResetConfirmation.type === "password";
  passwordResetConfirmation.type = isPassword ? "text" : "password";
  updateClass(showConfirmPassword, isPassword, "bi-eye-slash");
  updateClass(showConfirmPassword, !isPassword, "bi-eye-fill");
});

document.getElementById('forgot-pass').addEventListener('click', function(e) {
  e.preventDefault();

  modal.show();

  emailInputReset.addEventListener('input', function() {
    const emailResetValue = emailInputReset.value;
    if (emailResetValue === '') {
      showInputError(emailInputReset, document.getElementById('email-error__reset'), 'O campo de email não pode estar vazio');
    } else if (!emailIsValid(emailResetValue)) {
      showInputError(emailInputReset, document.getElementById('email-error__reset'), 'Email inválido');
    } else if (!getUserFromLocalStorage(emailResetValue)) {
      showInputError(emailInputReset, document.getElementById('email-error__reset'), 'Email não cadastrado');
    } else {
      emailInputReset.classList.remove('is-invalid');
      emailInputReset.classList.add('is-valid');
    }
  });

  passwordReset.addEventListener('input', comparePasswords);
  passwordResetConfirmation.addEventListener('input', comparePasswords);
});

document.getElementById('forgot-pass-form').addEventListener('submit', function(event) {
  event.preventDefault();

  const invalidFields = this.querySelectorAll('.is-invalid');
  if (invalidFields.length > 0) {
    alert("Corrija os erros antes de enviar o formulário!")
  } else {
    modal.hide()

    const email = emailInputReset.value;
    const userInfo = JSON.parse(localStorage.getItem(email));
    userInfo.password = passwordReset.value;
    localStorage.setItem(email, JSON.stringify(userInfo));
    this.querySelectorAll('.is-valid').forEach(function(element) {
      element.classList.remove('is-valid');
    });
    this.reset();
    alert("Senha alterada com sucesso! Faça o login com as novas credenciais");
  }
});
