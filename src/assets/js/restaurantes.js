document.addEventListener("DOMContentLoaded", function() {
    const container = document.getElementById('card-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPage = 1;
    const cardsPerPage = 3;
    let restaurantData = [];

    function renderRestaurants(page) {
        container.innerHTML = '';
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        const restaurantsToDisplay = restaurantData.slice(start, end);
        
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
            titleElement.textContent = restaurant.title;
            cardContent.appendChild(titleElement);

            const descriptionElement = document.createElement('p');
            descriptionElement.className = 'card-description';
            descriptionElement.textContent = restaurant.descricaoRestaurante;
            cardContent.appendChild(descriptionElement);

            cardElement.appendChild(cardContent);
            container.appendChild(cardElement);
        });

        prevBtn.disabled = page === 1;
        nextBtn.disabled = end >= restaurantData.length;
    }// qual e o caminho do arquivo json

    fetch('../assets/js/restaurantes.json')
        .then(response  => response.json())
        .then(data => {
            restaurantData = data;
            renderRestaurants(currentPage);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderRestaurants(currentPage);
        }
    });

    nextBtn.addEventListener('click', () => {
        if ((currentPage * cardsPerPage) < restaurantData.length) {
            currentPage++;
            renderRestaurants(currentPage);
        }
    });
});

