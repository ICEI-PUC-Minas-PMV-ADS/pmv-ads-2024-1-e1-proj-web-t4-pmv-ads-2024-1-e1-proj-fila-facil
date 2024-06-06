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

// Variáveis globais
let modalEdit, modalAdd, modalDelete;

const restaurantJSON = JSON.parse(localStorage.getItem('restaurantes'));
const restaurantId = parseInt(getParameter('id'));
const restaurantInfos = getRestaurantById(restaurantId);
const restaurantIndex = getIndexOfRestaurant(restaurantId);

let currentName = restaurantInfos.nomeRestaurante;
let currentDescription = restaurantInfos.descricaoRestaurante;
let currentPhoto = restaurantInfos.imagemRestaurante;

// Funções auxiliares
function getRestaurantById(id) {
  return restaurantJSON.find(restaurant => restaurant.idRestaurante === id);
}

function getIndexOfRestaurant(id) {
  return restaurantJSON.findIndex(restaurant => restaurant.idRestaurante === id);
}

function updateLocalStorageInfo(key, value) {
  restaurantJSON[restaurantIndex][key] = value;
  localStorage.setItem('restaurantes', JSON.stringify(restaurantJSON));
}

function getParameter(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

// Funções de atualização
function updateName(name) {
  currentName = name;
  updateLocalStorageInfo("nomeRestaurante", name);
}

function updateDescription(description) {
  currentDescription = description;
  updateLocalStorageInfo("descricaoRestaurante", description);
}

function updatePhoto(photo) {
  currentPhoto = photo;
  updateLocalStorageInfo("imagemRestaurante", photo);
}

// Funções de renderização
function setRestaurantName() {
  restaurantName.value = restaurantInfos.nomeRestaurante;
}

function setRestaurantDescription() {
  restaurantDescription.value = restaurantInfos.descricaoRestaurante;
}

function setRestaurantImage(image = restaurantInfos.imagemRestaurante) {
  const img = document.createElement('img');
  img.className = "img-restaurant";
  img.src = image;
  restaurantPicture.appendChild(img);
}

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
function editItem(itemId) {
  const itemObj = restaurantInfos.cardapio.find(item => item.idPrato === itemId);

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

function deleteItem(itemId) {
  const itemObj = restaurantInfos.cardapio.find(item => item.idPrato === itemId);
  document.querySelector('.nome-prato-delete').textContent = itemObj.nomePrato;
  deleteId.value = itemId;

  modalDelete = new bootstrap.Modal(document.getElementById('modal-delete'));
  modalDelete.show();
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

  restaurantes.forEach(restaurante => {
    restaurante.cardapio.forEach(item => {
      if (item.idPrato === idPrato) {
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
    });
  });

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

document.addEventListener("DOMContentLoaded", function() {
  setRestaurantName();
  setRestaurantDescription();
  setRestaurantImage();
  renderCardapioItems();
});
