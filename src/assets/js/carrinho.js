let restaurantes = JSON.parse(localStorage.getItem("restaurantes"));

// Salva o array de restauranteJson.js no localStorage COMO STRING e já obtém como objeto para uso local
document.addEventListener("DOMContentLoaded", async function () {
  if (!restaurantes) {
    await fetchAndStoreJson("../assets/js/restaurante.json", "restaurantes");
    restaurantes = JSON.stringify(localStorage.getItem("restaurantes"));
  }
});

// Abre e fecha a lateral do carrinho
const iconCart = document.querySelector(".icon-cart");
const closeBtn = document.querySelector(".close-cart");
const body = document.querySelector(".body");
iconCart.addEventListener("click", () => {
  document.body.classList.toggle("activeTabCart");
});
closeBtn.addEventListener("click", () => {
  document.body.classList.toggle("activeTabCart");
});

// Função para encontrar um prato pelo id
function encontrarPratoPorId(idPrato) {
  let obtemURL = new URLSearchParams(window.location.search);
  let idRestaurante = obtemURL.get("id");
  for (let restaurante of restaurantes) {
    for (restaurante of restaurantes) {
      if (restaurante.idRestaurante == idRestaurante) {
        for (let prato of restaurante.cardapio) {
          if (prato.idPrato == idPrato) {
            return prato;
          }
        }
      }
    }
  }
}

// Adicionar novo ítem ao carrinho
window.adicionaItem = function (element) {
  // Verifica se ítem disponível em estoque
  var idPrato = element.dataset.idPrato;
  var prato = encontrarPratoPorId(idPrato);
  var quantidadeEmEstoque = prato.quantidadeEstoque;
  // Se disponível, adiciona / cria card
  if (quantidadeEmEstoque > 0) {
    var idPratoClicado = Number(element.getAttribute("data-id-prato"));
    criarCardCarrinho(idPratoClicado);
    atualizaValorTotal();
  } else {
    quantidadeLimiteAtingida();
  }
};

function criarCardCarrinho(idPrato) {
  var prato = encontrarPratoPorId(idPrato);
  var cardExistente = document.querySelector(`div[data-id-prato="${idPrato}"]`);

  // Verfica se o card já existe no carrinho
  if (cardExistente) {
    var quantidadeElement = cardExistente.querySelector(".quantidade");
    var quantidadeAtual = Number(quantidadeElement.textContent);
    var quantidadeEstoque = prato.quantidadeEstoque;

    // Verifica se quantidade disponível em estoque
    if (quantidadeAtual == quantidadeEstoque) {
      quantidadeLimiteAtingida();
      return;
    } else {
      // Aumenta quantidade do ítem no carrinho
      quantidadeAtual++;
      quantidadeElement.textContent = quantidadeAtual;
    }
  } else {
    desenhaCard(prato, idPrato);
  }
}

// Código HTML do card no carrinho
function desenhaCard(prato, idPrato) {
  var div = document.createElement("div");
  div.innerHTML = `<div class="card card-div mb-6" id="card-item-carrinho" style="max-width: 370px" id="card-item-carrinho" data-id-prato="${idPrato}">
  <div class="col-md-3">
  <img src="${
    prato.imagemPrato
  }"  id="imagemPrato" style="max-width: 70px" alt="${prato.nomePrato}">
  </div>
  <div class="col-md-3" id="body-cart-item">
    <p class="card-title food-name" id = "nome-card-carrinho">${
      prato.nomePrato
    }</p>
    <p class="card-price" id="preco-card-carrinho">R$ ${prato.precoPrato
      .toFixed(2)
      .replace(".", ",")}</p>
  </div>
  <div id="card-quantidade">
    <div class="col-1">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        id = removeItemCard${idPrato}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onclick = "removeItemCard(${idPrato})"
        data-id-prato="${idPrato}"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14"
        />
      </svg>
    </div>
    <p class="quantidade">1</p>
    <div class="col-1">
      <svg
        class="w-6 h-6 text-gray-800 dark:text-white"
        id = adicionaItemCard${idPrato}
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        onclick = "adicionaItemCard(${idPrato})"
        data-id-prato="${idPrato}"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M5 12h14m-7 7V5"
        />
      </svg>
    </div>
  </div>
  </div>`;
  // Insere o card como elemento filho na div listCart
  var listCart = document.getElementById("listCart");
  listCart.appendChild(div);
}

