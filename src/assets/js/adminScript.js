createModal('add', 'Adicionando item');
createModal('edit', 'Editando item');

// Seleciona os elementos do DOM
const restaurantName = document.querySelector('#restaurant-name');
const restaurantDescription = document.getElementById("restaurant-description");
const restaurantPicture = document.querySelector(".square");
const photoUpload = document.getElementById('customFile');
const updateForm = document.querySelector('.file-upload');
const cardapioItems = document.querySelector('.cardapio-items');
const updateItemBtn = document.getElementById('confirm-edit');
const deleteItemBtn = document.getElementById('confirm-delete');
const editId = document.getElementById('edit-id');
const deleteId = document.getElementById('delete-id');
const addBtn = document.getElementById('add-itens');
const totalSold = document.getElementById('faturamento');
const totalOrders = document.getElementById('pedidosRecebidos');

// Variáveis globais
let modalEdit, modalAdd, modalDelete;

const orders = JSON.parse(localStorage.getItem('pedidos')) || [];
let restaurantJSON = JSON.parse(localStorage.getItem('restaurantes'));
const restaurantId = parseInt(getParameter('id'));
let restaurantInfos = getRestaurantById(restaurantId);
const restaurantIndex = getIndexOfRestaurant(restaurantId);

let currentName = restaurantInfos.nomeRestaurante;
let currentDescription = restaurantInfos.descricaoRestaurante;
let currentPhoto = restaurantInfos.imagemRestaurante;

// Funções auxiliares
/**
 * Função para zerar o valor do faturamento e a quantidade de pedidos
 */
function setToZero() {
  totalSold.innerHTML = 'R$ 0,00';
  totalOrders.innerHTML = '0';
}

/**
 * Função para buscar um restaurante do localStorage pelo ID
 * @param {int} id
 * @returns {object} Restaurante
 */
function getRestaurantById(id) {
  restaurantJSON = JSON.parse(localStorage.getItem('restaurantes'));
  return restaurantJSON.find(restaurant => restaurant.idRestaurante === id);
}

/**
 * Função para buscar o índice de um restaurante no array de restaurantes
 * @param {int} id
 * @returns {int} Índice do restaurante
 */
function getIndexOfRestaurant(id) {
  return restaurantJSON.findIndex(restaurant => restaurant.idRestaurante === id);
}

/**
 * Função para atualizar as informações de um restaurante no localStorage
 * @param {str} key Chave do objeto 
 * @param {*} value Valor a ser atualizado
 */
function updateLocalStorageInfo(key, value) {
  restaurantJSON[restaurantIndex][key] = value;
  localStorage.setItem('restaurantes', JSON.stringify(restaurantJSON));
}

/**
 * Função para obter um parâmetro da URL
 * @param {str} parameter 
 * @returns {str} Valor do parâmetro
 */
