const userNameInput = document.getElementById("user-name");
const userLastNameInput = document.getElementById("user-last-name");
const userEmailInput = document.getElementById("user-email");
const userPhoneInput = document.getElementById("user-phone");
const userPasswordInput = document.getElementById("old-password");
const userNewPasswordInput = document.getElementById("new-password");
const userConfirmPasswordInput = document.getElementById(
  "confirm-new-password"
);
const photoInput = document.getElementById("customFile");
const removePhotoButton = document.getElementById("remove-button");
const confirmChangesButton = document.getElementById("confirm-changes");

const cardNumberInput = document.getElementById("card-number");
const cardHolderInput = document.getElementById("card-name");
const cardExpiryInput = document.getElementById("card-expiry-date");
const cardCVVInput = document.getElementById("card-cvv");
const createCreditCardButton = document.getElementById("create-credit-card");
const creditCardsElement = document.getElementById("credit-cards");

/**
 * Recupera o usuário atual a partir do armazenamento local utilizando o email cadastrado.
 * @returns {Object} - O usuário atual.
 */
function getUser() {
  const email = localStorage.getItem("lastEmail");
  return JSON.parse(localStorage.getItem(email));
}

/**
 * Divide um nome completo em nome e sobrenome.
 * @param {string} fullName - O nome completo.
 * @returns {Object} - O nome e sobrenome.
 */
function splitName(fullName) {
  const names = fullName.split(" ");
  const firstName = names.shift();
  const lastName = names.join(" ");
  return { firstName, lastName };
}

/**
 * Formata um número de telefone no formato (XX) XXXXX-XXXX.
 * @param {string} phoneNumber - O número de telefone a ser formatado.
 * @returns {string} - O número de telefone formatado.
 */
function formatPhoneNumber(phoneNumber) {
  var match = phoneNumber.match(/^(\d{2})(\d{5})(\d{4})$/);
  if (match) {
    return "(" + match[1] + ") " + match[2] + "-" + match[3];
  }
  return phoneNumber;
}

/**
 * Define os dados do usuário nos campos de entrada.
 * @param {Object} user - O usuário atual.
 * @returns {void}
 */
function setUserData(user) {
  var { firstName, lastName } = splitName(user.name);
  userNameInput.value = firstName;
  userLastNameInput.value = lastName || "";
  userEmailInput.value = user.email;
  userPhoneInput.value = formatPhoneNumber(user.phone);
}

/**
 * Cria um elemento HTML.
 * @param {string} tag - A tag do elemento.
 * @param {string} className - A classe do elemento.
 * @param {string} src - O source da elemento.
 * @returns {HTMLElement} - O elemento criado.
 */
function createElement(tag, className, src) {
  var element = document.createElement(tag);
  element.className = className;
  if (src) {
    element.src = src;
  }
  return element;
}

/**
 * Substitui um elemento antigo por um novo.
 * @param {HTMLElement} oldElement - O elemento antigo.
 * @param {HTMLElement} newElement - O novo elemento.
 * @returns {void}
 */
function replaceElement(oldElement, newElement) {
  oldElement.parentNode.replaceChild(newElement, oldElement);
}

/**
 * Carrega a foto do usuário a partir do armazenamento local.
 * @returns {void}
 */
function loadUserPhoto() {
  var storageProfilePhoto = localStorage.getItem("profileImage");
  if (!storageProfilePhoto) return;

  var iElement = document.querySelector(".fa-user");
  var img = createElement("img", "profile-photo", storageProfilePhoto);

  replaceElement(iElement, img);
}

/**
 * Carrega os dados do usuário a partir do armazenamento local.
 * @returns {void}
 */
function loadUserData() {
  var user = getUser();
  if (!user) {
    alert("Usuário não encontrado, cadastre-se por favor!");
    window.location.href = "./login.html";
    var mainElement = document.getElementsByTagName("main")[0];
    mainElement.style.pointerEvents = "none";
    return;
  }
  setUserData(user);
}

/**
 * Define a foto de perfil do usuário.
 * @param {FileReader} reader - O leitor de arquivo.
 * @returns {void}
 */
function setProfilePhoto(reader) {
  var iconElement = document.querySelector(".fa-user");
  var img = createElement("img", "profile-photo", reader.result);
  replaceElement(iconElement, img);
}

/**
 * Verifica se a senha antiga digitada é válida.
 * @param {string} oldPassword - A senha antiga.
 * @returns {boolean} - A autenticidade da senha antiga.
 */
function verifyOldPassword(oldPassword) {
  var user = getUser();

  if (user.password !== oldPassword) {
    alert("Sua senha antiga não confere!");
    return false;
  }
  return true;
}

/**
 * Verifica se a nova senha é diferente da antiga.
 * @param {string} oldPassword - A senha antiga.
 * @param {string} newPassword - A nova senha.
 * @returns {boolean} - A diferença entre as senhas.
 */
function isNewPasswordDifferent(oldPassword, newPassword) {
  if (oldPassword === newPassword) {
    alert("A nova senha não pode ser igual à antiga!");
    return false;
  }
  return true;
}