// Diminuir quantidade do ítens no carrinho / remover card pelo card DO CARDÁPIO
window.removeItem = function (element) {
  var idPrato = element.getAttribute("data-id-prato");
  var cardExistente = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var quantidadeNoCarrinho = cardExistente.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);
  quantidadeAtual--;

  if (quantidadeAtual > 0) {
    quantidadeNoCarrinho.textContent = quantidadeAtual;
    atualizaValorTotal();
  } else {
    cardExistente.parentNode.remove();
    zerarValorFinal();
  }
};

// Adicionar ítens ao carrinho pelo card DO CARRINHO
window.adicionaItemCard = function (idPrato) {
  var card = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var prato = encontrarPratoPorId(idPrato);
  var quantidadeNoCarrinho = card.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);
  var quantidadeEstoque = prato.quantidadeEstoque;

  if (quantidadeAtual < quantidadeEstoque) {
    quantidadeAtual++;
    quantidadeNoCarrinho.textContent = quantidadeAtual;
    atualizaValorTotal();
  } else {
    quantidadeLimiteAtingida();
    return;
  }
};

// Diminuir / remover ítem pelo card DO CARRINHO
window.removeItemCard = function (idPrato) {
  var card = document.querySelector(`div[data-id-prato="${idPrato}"]`);
  var quantidadeNoCarrinho = card.querySelector(".quantidade");
  var quantidadeAtual = Number(quantidadeNoCarrinho.textContent);

  if (quantidadeAtual > 1) {
    quantidadeAtual--;
    quantidadeNoCarrinho.textContent = quantidadeAtual;
    atualizaValorTotal();
  } else {
    card.parentNode.remove();
    card.remove();
    atualizaValorTotal();
    zerarValorFinal();
  }
};

