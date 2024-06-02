/**
 * Recupera o usuário atual a partir do armazenamento local.
 * @returns {Object} - O usuário atual.
 */
function getUser() {
  const email = localStorage.getItem("lastEmail");
  return JSON.parse(localStorage.getItem(email));
}

/**
 * Abre a janela de chat quando o ícone de chat é clicado.
 */
document.getElementById("chat-icon").addEventListener("click", function () {
  document.getElementById("chat-window").classList.remove("d-none");
});

/**
 * Minimiza a janela de chat quando o botão de minimizar é clicado.
 */
document.getElementById("minimize-chat").addEventListener("click", function () {
  document.getElementById("chat-window").classList.add("d-none");
});

/**
 * Envia a mensagem quando a tecla Enter é pressionada no campo de entrada do chat.
 */
document
  .getElementById("chat-input")
  .addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("chat-send").click();
    }
  });

/**
 * Cria e envia uma mensagem quando o botão de envio é clicado.
 */
document.getElementById("chat-send").addEventListener("click", function () {
  const input = document.getElementById("chat-input");
  const messages = document.getElementById("chat-messages");

  if (input.value) {
    const user = getUser();
    const message = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = `${user.name}: `;
    message.appendChild(strong);
    message.append(input.value);
    message.style.textAlign = "left";
    message.style.margin = "0";
    messages.appendChild(message);
    input.value = "";
  }
});
