const produtos = document.querySelectorAll(".filtros-cardapio>li>button");

produtos.forEach(element => {
    element.addEventListener("click", handleButtonClick);
});

window.addEventListener('load', function() {
    const activePill = this.document.querySelector(".filtros-cardapio .active");
    const pillName = activePill.getAttribute('aria-controls');
    const pillCards = document.getElementById(pillName);
    const cardapioSection = pillCards.querySelector('.cardapio-items');
    const carouselItem = pillCards.querySelectorAll('.carousel-item');
    const cardQuantity = carouselItem.length;
    if (cardQuantity < 4) {
        updateCardSize(cardQuantity, carouselItem, cardapioSection);
    }
});

function handleButtonClick() {
    const pillName = this.getAttribute('aria-controls');
    const pillCards = document.getElementById(pillName);
    const cardapioSection = pillCards.querySelector('.cardapio-items');
    const carouselItem = pillCards.querySelectorAll('.carousel-item');
    const cardQuantity = carouselItem.length;
    if (cardQuantity < 4) {
        updateCardSize(cardQuantity, carouselItem, cardapioSection);
    }
}


function updateCardSize(cardQuantity, carouselItem, cardapioSection) {
    carouselItem.forEach(element => {
        element.style.flex = `0 0 calc(100%/${cardQuantity})`
        if (window.matchMedia("(min-width:576px)").matches) {
            switch (cardQuantity) {
                case 1:
                    percentage = '25%'
                    break;
                case 2:
                    percentage = '35%'
                    break;
                case 3:
                    percentage = '55%'
                    break;
                }
            cardapioSection.style.maxWidth = percentage;
        }
    });

}

const carousels = document.querySelectorAll('.carousel-inner');
const multipleItemCarousel = document.querySelectorAll('.carousel');

carousels.forEach(function(carousel) {
    if (window.matchMedia("(min-width:576px)").matches) {
        var cardWidth = carousel.querySelector('.carousel-item').offsetWidth;

        var scrollPosition = 0

        carousel.parentElement.querySelector('.carousel-control-next').addEventListener('click', function(){
            var carouselWidth = carousel.scrollWidth;
            var cardWidth = carousel.querySelector('.carousel-item').offsetWidth;
            if (scrollPosition < (carouselWidth - (cardWidth * 5))) {
                scrollPosition = scrollPosition + cardWidth;
                carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        });

        carousel.parentElement.querySelector('.carousel-control-prev').addEventListener('click', function(){
            var cardWidth = carousel.querySelector('.carousel-item').offsetWidth;
            if (scrollPosition > 0) {
                scrollPosition = scrollPosition - cardWidth;
                carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
            }
        });

        scrollPosition = scrollPosition + cardWidth;
    } 
    else {
        multipleItemCarousel.forEach(element => {
            element.parentElement.classList.add('slide');
        });
    }
});