function getParameter(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

// Funções de atualização
/**
 * Função para atualizar o nome do restaurante no localStorage
 * @param {str} name Novo nome do restaurante 
 */
function updateName(name) {
  currentName = name;
  updateLocalStorageInfo("nomeRestaurante", name);
}

/**
 * Função para atualizar a descrição do restaurante no localStorage
 * @param {str} description Nova descrição do restaurante
 */
function updateDescription(description) {
  currentDescription = description;
  updateLocalStorageInfo("descricaoRestaurante", description);
}

/**
 * Função para atualizar a imagem do restaurante no localStorage
 * @param {*} photo Nova imagem do restaurante
 */
function updatePhoto(photo) {
  currentPhoto = photo;
  updateLocalStorageInfo("imagemRestaurante", photo);
}

// Funções de renderização
/**
 * Função para renderizar o faturamento e a quantidade de pedidos recebidos
 * @returns {void}
 */
function renderSold() {
  if (!orders.length) {
    setToZero();
    return;
  }

  const ordersRestaurant = orders.filter(item => item.idRestaurante === restaurantId);
  if (!ordersRestaurant.length) {
    setToZero();
    return;
  }

  const orderTotal = ordersRestaurant.length;
  const money = ordersRestaurant.reduce((total, order) => {
    const orderTotal = parseFloat(order.precoTotal.replace('R$ ', '').replace(',', '.'));
    return total + orderTotal;
  }, 0);

  totalSold.innerHTML = `R$ ${money.toFixed(2).replace('.', ',')}`;
  totalOrders.innerHTML = orderTotal;
}

/**
 * Função para criar um modal
 * @param {str} type Tipo do modal 
 * @param {str} titleMessage Mensagem do título do modal 
 */
function createModal(type, titleMessage) {
  // Criar div principal do modal
  const modal = document.createElement('div');
  modal.className = 'modal fade';
  modal.id = `modal-${type}`;
  modal.tabIndex = -1;
  modal.setAttribute('aria-labelledby', 'addModalLabel');
  modal.setAttribute('aria-hidden', 'true');

  // Criar div dialog
  const modalDialog = document.createElement('div');
  modalDialog.className = 'modal-dialog';

  // Criar div content
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Criar div header
  const modalHeader = document.createElement('div');
  modalHeader.className = 'modal-header';

  // Criar título do modal
  const modalTitle = document.createElement('h5');
  modalTitle.className = 'modal-title';
  modalTitle.id = 'addModalTitle';
  modalTitle.textContent = titleMessage;

  // Criar botão de fechar
  const closeButton = document.createElement('button');
  closeButton.type = 'button';
  closeButton.className = 'btn-close';
  closeButton.setAttribute('data-bs-dismiss', 'modal');
  closeButton.setAttribute('aria-label', 'Close');

  // Adicionar título e botão de fechar ao header
  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(closeButton);

  // Criar formulário
  const form = document.createElement('form');
  form.id = `form-${type}`;

  // Criar div body do modal
  const modalBody = document.createElement('div');
  modalBody.className = 'modal-body';

  // Função auxiliar para criar elementos de formulário com rótulos
  function createFormElement(labelText, inputType, inputId, inputAttributes = {}) {
    const formGroup = document.createElement('div');
    formGroup.className = 'mb-3';
    if (inputType === 'hidden') {
      formGroup.style.display = 'none';
    }

    const label = document.createElement('label');
    label.setAttribute('for', inputId);
    label.textContent = labelText;
    formGroup.appendChild(label);

    const input = document.createElement(inputType === 'textarea' ? 'textarea' : 'input');
    input.className = 'form-control';
    input.id = inputId;
    if (inputType !== 'textarea') {
      input.type = inputType;
    }

    for (const attr in inputAttributes) {
      input.setAttribute(attr, inputAttributes[attr]);
    }

    formGroup.appendChild(input);
    modalBody.appendChild(formGroup);
  }

  // Adicionar elementos do formulário
  createFormElement('', 'hidden', `${type}-id`);
  createFormElement('Nome', 'text', `${type}-name`);
  createFormElement('Imagem', 'file', `${type}-image`);
  createFormElement('Descrição', 'textarea', `${type}-description`);
  createFormElement('Quantidade', 'number', `${type}-quantity`);
  createFormElement('Preço', 'number', `${type}-price`, { step: '0.01' });
  createFormElement('Tempo de preparo (minutos)', 'number', `${type}-time`);
  createFormElement('Categoria', 'text', `${type}-category`);

  // Criar div footer do modal
  const modalFooter = document.createElement('div');
  modalFooter.className = 'modal-footer';

  // Criar botão de fechar no footer
  const closeFooterButton = document.createElement('button');
  closeFooterButton.type = 'button';
  closeFooterButton.className = 'btn btn-outline-danger fechar-modal';
  closeFooterButton.setAttribute('data-bs-dismiss', 'modal');
  closeFooterButton.textContent = 'Fechar';

  // Criar botão de salvar no footer
  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.className = 'btn btn-outline-success';
  saveButton.id = `confirm-${type}`;
  saveButton.textContent = 'Salvar';

  // Adicionar botões ao footer
  modalFooter.appendChild(closeFooterButton);
  modalFooter.appendChild(saveButton);

  // Adicionar body e footer ao formulário
  form.appendChild(modalBody);
  form.appendChild(modalFooter);

  // Adicionar header e formulário ao content
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(form);

  // Adicionar content ao dialog
  modalDialog.appendChild(modalContent);

  // Adicionar dialog ao modal
  modal.appendChild(modalDialog);

  // Adicionar modal ao body do documento
  document.body.appendChild(modal);
}

/**
 * Função para setar o nome do restaurante no input
 */
function setRestaurantName() {
  restaurantName.value = restaurantInfos.nomeRestaurante;
}

/**
 * Função para setar a descrição do restaurante no input
 */
function setRestaurantDescription() {
  restaurantDescription.value = restaurantInfos.descricaoRestaurante;
}

/**
 * Função para setar a imagem do restaurante
 * @param {str} image Imagem do restaurante
 */
function setRestaurantImage(image = restaurantInfos.imagemRestaurante) {
  const img = document.createElement('img');
  img.className = "img-restaurant";
  img.src = image;
  restaurantPicture.appendChild(img);
}

/**
 * Função para renderizar os itens do cardápio
 */
function renderCardapioItems() {
  restaurantInfos.cardapio.forEach(item => {
    const tr = document.createElement('tr');
    tr.setAttribute('data-prato-id', item.idPrato);

    for (const key in item) {
      if (item.hasOwnProperty(key)) {
        const td = document.createElement('td');
        if (key === 'imagemPrato') {
          const img = document.createElement('img');
          img.src = item[key];
          img.className = 'img-cardapio item-photo';
          img.width = 100;
          img.height = 100;
          td.appendChild(img);
        } else {
          td.textContent = key === 'precoPrato' ? `R$ ${item[key].toFixed(2)}` : item[key];
          td.className = `item-${key}`;
        }
        tr.appendChild(td);
      }
    }

    const actionTd = document.createElement('td');
    const editButton = document.createElement('i');
    editButton.className = "icones-crud fa-solid fa-pen text-danger";
    editButton.style.marginRight = '5px';
    editButton.setAttribute('onclick', `editItem(${item.idPrato})`);
    actionTd.appendChild(editButton);

    const deleteButton = document.createElement('i');
    deleteButton.className = 'icones-crud fa-solid fa-trash text-danger';
    deleteButton.setAttribute('onclick', `deleteItem(${item.idPrato})`);
    actionTd.appendChild(deleteButton);

    tr.appendChild(actionTd);
    cardapioItems.appendChild(tr);
  });
}

// Funções de edição e exclusão
/**
 * Função para editar um item do cardápio
 * @param {int} itemId ID do prato do cardápio
 */
function editItem(itemId) {
  restaurantInfos = getRestaurantById(restaurantId);
  const itemObj = restaurantInfos.cardapio.find(item => item.idPrato === parseInt(itemId));

  editId.value = itemObj.idPrato;
  document.getElementById('edit-name').value = itemObj.nomePrato;
  document.getElementById('edit-image').value = '';
  document.getElementById('edit-description').value = itemObj.descricaoPrato;
  document.getElementById('edit-quantity').value = itemObj.quantidadeEstoque;
  document.getElementById('edit-price').value = itemObj.precoPrato.toFixed(2);
  document.getElementById('edit-time').value = itemObj.minutosPreparo;
  document.getElementById('edit-category').value = itemObj.categoriaPrato;

  modalEdit = new bootstrap.Modal(document.getElementById('modal-edit'));
  modalEdit.show();
}

/**
 * Função para excluir um item do cardápio
 * @param {int} itemId ID do prato do cardápio
 */
function deleteItem(itemId) {
  const itemObj = restaurantInfos.cardapio.find(item => item.idPrato === itemId);
  document.querySelector('.nome-prato-delete').textContent = itemObj.nomePrato;
  deleteId.value = itemId;

  modalDelete = new bootstrap.Modal(document.getElementById('modal-delete'));
  modalDelete.show();
}

/**
 * Função para renderizar um novo item no cardápio
 * @param {Object} newItem Novo item do cardápio 
 */
function renderNewItem(newItem) {
  const tr = document.createElement('tr');
  tr.setAttribute('data-prato-id', newItem.idPrato);

  for (const key in newItem) {
    if (newItem.hasOwnProperty(key)) {
      const td = document.createElement('td');
      if (key === 'imagemPrato') {
        const img = document.createElement('img');
        img.src = newItem[key];
        img.className = 'img-cardapio item-photo';
        img.width = 100;
        img.height = 100;
        td.appendChild(img);
      } else {
        td.textContent = key === 'precoPrato' ? `R$ ${newItem[key].toFixed(2)}` : newItem[key];
        td.className = `item-${key}`;
      }
      tr.appendChild(td);
    }
  }

  const actionTd = document.createElement('td');
  const editButton = document.createElement('i');
  editButton.className = "icones-crud fa-solid fa-pen text-danger";
  editButton.style.marginRight = '5px';
  editButton.setAttribute('onclick', `editItem(${newItem.idPrato})`);
  actionTd.appendChild(editButton);

  const deleteButton = document.createElement('i');
  deleteButton.className = 'icones-crud fa-solid fa-trash text-danger';
  deleteButton.setAttribute('onclick', `deleteItem(${newItem.idPrato})`);
  actionTd.appendChild(deleteButton);

  tr.appendChild(actionTd);
  cardapioItems.appendChild(tr);
}

// Eventos
photoUpload.addEventListener('change', function() {
  const file = this.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    document.querySelector('.img-restaurant').remove();
    setRestaurantImage(reader.result);
  };

  reader.readAsDataURL(file);
});

updateForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const newName = restaurantName.value;
  const newDescription = restaurantDescription.value;
  const newPhoto = restaurantPicture.querySelector('.img-restaurant').src;

  if (newName !== currentName) updateName(newName);
  if (newDescription !== currentDescription) updateDescription(newDescription);
  if (newPhoto !== currentPhoto) updatePhoto(newPhoto);
});

updateItemBtn.addEventListener('click', function() {
  const idPrato = parseInt(editId.value);
  const editNameInput = document.getElementById('edit-name').value;
  const editPhotoInput = document.getElementById('edit-image');
  const editDescriptionInput = document.getElementById('edit-description').value;
  const editQuantityInput = document.getElementById('edit-quantity').value;
  const editPriceInput = document.getElementById('edit-price').value;
  const editTimeInput = document.getElementById('edit-time').value;
  const editCategoryInput = document.getElementById('edit-category').value;
  const itemTableRow = document.querySelector(`tr[data-prato-id="${idPrato}"]`);

  let restaurantes = JSON.parse(localStorage.getItem('restaurantes'));

  // Encontra o restaurante correto pelo idRestaurante
  const restaurante = restaurantes.find(rest => rest.idRestaurante === restaurantId);
  if (restaurante) {
    // Encontra o item do cardápio correto pelo idPrato
    const item = restaurante.cardapio.find(prato => prato.idPrato === idPrato);
    if (item) {
      item.nomePrato = editNameInput;
      item.descricaoPrato = editDescriptionInput;
      item.quantidadeEstoque = parseInt(editQuantityInput);
      item.precoPrato = parseFloat(editPriceInput);
      item.minutosPreparo = parseInt(editTimeInput);
      item.categoriaPrato = editCategoryInput;

      if (editPhotoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function(e) {
          item.imagemPrato = e.target.result;
          localStorage.setItem('restaurantes', JSON.stringify(restaurantes));
          itemTableRow.querySelector('.item-photo').src = e.target.result;
        };
        reader.readAsDataURL(editPhotoInput.files[0]);
      } else {
        localStorage.setItem('restaurantes', JSON.stringify(restaurantes));
      }

      itemTableRow.querySelector('.item-nomePrato').textContent = editNameInput;
      itemTableRow.querySelector('.item-descricaoPrato').textContent = editDescriptionInput;
      itemTableRow.querySelector('.item-quantidadeEstoque').textContent = editQuantityInput;
      itemTableRow.querySelector('.item-precoPrato').textContent = `R$ ${parseFloat(editPriceInput).toFixed(2)}`;
      itemTableRow.querySelector('.item-minutosPreparo').textContent = editTimeInput;
      itemTableRow.querySelector('.item-categoriaPrato').textContent = editCategoryInput;
    }
  }

  modalEdit.hide();
});

