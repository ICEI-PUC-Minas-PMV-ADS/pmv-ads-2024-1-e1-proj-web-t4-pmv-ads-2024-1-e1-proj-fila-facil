const produtos = document.querySelectorAll(".filtros-cardapio>li>button");

produtos.forEach(element => {
    element.addEventListener("click", handleButtonClick);
});

window.addEventListener('load', function() {
    const activePill = document.querySelector(".filtros-cardapio .active");
    if (activePill) {
        const pillName = activePill.getAttribute('aria-controls');
        const pillCards = document.getElementById(pillName);
        if (pillCards) {
            const cardapioSection = pillCards.querySelector('.cardapio-items');
            const carouselItem = pillCards.querySelectorAll('.carousel-item');
            const cardQuantity = carouselItem.length;
            if (cardQuantity < 4) {
                updateCardSize(cardQuantity, carouselItem, cardapioSection);
            }
        }
    }
});

function handleButtonClick() {
    const pillName = this.getAttribute('aria-controls');
    const pillCards = document.getElementById(pillName);
    if (pillCards) {
        const cardapioSection = pillCards.querySelector('.cardapio-items');
        const carouselItem = pillCards.querySelectorAll('.carousel-item');
        const cardQuantity = carouselItem.length;
        if (cardQuantity < 4) {
            updateCardSize(cardQuantity, carouselItem, cardapioSection);
        }
    }
}

function updateCardSize(cardQuantity, carouselItem, cardapioSection) {
    carouselItem.forEach(element => {
        element.style.flex = `0 0 calc(100%/${cardQuantity})`
        if (window.matchMedia("(min-width:576px)").matches) {
            let percentage = 0;
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
        var cardWidthElement = carousel.querySelector('.carousel-item');
        
        // Checa se o carrossel está vazio
        if (cardWidthElement === null) {
            const parent = carousel.parentElement;
            if (parent) {
                const nextControl = parent.querySelector('.carousel-control-next');
                const prevControl = parent.querySelector('.carousel-control-prev');
                
                if (nextControl) nextControl.style.display = 'none';
                if (prevControl) prevControl.style.display = 'none';
                
                parent.innerHTML = '<h3 class="text-center" style="margin-top: 20vh;">Não há nenhum item a ser exibido por aqui. Faça um novo pedido!</h3>';
            }
            return;
        } else {
            var cardWidth = cardWidthElement.offsetWidth;
        }

        var scrollPosition = 0;

        const nextButton = carousel.parentElement.querySelector('.carousel-control-next');
        const prevButton = carousel.parentElement.querySelector('.carousel-control-prev');

        if (nextButton && prevButton) {
            nextButton.addEventListener('click', function() {
                var carouselWidth = carousel.scrollWidth;
                var cardWidth = carousel.querySelector('.carousel-item').offsetWidth;
                if (scrollPosition < (carouselWidth - (cardWidth * 5))) {
                    scrollPosition = scrollPosition + cardWidth;
                    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
            });

            prevButton.addEventListener('click', function() {
                var cardWidth = carousel.querySelector('.carousel-item').offsetWidth;
                if (scrollPosition > 0) {
                    scrollPosition = scrollPosition - cardWidth;
                    carousel.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                }
            });
        }
    } else {
        multipleItemCarousel.forEach(element => {
            const parent = element.parentElement;
            if (parent) {
                if (!element.querySelector('.carousel-item')) {
                    const nextControl = parent.querySelector('.carousel-control-next');
                    const prevControl = parent.querySelector('.carousel-control-prev');
                    
                    if (nextControl) nextControl.style.display = 'none';
                    if (prevControl) prevControl.style.display = 'none';
                    
                    parent.innerHTML = '<h3 class="text-center" style="margin-top: 20vh;">Não há nenhum item a ser exibido por aqui. Faça um novo pedido!</h3>';
                } else {
                    parent.classList.add('slide');
                }
            }
        });
    }
});
