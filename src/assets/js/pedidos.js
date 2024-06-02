const MAX_RATING = 5;
const MINUTES_MS = 60000;
const orderJson = JSON.parse(localStorage.getItem('pedidos'));

/**
 * Atualiza a avaliação do pedido
 * @param {HTMLElement} clickedStar - estrela clicada
 */
function handleStarClick(clickedStar) {
  const ratingDiv = clickedStar.closest('.rating');
  const orderId = parseInt(clickedStar.dataset.pedidoId, 10);
  const clickedStarId = parseInt(clickedStar.dataset.starId, 10);

  ratingDiv.innerHTML = '';

  for (let index = MAX_RATING; index > 0; index--) {
    ratingDiv.insertAdjacentHTML('afterbegin',
      `<i class="${index <= clickedStarId ? 'fa-solid' : 'fa-regular'} fa-star" data-star-id=${index}></i>`
    );
  }

  orderJson[orderId - 1].avaliacao = clickedStarId;
  localStorage.setItem('pedidos', JSON.stringify(orderJson));
}

/**
 * Cria um item do pedido
 * @param {Object} element - pedido puxado do localStorage
 * @param {number} index - índice do pedido
 * @param {boolean} isFinalizado - se o pedido está finalizado
 */
function createOrderItem(element, index, isFinalizado) {
  const divCarouselItem = document.createElement('div');
  divCarouselItem.className = `carousel-item${index === 0 ? ' active' : ''}`;

  const divCard = document.createElement('div');
  divCard.className = 'card card-div h-100';

  const imgRestaurant = document.createElement('img');
  imgRestaurant.alt = 'Logo do restaurante';
  imgRestaurant.src = element.imagemRestaurante;

  const divCardBody = document.createElement('div');
  divCardBody.className = 'card-body d-flex flex-column text-center';

  const h5CardTitle = document.createElement('h5');
  h5CardTitle.className = 'card-title';
  h5CardTitle.textContent = `PEDIDO Nº ${element.pedido}`;

  const ul = document.createElement('ul');
  ul.className = 'mb-2 mt-2 text-start align-self-center';
  element.itens.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.quantidadeComprada}x ${item.nomePrato}`;
    ul.appendChild(li);
  });

  const dottedLine1 = document.createElement('div');
  dottedLine1.className = 'dotted_line';
  const dottedLine2 = document.createElement('div');
  dottedLine2.className = 'dotted_line';

  divCardBody.appendChild(h5CardTitle);
  divCardBody.appendChild(dottedLine1);
  divCardBody.appendChild(ul);
  divCardBody.appendChild(dottedLine2);

  if (isFinalizado) {
    const totalText = document.createElement('p');
    totalText.innerHTML = `Total: <span class="preco_total">${element.precoTotal}</span>`;
    divCardBody.appendChild(totalText);

    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'rating';
    divCardBody.appendChild(ratingDiv);

    const orderRating = element.avaliacao;
    for (let index = MAX_RATING; index > 0; index--) {
      ratingDiv.insertAdjacentHTML('afterbegin', 
        `<i class="${index <= orderRating ? 'fa-solid' : 'fa-regular'} fa-star" data-star-id=${index} data-pedido-id=${element.pedido} ${orderRating === 0 ? 'style="cursor: pointer;" onclick="handleStarClick(this)"' : ''}></i>`
      );
    }
  } else {
    const divTime = document.createElement('div');
    divTime.className = 'order-container';

    const spanTime = document.createElement('span');
    spanTime.textContent = 'Minutos restantes: ';

    const spanWait = document.createElement('span');
    spanWait.className = 'tempo_espera';

    const spanMinutes = document.createElement('span');
    spanMinutes.className = 'minutos';
    spanMinutes.setAttribute('data-pedido-id', element.pedido);

    const orderStartTime = new Date(element.horarioPedido);
    const processingTimeMinutes = element.tempoPreparo;
    const orderEndTime = new Date(orderStartTime.getTime() + processingTimeMinutes * MINUTES_MS);

    const now = new Date();

    // calcula a diferença entre a hora atual e a hora de término
    const timeDifference = orderEndTime - now;

    let diffInMinutes;

    if (timeDifference > 0) {
      // Converta a diferença de milissegundos para minutos
      diffInMinutes = Math.floor(timeDifference / MINUTES_MS) + 1;
    } else {
      updateOrderStatus(element.pedido);
      alert(`Pedido n° ${element.pedido} finalizado!`);
      location.reload();
    }

    spanMinutes.textContent = diffInMinutes;

    spanWait.appendChild(spanMinutes);
    spanTime.appendChild(spanWait);
    divTime.appendChild(spanTime);

    const pStatus = document.createElement('p');
    pStatus.className = 'status_pedido';
    pStatus.textContent = 'Em andamento';
    divTime.appendChild(pStatus);

    divCardBody.appendChild(divTime);
  }

  divCard.appendChild(imgRestaurant);
  divCard.appendChild(divCardBody);
  divCarouselItem.appendChild(divCard);

  return divCarouselItem;
}

/**
 * Renderiza os pedidos no carrossel
 * @returns {void}
 */
function renderOrders() {
  const carouselOpen = document.querySelector('.carousel-inner');
  const carouselClosed = document.querySelector('.inner-finalizado');

  if (!orderJson) {
    return;
  }

  let finalizadoIndex = 0;
  let naoFinalizadoIndex = 0;

  orderJson.forEach((element) => {
    if (element.finalizado) {
      carouselClosed.appendChild(createOrderItem(element, finalizadoIndex, true));
      finalizadoIndex++;
    } else {
      carouselOpen.appendChild(createOrderItem(element, naoFinalizadoIndex, false));
      naoFinalizadoIndex++;
    }
  });
}

/**
 * Atualiza o status do pedido para finalizado
 * @param {number} orderId - id do pedido
 */
function updateOrderStatus(orderId) {
  orderJson[orderId - 1].finalizado = true;
  localStorage.setItem('pedidos', JSON.stringify(orderJson));
}

function alertOrderFinished(pedidoId) {
  alert(`Pedido ${pedidoId} finalizado!`);
}

// chama a função pra renderizar os cards
renderOrders();

// Atualiza os minutos restantes e exibe a mensagem de finalizado
const minutesSpans = document.querySelectorAll('.minutos');
minutesSpans.forEach(span => {
  let minutesLeft = span.textContent;

  function updateMinutes() {
    minutesLeft--;
    if (minutesLeft > 0) {
      span.textContent = minutesLeft;
    } else {
      const orderStatus = span.closest('.order-container');
      orderStatus.innerHTML = '<span class="status_pedido">PEDIDO FINALIZADO!</span>';
      const orderId = span.dataset.pedidoId;
      alertOrderFinished(orderId);
      updateOrderStatus(orderId);
    }
  }

  setInterval(updateMinutes, MINUTES_MS);
});