deleteItemBtn.addEventListener('click', function() {
  const idPrato = parseInt(deleteId.value);
  restaurantJSON.forEach(restaurante => {
    restaurante.cardapio = restaurante.cardapio.filter(item => item.idPrato !== idPrato);
  });
  localStorage.setItem('restaurantes', JSON.stringify(restaurantJSON));
  document.querySelector(`tr[data-prato-id="${idPrato}"]`).remove();
  modalDelete.hide();
});

addBtn.addEventListener('click', function() {
  modalAdd = new bootstrap.Modal(document.getElementById('modal-add'));
  modalAdd.show();
});

document.getElementById('confirm-add').addEventListener('click', function() {
  const addNameInput = document.getElementById('add-name').value;
  const addPhotoInput = document.getElementById('add-image');
  const addDescriptionInput = document.getElementById('add-description').value;
  const addQuantityInput = document.getElementById('add-quantity').value;
  const addPriceInput = document.getElementById('add-price').value;
  const addTimeInput = document.getElementById('add-time').value;
  const addCategoryInput = document.getElementById('add-category').value;

  const reader = new FileReader();
  reader.onload = function(e) {
    const lastId = parseInt(restaurantInfos.cardapio[restaurantInfos.cardapio.length - 1].idPrato);
    const newItem = {
      idPrato: lastId + 1,
      nomePrato: addNameInput,
      imagemPrato: e.target.result,
      descricaoPrato: addDescriptionInput,
      quantidadeEstoque: parseInt(addQuantityInput),
      precoPrato: parseFloat(addPriceInput),
      minutosPreparo: parseInt(addTimeInput),
      categoriaPrato: addCategoryInput
    };

    let restaurantes = JSON.parse(localStorage.getItem('restaurantes')) || [];
    const restaurant = restaurantes.find(r => r.idRestaurante === restaurantId);
    restaurant.cardapio.push(newItem);
    localStorage.setItem('restaurantes', JSON.stringify(restaurantes));

    renderNewItem(newItem);

    modalAdd.hide();
    document.getElementById('form-add').reset();
  };

  if (addPhotoInput.files.length > 0) {
    reader.readAsDataURL(addPhotoInput.files[0]);
  } else {
    alert('O campo de imagem deve ser preenchido.');
  }
});

document.addEventListener("DOMContentLoaded", function() {
  setRestaurantName();
  setRestaurantDescription();
  setRestaurantImage();
  renderCardapioItems();
  renderSold();
});
