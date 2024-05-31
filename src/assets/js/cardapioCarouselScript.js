import { restaurantes } from './restauranteJson.js';

const searchForm = document.querySelector('.input-group');
const baseUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
const searchParam = getParameter('query');
const id = getParameter('id');

handleSearchForm();
handleRestauranteRendering();
handleSearchNotification();
checkForErrorSearch();

/**
 * Função para tratar o submit do formulário de pesquisa
 */
function handleSearchForm() {
    searchForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const searchQuery = document.getElementById('search-input').value;
        const url = `${baseUrl}?id=${id}&query=${encodeURIComponent(searchQuery).toLowerCase()}`; 
        window.location.href = url;
    });
}

/**
 * Renderiza o cardápio se o ID do restaurante foi encontrado
 */
function handleRestauranteRendering() {
    if (id) {
        const restauranteObj = restaurantes.find(restaurante => restaurante.idRestaurante == id);
        if (restauranteObj) {
            const categoriesItems = getCategoriesArray(restauranteObj, searchParam);
            renderMenu(restauranteObj, searchParam);
            renderCardapio(categoriesItems, restauranteObj, searchParam);
            document.querySelector('.restaurante-nome').textContent = restauranteObj.nomeRestaurante;
        } else {
            redirectToRestaurantesPage();
        }
    } else {
        redirectToRestaurantesPage();
    }
}

/**
 * Função que checa se há uma pesquisa feita e exibe botão de remover pesquisa
 */
function handleSearchNotification() {
    if (searchParam) {
        const searchAviso = document.querySelector('.search-section');
        const div = createRemoveFilterDiv();

        searchAviso.append(div);
        document.querySelector('.tab-content').style.marginTop = '1em';

        div.addEventListener('click', () => {
            window.location.href = `${baseUrl}?id=${id}`;
        });
    }
}

/**
 * Exibe um modal de erro caso houver um erro na pesquisa
 */
function checkForErrorSearch() {
    if (getParameter("errorSearch") == 1) {
        showErrorModal("A pesquisa informada não retornou nenhum resultado");
    }
}

/**
 * Redireciona para a página de restaurantes
 */
function redirectToRestaurantesPage() {
    window.location.href = "../pages/restaurantes.html";
}

/**
 * Cria a div que contem a opção de remover filtros
 */
function createRemoveFilterDiv() {
    const div = document.createElement('div');
    div.classList.add('d-flex', 'justify-content-end', 'remove-search');

    const removeIcon = document.createElement('i');
    removeIcon.classList.add('fa-solid', 'fa-eraser', 'mt-1');
    removeIcon.style.cursor = 'pointer';
    removeIcon.style.color = '#b13a3a';

    const span = document.createElement('span');
    span.textContent = 'Remover filtro';
    span.style.cursor = 'pointer';
    span.style.color = '#b13a3a';

    div.append(removeIcon, span);
    return div;
}

/**
 * Exibe o modal de erro com a mensagem passada
 * @param {String} message 
 */
function showErrorModal(message) {
    document.getElementById('errorMessage').textContent = message;
    const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
    errorModal.show();
}


// seção que gerencia as categorias e o carrossel

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
