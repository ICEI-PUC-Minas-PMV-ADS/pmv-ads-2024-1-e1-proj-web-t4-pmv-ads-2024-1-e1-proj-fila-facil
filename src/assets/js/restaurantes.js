import { restaurantes } from './restauranteJson.js';

document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('card-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const searchInput = document.getElementById('search-input');
    let currentPage = 1;
    const cardsPerPage = 3;
    let restaurantData = restaurantes; // Use the imported data
    let filteredData = restaurantData;

    function renderRestaurants(page, data) {
        container.innerHTML = '';
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const restaurantsToDisplay = data.slice(start, end);
        
        restaurantsToDisplay.forEach(restaurant => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';

            const imgElement = document.createElement('img');
            imgElement.src = restaurant.imagemRestaurante;
            cardElement.appendChild(imgElement);

            const cardContent = document.createElement('div');
            cardContent.className = 'card-content';

            const titleElement = document.createElement('h2');
            titleElement.className = 'card-title';
            titleElement.textContent = restaurant.nomeRestaurante;
            cardContent.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'card-description';
            descriptionElement.textContent = restaurant.descricaoRestaurante;
            cardContent.appendChild(descriptionElement);

            cardElement.appendChild(cardContent);
            container.appendChild(cardElement);
        });

        prevBtn.disabled = page === 1;
        nextBtn.disabled = end >= data.length;
    }

    function filterRestaurants(event) {
        const searchText = event.target.value.toLowerCase();
        filteredData = restaurantData.filter(restaurant =>
            restaurant.nomeRestaurante.toLowerCase().includes(searchText)
        );
        currentPage = 1; // Reset to the first page on search
        renderRestaurants(currentPage, filteredData);
    }

    searchInput.addEventListener('input', filterRestaurants);

    renderRestaurants(currentPage, filteredData);

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderRestaurants(currentPage, filteredData);
        }
    });

    nextBtn.addEventListener('click', () => {
        if ((currentPage * cardsPerPage) < filteredData.length) {
            currentPage++;
            renderRestaurants(currentPage, filteredData);
        }
    });
});