/**
 * Atualiza a classe de um elemento.
 * @param {HTMLElement} element - O elemento a ser atualizado.
 * @param {boolean} compare - A comparação a ser feita.
 * @param {string} className - A classe a ser adicionada ou removida.
 * @returns {void}
 */
function updateClass(element, compare, className) {
  if (compare) {
    element.classList.add(className);
  } else {
    element.classList.remove(className);
  }
}

/**
 * Compara as senhas digitadas pelo usuário nos inputs de nova senha e confirmação estão iguais.
 * @returns {void}
 */
function comparePasswords() {
  const passwordsMatch =
    userNewPasswordInput.value === userConfirmPasswordInput.value;
  const newPasswordList = [userNewPasswordInput, userConfirmPasswordInput];

  newPasswordList.forEach((element) => {
    updateClass(element, !passwordsMatch, "border-danger");
    updateClass(element, passwordsMatch, "border-success");
  });
}

userNewPasswordInput.addEventListener("input", comparePasswords);
userConfirmPasswordInput.addEventListener("input", comparePasswords);

/**
 * Atualiza a senha do usuário no armazenamento local.
 * @param {string} email - O email do usuário.
 * @param {string} newPassword - A nova senha do usuário.
 * @returns {void}
 */
function updateUserPassword(email, newPassword) {
  var user = getUser();
  user.password = newPassword;
  localStorage.setItem(email, JSON.stringify(user));
}

/**
 * Limpa os inputs de senha.
 * @returns {void}
 */
function clearPasswordInputs() {
  const passwords = [
    userPasswordInput,
    userNewPasswordInput,
    userConfirmPasswordInput,
  ];

  userPasswordInput.value = "";
  userNewPasswordInput.value = "";
  userConfirmPasswordInput.value = "";

  passwords.forEach((element) => {
    element.classList.remove("border-success");
    element.classList.remove("border-danger");
  });
}

/**
 * Adiciona um evento de clique ao botão de confirmação de alterações.
 * @returns {void}
 */
confirmChangesButton.addEventListener("click", function () {
  var email = userEmailInput.value;
  var oldPassword = userPasswordInput.value;
  var newPassword = userNewPasswordInput.value;

  if (!verifyOldPassword(oldPassword)) {
    return;
  }
  if (!isNewPasswordDifferent(oldPassword, newPassword)) {
    return;
  }
  updateUserPassword(email, newPassword);
  clearPasswordInputs();
  alert("Senha alterada com sucesso!");
});

/**
 * Adiciona um evento de mudança ao input de foto.
 * @returns {void}
 */
photoInput.addEventListener("change", function (e) {
  var file = e.target.files[0];
  if (!file) return;

  var reader = new FileReader();
  reader.onloadend = function () {
    localStorage.setItem("profileImage", reader.result);
    setProfilePhoto(reader);
  };
  reader.readAsDataURL(file);
});

/**
 * Adiciona um evento de clique ao botão de remoção de foto.
 * @returns {void}
 */
removePhotoButton.addEventListener("click", function () {
  var imgElement = document.getElementsByClassName("profile-photo")[0];
  localStorage.removeItem("profileImage");
  photoInput.value = "";
  var icon = createElement(
    "i",
    "fas fa-fw fa-user position-absolute top-50 start-50 translate-middle"
  );
  replaceElement(imgElement, icon);
});

/**
 * Adiciona um evento de input ao campo de telefone.
 * @returns {void}
 */
userPhoneInput.addEventListener("input", function () {
  this.value = formatPhoneNumber(this.value);
});

/**
 * Verifica se um cartão de crédito já está cadastrado.
 * @param {string} newCardNumber - O número do novo cartão de crédito.
 * @returns {boolean} - A existência do cartão de crédito.
 */
