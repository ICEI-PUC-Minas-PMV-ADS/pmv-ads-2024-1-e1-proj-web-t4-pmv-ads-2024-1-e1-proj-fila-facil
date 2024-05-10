const MINUTES_MS = 60000;
const MAX_RATING = 5;

const minutesSpans = document.querySelectorAll('.minutos')
const ratingSections = document.querySelectorAll('.rating');

// Atualiza os minutos restantes e exibe a mensagem de atraso
minutesSpans.forEach(span => {
  let minutesLeft = span.textContent;

  function updateMinutes() {
    if(minutesLeft > 0) {
      minutesLeft--;
      span.textContent = minutesLeft;
    } else {
      span.closest('.order-container').textContent = 'PEDIDO ATRASADO!';
    }
  }

  setInterval(updateMinutes, MINUTES_MS);
});


// Adiciona as estrelas de avaliação
for (let index = MAX_RATING; index > 0; index--) {
  ratingSections.forEach(element => {
    element.insertAdjacentHTML('afterbegin',
      `<i class="fa-regular fa-star" data-star-id=${index} style="cursor: pointer;" onclick="handleStarClick(this)"></i>`
    )
  });
}

function handleStarClick(clickedStar) {
  const ratingDiv = clickedStar.closest('.rating');
  const clickedStarId = parseInt(clickedStar.dataset.starId, 10);

  while(ratingDiv.firstChild) {
    ratingDiv.removeChild(ratingDiv.firstChild);
  }


  for(let index = MAX_RATING; index > 0; index--) {
    if(index <= clickedStarId) {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-solid fa-star" data-star-id=${index}></i>`
      )
    } else {
      ratingDiv.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}></i>`
      )}
    }
}