let iconCart = document.querySelector(".icon-cart");
let btnClose = document.querySelector(".btn-close");
let body = document.querySelector("body");

iconCart.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
});
btnClose.addEventListener("click", () => {
    body.classList.toggle("activeTabCart");
});

function pagar() {
    alert("Seu pedido foi enviado para o restaurante!");
}