function cardAlreadyExists(newCardNumber) {
  var user = getUser();

  if (user.creditCards && user.creditCards.length > 0) {
    for (var i = 0; i < user.creditCards.length; i++) {
      if (user.creditCards[i].number === newCardNumber) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Valida os dados de um cartão de crédito.
 * @param {Object} creditCard - Dados do cartão de crédito.
 * @returns {void}
 * @throws {Error}
 */
function validateCreditCard(creditCard) {
  if (cardAlreadyExists(creditCard.number)) {
    throw new Error("Cartão de crédito já cadastrado!");
  }
  if (!creditCard.number || creditCard.number.length !== 16) {
    throw new Error("Número do cartão inválido!");
  }
  if (!creditCard.holder) {
    throw new Error("Nome do titular inválido!");
  }
  if (!creditCard.cvv || creditCard.cvv.length !== 3) {
    throw new Error("CVV inválido! Digite 3 dígitos.");
  }
}

/**
 * Cria um cartão de crédito e o adiciona ao usuário.
 * @returns {void}
 * @throws {Alert}
 */
function createCreditCard() {
  const creditCard = {
    number: cardNumberInput.value,
    holder: cardHolderInput.value,
    expiry: cardExpiryInput.value,
    cvv: cardCVVInput.value,
  };

  const user = getUser();

  try {
    validateCreditCard(creditCard);
  } catch (error) {
    alert(error.message);
    return;
  }

  user.creditCards.push(creditCard);

  localStorage.setItem(user.email, JSON.stringify(user));
  alert("Cartão de crédito cadastrado com sucesso!");
  location.reload();
}

/**
 * Adiciona um evento de clique ao botão de criação de cartão de crédito.
 * @returns {void}
 */
createCreditCardButton.addEventListener("click", function () {
  createCreditCard();
});

/**
 * Deleta um cartão de crédito do usuário.
 * @param {string} cardNumber - O número do cartão de crédito.
 * @returns {void}
 */
function deleteCreditCard(cardNumber) {
  const user = getUser();
  user.creditCards = user.creditCards.filter(
    (card) => card.number !== cardNumber
  );
  localStorage.setItem(user.email, JSON.stringify(user));
}

/**
 * Cria um botão para deletar um cartão de crédito.
 * @param {Object} creditCard - Dados do cartão de crédito.
 * @returns {HTMLElement} - O elemento do botão.
 */
function createDeleteButtonElement(creditCard) {
  var button = createElement("button", "btn btn-sm btn-outline-danger");
  button.type = "button";
  button.id = `delete-credit-card${creditCard.number}`;
  button.innerHTML = '<i class="bi bi-x-lg"></i>';
  button.addEventListener("click", function () {
    deleteCreditCard(creditCard.number);
    location.reload();
  });
  return button;
}

/**
 * Cria um elemento span.
 * @param {string} className - Nome da classe do elemento.
 * @param {string} innerHTML - Conteúdo interno do elemento.
 * @returns {HTMLElement} - O elemento span.
 */
function createSpan(className, innerHTML) {
  const span = createElement("span", className);
  span.innerHTML = innerHTML;
  return span;
}

/**
 * Cria uma coluna div.
 * @param {string} className - Nome da classe do elemento.
 * @param {HTMLElement} childElement - Elemento filho da coluna.
 * @returns {HTMLElement} - A coluna div.
 */
function createColumn(className, childElement) {
  const column = createElement("div", className);
  column.appendChild(childElement);
  return column;
}

/**
 * Obtém os últimos quatro dígitos de um número de cartão.
 * @param {string} cardNumber - Número do cartão de crédito.
 * @returns {string} - Os últimos quatro dígitos do número do cartão.
 */
function getLastFourDigits(cardNumber) {
  return cardNumber.slice(-4);
}

/**
 * Inverte uma data.
 * @param {string} date - A data a ser invertida.
 * @returns {string} - A data invertida.
 */
function invertDate(date) {
  return date.split("-").reverse().join("-");
}

/**
 * Cria um elemento de cartão de crédito.
 * @param {Object} creditCards - Objeto dos cartões de crédito.
 * @returns {HTMLElement} - O elemento de cartão de crédito.
 */
function createCreditCardComponent(creditCards) {
  creditCards.forEach(function (creditCard) {
    const li = createElement(
      "li",
      "border rounded border-light-subtle list-group-item d-flex flex-column flex-sm-row justify-content-start align-items-sm-center mb-2"
    );

    const div = createElement(
      "div",
      "d-flex align-items-center mb-3 mb-sm-0 w-100"
    );

    const i = createElement("i", "bi bi-credit-card fs-4 me-3");

    const row = createElement("div", "row w-75");

    const span1 = createSpan(
      "d-block fw-bold",
      `Final <span id="card-final-number">${getLastFourDigits(
        creditCard.number
      )}</span>`
    );
    const col1 = createColumn("col-md-6 align-content-center", span1);

    const span2 = createSpan(
      "text-muted",
      `Validade <span id="card-expiry">${invertDate(creditCard.expiry)}</span>`
    );
    const col2 = createColumn("col-md-6 align-content-center", span2);

    row.appendChild(col1);
    row.appendChild(col2);
    div.appendChild(i);
    div.appendChild(row);
    li.appendChild(div);

    const button = createDeleteButtonElement(creditCard);
    li.appendChild(button);

    creditCardsElement.appendChild(li);
  });
}

/**
 * Cria um elemento para o caso de não haver cartões de crédito.
 * @returns {HTMLElement} - O elemento de "sem cartões de crédito".
 */
function createNoCreditCardElement() {
  const noCreditCardsElement = createElement("p", "text-danger");
  noCreditCardsElement.innerHTML = "Ops, você não possui cartões cadastrados.";
  creditCardsElement.appendChild(noCreditCardsElement);
}

/**
 * Carrega os cartões de crédito do usuário.
 */
function loadCreditCards() {
  const user = getUser();
  const creditCards = user.creditCards;

  if (creditCards && creditCards.length > 0) {
    createCreditCardComponent(creditCards);
  } else {
    createNoCreditCardElement();
  }
}

window.onload = function () {
  loadUserData();
  loadUserPhoto();
  loadCreditCards();
};
