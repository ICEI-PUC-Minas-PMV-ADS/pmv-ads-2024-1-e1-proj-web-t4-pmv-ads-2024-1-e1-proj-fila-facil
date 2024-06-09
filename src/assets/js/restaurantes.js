// Aguarda o carregamento do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function() {
    // Obtém referências aos elementos HTML relevantes
    const container = document.getElementById('card-container');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const searchInput = document.getElementById('search-input');
    let currentPage = 1; // Inicializa a página atual como 1
    const cardsPerPage = 3; // Define o número de cards por página
    // Obtém os dados dos restaurantes do localStorage, ou uma lista vazia se não houver
    let restaurantData = JSON.parse(localStorage.getItem('restaurantes')) || [];

    // Função para renderizar os cards dos restaurantes
    function renderRestaurants(page, data) {
        // Limpa o conteúdo do container antes de adicionar novos cards
        container.innerHTML = '';
        // Calcula os índices de início e fim dos dados a serem exibidos na página atual
        const start = (page - 1) * cardsPerPage;
        const end = start + cardsPerPage;
        // Seleciona os dados dos restaurantes a serem exibidos na página atual
        const restaurantsToDisplay = data.slice(start, end);
        
        // Itera sobre os dados dos restaurantes selecionados e cria um card para cada um
        restaurantsToDisplay.forEach(restaurant => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card', 'card-div');
            cardElement.addEventListener('click', () => {
                // Redireciona para a página de cardápio ao clicar no card do restaurante
                window.location.href = `cardapio.html?id=${restaurant.idRestaurante}`; // Altere 'cardapio.html' para a URL desejada
            });

            // Adiciona um evento de clique à imagem para redirecionar para a página de cardápio
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

        // Desabilita o botão "Anterior" se estiver na primeira página
        prevBtn.disabled = page === 1;
        // Desabilita o botão "Próximo" se estiver na última página
        nextBtn.disabled = end >= data.length;
    }

    // Função para filtrar os restaurantes com base no texto de busca
    function filterRestaurants() {
        const searchText = searchInput.value.toLowerCase();
        // Filtra os dados dos restaurantes com base no texto de busca
        const filteredData = restaurantData.filter(restaurant =>
            restaurant.nomeRestaurante.toLowerCase().includes(searchText) ||
            restaurant.descricaoRestaurante.toLowerCase().includes(searchText)
        );
        currentPage = 1; // Resetar para a primeira página ao buscar
        // Renderiza os cards dos restaurantes filtrados
        renderRestaurants(currentPage, filteredData);
    }

    // Adiciona um ouvinte de evento de input ao campo de busca para filtrar os restaurantes em tempo real
    searchInput.addEventListener('input', filterRestaurants);

    // Renderiza os cards dos restaurantes com os dados do localStorage ao carregar a página
    renderRestaurants(currentPage, restaurantData);

    // Adiciona ouvintes de evento aos botões de navegação entre páginas
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderRestaurants(currentPage, restaurantData);
        }
    });

    nextBtn.addEventListener('click', () => {
        if ((currentPage * cardsPerPage) < restaurantData.length) {
            currentPage++;
            renderRestaurants(currentPage, restaurantData);
        }
    });
});
