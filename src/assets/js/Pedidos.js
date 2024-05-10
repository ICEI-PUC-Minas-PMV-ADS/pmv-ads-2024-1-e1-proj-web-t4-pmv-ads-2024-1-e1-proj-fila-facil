const MINUTE = 60000
const minutesSpan = document.querySelectorAll('.minutos')

minutesSpan.forEach(element => {
  let minutesLeft = element.textContent;
  setInterval(function(){
    if(minutesLeft > 0) {
      minutesLeft = minutesLeft - 1;
      element.textContent = minutesLeft
    } else {
      element.parentElement.parentElement.textContent = 'PEDIDO ATRASADO!'
    }
  }, MINUTE)
});

const STARQUANTITY = 5

const ratingSection = document.querySelector('.rating');
for (let index = 5; index > 0; index--) {
  ratingSection.insertAdjacentHTML('afterbegin',
    `<i class="fa-regular fa-star" data-star-id=${index} style="cursor: pointer;" onclick="starClicked(this)"></i>`
  )
}

function starClicked(element) {
  const starPosition = element.getAttribute('data-star-id')
  document.querySelectorAll('.fa-star').forEach(elementStar => {
    elementStar.remove()
  });
  for(let index = 5; index > 0; index--) {
    if(index <= starPosition) {
      ratingSection.insertAdjacentHTML('afterbegin',
        `<i class="fa-solid fa-star" data-star-id=${index}"></i>`
      )
    } else {
      ratingSection.insertAdjacentHTML('afterbegin',
        `<i class="fa-regular fa-star" data-star-id=${index}"></i>`
      )
    }
  }
}