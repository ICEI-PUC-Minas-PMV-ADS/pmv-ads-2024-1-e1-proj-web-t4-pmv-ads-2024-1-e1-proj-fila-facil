/**
 * Obtém o ID do restaurante a partir da URL
 * @returns {string|null} ID do restaurante, ou null se query id não estiver presente na URL
 */
function getRestaurantId() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

/**
 * Formata o nome da categoria, trocando espaços por hífens e convertendo para minúsculas
 * @param {string} categoryName - Nome da categoria do prato no cardápio
 * @returns {string} Nome da categoria formatado
 */
function formatCategoryName(categoryName) {
    return categoryName.toLowerCase().replace(' ', '-');
}

/**
 * Cria um item de navegação (li) para a categoria do cardápio.
 * @param {string} category - Nome da categoria do cardápio.
 * @param {boolean} isActive - Indica se o item deve ser marcado como ativo.
 * @returns {HTMLLIElement} O elemento li criado.
 */
function createNavItem(category, isActive) {
    const formattedCategory = formatCategoryName(category);
    const li = document.createElement('li');
    li.classList.add('nav-item');
    li.setAttribute('role', 'presentation');

    const button = document.createElement('button');
    button.classList.add('nav-link');
    if (isActive) button.classList.add('active');
    button.id = `pills-${formattedCategory}-tab`;
    button.setAttribute('data-bs-toggle', 'pill');
    button.setAttribute('data-bs-target', `#pills-${formattedCategory}`);
    button.setAttribute('type', 'button');
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-controls', `pills-${formattedCategory}`);
    button.setAttribute('aria-selected', isActive.toString());
    button.textContent = category;

    li.appendChild(button);
    return li;
}

/**
 * Renderiza a navegação do cardápio com base nas categorias fornecidas.
 * @param {Array<string>} categories - Array de categorias do cardápio.
 * @returns {HTMLElement} O elemento nav criado.
 */
function renderNav(categories) {
    const nav = document.createElement('nav');
    const ul = document.createElement('ul');
    ul.classList.add('nav', 'nav-pills', 'justify-content-center', 'filtros-cardapio');
    ul.id = 'pill-tab';
    ul.setAttribute('role', 'tablist');

    Array.from(categories).forEach((category, index) => {
        const li = createNavItem(category, index === 0);
        ul.appendChild(li);
    });

    nav.appendChild(ul);
    return nav;
}

/**
 * Renderiza o menu do restaurante na seção correspondente.
 * @param {Object} restaurant - Objeto do restaurante contendo o cardápio.
 */
function renderMenu(restaurant) {
    // mapeia as categorias dos pratos do cardápio, usa o Set para obter valores únicos e converte para array
    const categorias = getCategoriesArray(restaurant);
    const produtosSection = document.querySelector('.produtos');

    const nav = renderNav(categorias);
    produtosSection.appendChild(nav);
}

/**
 * Busca as categorias dos pratos do cardápio do restaurante.
 * @param {Object} restaurant - Objeto do restaurante contendo o cardápio.
 * @returns {Array<string>} Array de categorias dos pratos do cardápio.
 */
function getCategoriesArray(restaurant) {
    return Array.from(new Set(restaurant.cardapio.map(prato => prato.categoriaPrato)));
}