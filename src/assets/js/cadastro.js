const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const emailError = document.getElementById("emailError");
const phoneInput = document.getElementById("phone");
const passwordInput = document.getElementById("password");
const repeatPasswordInput = document.getElementById("repeatPassword");
const passwordError = document.getElementById("passwordError");
const repeatPasswordError = document.getElementById("repeatPasswordError");
const showPassword = document.getElementById("showPassword");
const showConfirmPassword = document.getElementById("showConfirmPassword");
const eyeIcon = document.getElementsByClassName("input-group-text");

function updateClass(element, add, className) {
  if (add) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

showPassword.addEventListener("click", function () {
  const isPassword = passwordInput.type === "password";
  passwordInput.type = isPassword ? "text" : "password";
  updateClass(showPassword, isPassword, "bi-eye-slash");
  updateClass(showPassword, !isPassword, "bi-eye-fill");
});

showConfirmPassword.addEventListener("click", function () {
  const isPassword = repeatPasswordInput.type === "password";
  repeatPasswordInput.type = isPassword ? "text" : "password";
  updateClass(showConfirmPassword, isPassword, "bi-eye-slash");
  updateClass(showConfirmPassword, !isPassword, "bi-eye-fill");
});

function comparePasswords() {
  const passwordsMatch = passwordInput.value === repeatPasswordInput.value;
  const elements = [
    passwordInput,
    repeatPasswordInput,
    showPassword,
    showConfirmPassword,
  ];

  elements.forEach((element) => {
    updateClass(element, !passwordsMatch, "border-danger");
    updateClass(element, passwordsMatch, "border-success");
  });
}

passwordInput.addEventListener("input", comparePasswords);
repeatPasswordInput.addEventListener("input", comparePasswords);

function passwordsMatch() {
  return passwordInput.value === repeatPasswordInput.value;
}

function displayPasswordError() {
  repeatPasswordError.textContent = passwordsMatch() ? "" : "As senhas não coincidem.";
}

function getUserFromLocalStorage(email) {
  return JSON.parse(localStorage.getItem(email));
}

function createUser() {
  return {
    name: nameInput.value,
    email: emailInput.value,
    phone: phoneInput.value,
    password: passwordInput.value,
  };
}

function saveUserToLocalStorage(user) {
  localStorage.setItem(user.email, JSON.stringify(user));
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  displayPasswordError();

  if (!passwordsMatch()) {
    return;
  }

  var existingUser = getUserFromLocalStorage(emailInput.value);

  if (existingUser) {
    alert("Usuário já existe! Verifique o e-mail informado.");
    return;
  }

  var user = createUser();

  saveUserToLocalStorage(user);

  alert(`${user.name} sua conta foi criada com sucesso!`);

  form.reset();
});