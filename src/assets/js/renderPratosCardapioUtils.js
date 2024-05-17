/**
 * Cria um elemento div para representar uma linha pontilhada.
 * @returns {HTMLDivElement} O elemento div criado.
 */
function createDottedLine() {
    const dottedLine = document.createElement('div');
    dottedLine.classList.add('dotted-line');
    return dottedLine;
}

/**
 * Cria um item do carousel para um prato.
 * @param {Object} prato - Dados do prato.
 * @param {boolean} isActive - Indica se o item é o ativo no carousel.
 * @returns {HTMLElement} - O elemento de item do carousel.
 */
function createCarouselItem(prato, isActive) {
    const carouselItem = document.createElement('div');
    carouselItem.classList.add('carousel-item');
    if (isActive) carouselItem.classList.add('active');

    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'h-100');

    const cardImg = document.createElement('img');
    cardImg.src = prato.imagemPrato;
    cardImg.alt = `Imagem do prato ${prato.nomePrato}`;

    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body', 'd-flex', 'flex-column', 'text-center');

    const pratoName = document.createElement('h5');
    pratoName.classList.add('card-title');
    pratoName.textContent = prato.nomePrato;

    const dottedLine = createDottedLine();

    const pratoDescription = document.createElement('p');
    pratoDescription.classList.add('card-text');
    pratoDescription.textContent = prato.descricaoPrato;

    const priceAndQuantityDiv = createPriceAndQuantityDiv(prato);

    cardBody.appendChild(pratoName);
    cardBody.appendChild(dottedLine);
    cardBody.appendChild(pratoDescription);
    cardBody.appendChild(priceAndQuantityDiv);

    cardDiv.appendChild(cardImg);
    cardDiv.appendChild(cardBody);

    carouselItem.appendChild(cardDiv);
    return carouselItem;
}

/**
 * Cria a seção de preço e quantidade do card.
 * @param {Object} prato - Dados do prato.
 * @returns {HTMLElement} - O elemento de preço e quantidade.
 */
function createPriceAndQuantityDiv(prato) {
    const priceAndQuantityDiv = document.createElement('div');
    priceAndQuantityDiv.classList.add('mt-auto');

    const quantityP = document.createElement('p');
    quantityP.classList.add('card-text');

    const quantityText = document.createElement('small');
    quantityText.classList.add('text-muted', 'quantity');
    quantityText.textContent = `${prato.quantidadeEstoque} disponíveis`;

    const priceDiv = document.createElement('div');
    priceDiv.classList.add('price_interactions', 'row', 'align-items-center');

    const colMinus = document.createElement('div');
    colMinus.classList.add('col-auto');

    const minusButton = document.createElement('i');
    minusButton.classList.add('fa-solid', 'fa-circle-minus', 'h3', 'mb-0');
    minusButton.setAttribute("data-id-prato", prato.idPrato)

    const price = document.createElement('div');
    price.classList.add('col', 'price');
    price.textContent = `R$ ${prato.precoPrato.toFixed(2).replace('.', ',')}`;

    const colPlus = document.createElement('div');
    colPlus.classList.add('col-auto');

    const plusButton = document.createElement('i');
    plusButton.classList.add('fa-solid', 'fa-circle-plus', 'h3', 'mb-0');
    plusButton.setAttribute("data-id-prato", prato.idPrato)

    quantityP.appendChild(quantityText);
    colMinus.appendChild(minusButton);
    colPlus.appendChild(plusButton);

    priceDiv.appendChild(colMinus);
    priceDiv.appendChild(price);
    priceDiv.appendChild(colPlus);
    priceAndQuantityDiv.appendChild(quantityP);
    priceAndQuantityDiv.appendChild(priceDiv);

    return priceAndQuantityDiv;
}

/**
 * Cria os controles de navegação do carousel.
 * @param {string} formattedCategory - Categoria formatada para o ID do carousel.
 * @returns {Array} - Array com os elementos de controle do carousel.
 */