// Atualiza o valor total do carrinho
function atualizaValorTotal() {
  var cards = document.querySelectorAll("#listCart .card");
  var valorTotal = 0;
  cards.forEach((card) => {
    var preco = card.querySelector(".card-price").textContent;
    var quantidadeItem = card.querySelector(".quantidade").textContent;
    var valorPorItem = Number(preco.split(" ")[1].replace(",", "."));
    valorTotal += valorPorItem * quantidadeItem;
  });
  valorTotal = desconto(valorTotal);
  var valorFinal = document.querySelector("#valorFinal");
  valorFinal.innerHTML = `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
}

// Zera valor final do carrinho se não houver card nele
function zerarValorFinal() {
  var cards = document.querySelectorAll("#listCart .card");
  if (cards.length == 0) {
    var valorFinal = document.querySelector("#valorFinal");
    valorFinal.innerHTML = `R$ 00,00`;
  }
}

// Finaliza o pedido
window.pagar = function () {
  // Impede pagamento se carrinho estiver vazio
  var valorFinal = document.querySelector("#valorFinal");
  var formaDePagamento = document.getElementById("formaDePagamento");
  if (valorFinal.textContent == "R$ 00,00") {
    alert("Carrinho vazio, faça seu pedido");
    return;
  }
  if (formaDePagamento.value == "cadastreCartao") {
    // Impede pagamento se não houver forma de pagamento selecionada
    alert("Cadastre um cartão no perfil para finalizar o pedido");
    return;
  } else {
    // Finaliza o pedido: salva o pedido no localStorage, limpa o carrinho e altera a quantidade em estoque no localStorage
    alert("Seu pedido foi enviado ao restaurante e está sendo preparado!");
    pedidoFeito();
    alteraQuantidadeEstoque();
    limpaCarrinho();
    var inputCupom = document.getElementById("cupom");
    inputCupom.value = "";
  }
};

// Zera o carrinho após pagamento
function limpaCarrinho() {
  // Ao remover um card do carrinho, faz o card seguinte ocupar o espaço dele (não ficam divs entre os cards)
  var containerCards = document.querySelector("#listCart");
  while (containerCards.firstChild) {
    containerCards.removeChild(containerCards.firstChild);
  }
  zerarValorFinal();
}

// Alerta sobre a quantidade disponível em estoque
function quantidadeLimiteAtingida() {
  alert("Sentimos muito, quantidade indisponível no estoque");
}

// Cria / recupera lista de pedidos no localStorage
if (localStorage.getItem("pedidos") === null) {
  var pedidos = [];
  var numeroPedido = 1;
} else {
  var pedidos = JSON.parse(localStorage.getItem("pedidos"));
  var ultimoPedido = pedidos.length;
  var numeroPedido = ultimoPedido + 1;
}

// Envia pedido finalizado ao localStorage
function pedidoFeito() {
  var cards = document.querySelectorAll("#listCart .card");
  var itensDoPedido = [];
  const restauranteId = getParameter("id");
  const restauranteObj = restaurantes.find(
    (restaurante) => restaurante.idRestaurante == restauranteId
  );
  let tempoPreparo = 0;
  cards.forEach((card) => {
    var idComprado = card.getAttribute("data-id-prato");
    var quantidadeComprada = card.querySelector(".quantidade").textContent;
    const pratoObj = restauranteObj.cardapio.find(
      (prato) => prato.idPrato == idComprado
    );
    var itemComprado = {
      nomePrato: pratoObj.nomePrato,
      quantidadeComprada: quantidadeComprada,
    };
    if (pratoObj.minutosPreparo > tempoPreparo)
      tempoPreparo = pratoObj.minutosPreparo;
    itensDoPedido.push(itemComprado);
  });
  var pedido = {
    idRestaurante: restauranteObj.idRestaurante,
    pedido: numeroPedido,
    finalizado: false,
    precoTotal: valorFinal.textContent,
    avaliacao: 0,
    imagemRestaurante: restauranteObj.imagemRestaurante,
    horarioPedido: new Date(),
    tempoPreparo: tempoPreparo,
    itens: itensDoPedido,
  };
  pedidos.push(pedido);
  numeroPedido++;
  localStorage.setItem("pedidos", JSON.stringify(pedidos));
}

function alteraQuantidadeEstoque() {
  // Obtem ítens do carrinho e suas quantidades
  var cards = document.querySelectorAll("#listCart .card");

  cards.forEach((card) => {
    var idItem = card.getAttribute("data-id-prato");
    var quantidadeItem = card.querySelector(".quantidade").textContent;
    // Obtem quantidade de cada ítem no estoque
    var prato = encontrarPratoPorId(idItem);
    // Atualiza quantidade de cada ítem no estoque
    var novaQuantidade = prato.quantidadeEstoque - quantidadeItem;
    prato.quantidadeEstoque = novaQuantidade;
    // Salva a nova quantidade em estoque no localStorage
    localStorage.setItem("restaurantes", JSON.stringify(restaurantes));
    // Busca o campo de quantidade em estoque no card do cardápio
    var quantidadeEstoqueCardCardapio = document.querySelector(
      `.quantity[data-id-prato="${idItem}"]`
    );
    // Atualiza quantidade em estoque no card do cardápio
    if (prato.quantidadeEstoque == 0) {
      quantidadeEstoqueCardCardapio.innerHTML = `Ítem indisponível`;
    } else {
      if (prato.quantidadeEstoque == 1) {
        quantidadeEstoqueCardCardapio.innerHTML = `${prato.quantidadeEstoque} disponível`;
      } else {
        quantidadeEstoqueCardCardapio.innerHTML = `${prato.quantidadeEstoque} disponíveis`;
      }
    }
  });
}

// Atualiza a quantidade em estoque no cardápio ao iniciar a página
function atualizaQuantidadeEstoqueCardapio() {
  var cards = document.querySelectorAll(".quantity");
  cards.forEach((card) => {
    var idItem = card.getAttribute("data-id-prato");
    var prato = encontrarPratoPorId(idItem);
    var quantidadeEstoqueCardCardapio = document.querySelector(
      `.quantity[data-id-prato="${idItem}"]`
    );
    if (prato.quantidadeEstoque == 0) {
      quantidadeEstoqueCardCardapio.innerHTML = `Ítem indisponível`;
    } else {
      if (prato.quantidadeEstoque == 1) {
        quantidadeEstoqueCardCardapio.innerHTML = `${prato.quantidadeEstoque} disponível`;
      } else {
        quantidadeEstoqueCardCardapio.innerHTML = `${prato.quantidadeEstoque} disponíveis`;
      }
    }
  });
}

function getParameter(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

// Salva cupons de desconto no localStorage
let cupons = {
  GANHOU10: 0.1,
  GANHOU15: 0.15,
  GANHOU20: 0.2,
};
localStorage.setItem("cupons", JSON.stringify(cupons));

// Calcula desconto
function desconto(valorFinal) {
  var cupom = document.getElementById("cupom").value;
  var cupons = JSON.parse(localStorage.getItem("cupons"));
  var desconto = cupons[cupom];
  if (cupom == "") {
    return valorFinal;
  } else {
    if (desconto) {
      valorFinal = valorFinal * (1 - desconto);
      return valorFinal;
    } else {
      alert("Cupom inválido");
      return valorFinal;
    }
  }
}

// Ativa botão de cupom
var btnCupom = document.getElementById("btn-cupom");
btnCupom.addEventListener("click", atualizaValorTotal);

/**
 * Recupera os últimos quatro dígitos de um número de cartão.
 * @param {number} cardNumber
 * @returns
 */
function getLastFourDigits(cardNumber) {
  return cardNumber.slice(-4);
}

/**
 * Recupera o usuário atual a partir do armazenamento local utilizando o email cadastrado.
 * @returns {Object} - O usuário atual.
 */
function getUser() {
  const email = localStorage.getItem("lastEmail");
  return JSON.parse(localStorage.getItem(email));
}

/*
 * Cria uma nova opção para um elemento select.
 * @param {string} value - O valor da opção.
 * @param {string} text - O texto da opção.
 * @returns {HTMLOptionElement} - A opção criada.
 */
function createOption(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.text = text;
  return option;
}

/**
 * Adiciona uma opção a um elemento select.
 * @param {HTMLSelectElement} selectElement
 * @param {HTMLOptionElement} option
 * @returns {void}
 */
function addOptionToSelect(selectElement, option) {
  selectElement.add(option);
}

/**
 * Altera o texto de um botão com base na forma de pagamento selecionada.
 * @param {*} selectElement
 * @param {*} buttonElement
 * @returns {void}
 */
function changeButtonText(selectElement, buttonElement) {
  selectElement.addEventListener("change", function () {
    if (this.value === "") {
      buttonElement.textContent = "Pagar na entrega";
    } else {
      buttonElement.textContent = "Finalizar pedido";
    }
  });
}

/**
 * Preenche o select de formas de pagamento com os cartões de crédito cadastrados pelo usuário.
 * Caso o usuário não tenha nenhum cartão cadastrado, exibe apenas a opção de pagamento na entrega.
 */
function populateCreditCards() {
  const user = getUser();
  const creditCards = user.creditCards;
  const selectElement = document.getElementById("formaDePagamento");
  const pagarButton = document.getElementById("pagarButton");
  addOptionToSelect(
    selectElement,
    createOption("pagarNaEntrega", "Pagar na entrega")
  );

  if (creditCards.length === 0) {
    addOptionToSelect(
      selectElement,
      createOption("cadastreCartao", "Cadastre um cartão no perfil")
    );
    pagarButton.textContent = "Pagar na entrega";
  } else {
    creditCards.forEach((card) => {
      const lastFourDigits = getLastFourDigits(card.number);
      addOptionToSelect(
        selectElement,
        createOption(card.number, `Cartão **** **** **** ${lastFourDigits}`)
      );
    });
  }
  changeButtonText(selectElement, pagarButton);
}

window.onload = function () {
  populateCreditCards();
  atualizaQuantidadeEstoqueCardapio();
};