function createCarouselControls(formattedCategory) {
    const controls = [];

    const carouselControlPrev = document.createElement('button');
    carouselControlPrev.classList.add('carousel-control-prev');
    carouselControlPrev.setAttribute('type', 'button');
    carouselControlPrev.setAttribute('data-bs-target', `#carousel-${formattedCategory}`);
    carouselControlPrev.setAttribute('data-bs-slide', 'prev');

    const prevIcon = document.createElement('span');
    prevIcon.classList.add('carousel-control-prev-icon');
    prevIcon.setAttribute('aria-hidden', 'true');

    const prevText = document.createElement('span');
    prevText.classList.add('visually-hidden');
    prevText.textContent = 'Previous';

    carouselControlPrev.appendChild(prevIcon);
    carouselControlPrev.appendChild(prevText);
    controls.push(carouselControlPrev);

    const carouselControlNext = document.createElement('button');
    carouselControlNext.classList.add('carousel-control-next');
    carouselControlNext.setAttribute('type', 'button');
    carouselControlNext.setAttribute('data-bs-target', `#carousel-${formattedCategory}`);
    carouselControlNext.setAttribute('data-bs-slide', 'next');

    const nextIcon = document.createElement('span');
    nextIcon.classList.add('carousel-control-next-icon');
    nextIcon.setAttribute('aria-hidden', 'true');

    const nextText = document.createElement('span');
    nextText.classList.add('visually-hidden');
    nextText.textContent = 'Next';

    carouselControlNext.appendChild(nextIcon);
    carouselControlNext.appendChild(nextText);
    controls.push(carouselControlNext);

    return controls;
}

/**
 * Renderiza a seção de cardápio com carousels.
 * @param {Array} categories - Lista de categorias.
 * @param {Array} restaurant - Lista de restaurantes.
 * @param {String} pratoSearch - Conteúdo a ser procurado no nome do prato
 * @param {Object} restaurant - Dados do restaurante.
 */
function renderCardapio(categories, restaurant, pratoSearch=null) {
    const cardapioSection = document.querySelector('.tab-content');

    categories.forEach((category, index) => {
        const formattedCategory = formatCategoryName(category);

        const cardapioTabSection = document.createElement('section');
        cardapioTabSection.classList.add("tab-pane", "fade", "show");
        if (index === 0) cardapioTabSection.classList.add("active");
        cardapioTabSection.id = `pills-${formattedCategory}`;
        cardapioTabSection.setAttribute('role', 'tabpanel');
        cardapioTabSection.setAttribute('aria-labelledby', `pills-${formattedCategory}-tab`);
        cardapioTabSection.setAttribute('tabindex', index);

        const cardapioItemsSection = document.createElement('section');
        cardapioItemsSection.classList.add('container', 'cardapio-items');

        const carouselDiv = document.createElement('div');
        carouselDiv.id = `carousel-${formattedCategory}`;
        carouselDiv.classList.add('carousel');
        carouselDiv.setAttribute('data-bs-ride', 'carousel');

        const carouselInner = document.createElement('div');
        carouselInner.classList.add('carousel-inner');

        let pratos;
        if (pratoSearch) {
            pratoSearch = pratoSearch.toLowerCase();
            pratos = restaurant.cardapio.filter(prato =>
                prato.categoriaPrato === category && 
                (prato.nomePrato.toLowerCase().includes(pratoSearch) || prato.descricaoPrato.toLowerCase().includes(pratoSearch))
            );
        } else {
            pratos = restaurant.cardapio.filter(prato => prato.categoriaPrato === category);
        }

        pratos.forEach((prato, pratoIndex) => {
            const carouselItem = createCarouselItem(prato, pratoIndex === 0, pratoIndex);
            carouselInner.appendChild(carouselItem);
        });

        const carouselControls = createCarouselControls(formattedCategory);
        carouselControls.forEach(control => carouselDiv.appendChild(control));

        carouselDiv.appendChild(carouselInner);
        cardapioItemsSection.appendChild(carouselDiv);
        cardapioTabSection.appendChild(cardapioItemsSection);
        cardapioSection.appendChild(cardapioTabSection);
    });
}