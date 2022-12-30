// nombre de produit (par id) dans le localStorage
let numberOfItems = localStorage.length;
// produit format JSON
let itemJSON;
// produit format objet js
let item;
// tableau contenant les objets JS issus du localstorage a ajouter dans le panier
let cart = [];

convertLocalStorageObjects();
// pour chaque élément du panier on appelle la fonction insertItemJs
cart.forEach((item) => insertItem(item));
function convertLocalStorageObjects() {
  // creer une loupe a travers le localstorage pour chaque objet présent dedans
  for (let i = 0; i < numberOfItems; i++) {
    // reccupere l'objet json selon sa position dans le local storage
    itemJSON = localStorage.getItem(localStorage.key(i));
    // convertit l'objet json en objet javascript
    item = JSON.parse(itemJSON);
    // ajoute cet objet javascript dans le tableau cart
    cart.push(item);
  }
}

function insertItem(item) {
  const articleToRecovery = recoveryArticle(item);
  const divImage = insertImage(item);
  articleToRecovery.appendChild(divImage);
  const cartItemContent = insertCartItemContent(item);
  articleToRecovery.appendChild(cartItemContent);
  insertArticle(articleToRecovery);
  insertTotalPrice();
  insertTotalQuantity();
}
function insertTotalQuantity() {
  let total = 0;
  const totalQuantity = document.getElementById("totalQuantity");
  cart.forEach((item) => {
    totalPerItem = item.quantity;
    total = total + totalPerItem;
  });
  totalQuantity.textContent = total;
}
function insertTotalPrice() {
  let total = 0;
  const totalPrice = document.getElementById("totalPrice");
  cart.forEach((item) => {
    totalPerItem = item.quantity * item.price;
    total = total + totalPerItem;
  });
  totalPrice.textContent = total;
}
function changeTotal(id, newValue, item) {
  const itemToChange = cart.find((item) => item.id === id);
  itemToChange.quantity = Number(newValue);
  item.quantity = itemToChange.quantity;
  insertTotalPrice();
  insertTotalQuantity();
  NewTotalInLocalStorage(item);
}
function NewTotalInLocalStorage(item) {
  const newData = JSON.stringify(item);
  const newKey = `${item.id}-${item.color}`;
  localStorage.setItem(newKey, newData);
}
function insertCartItemContent(item) {
  const cartItemContent = document.createElement("div");
  cartItemContent.classList.add("cart__item__content");
  const description = insertCartItemContentDescription(item);
  const settings = insertCartItemContentSettings(item);
  cartItemContent.appendChild(description);
  cartItemContent.appendChild(settings);
  return cartItemContent;
}
function insertCartItemContentDescription(item) {
  // const divContent = document.createElement("div");
  // divContent.classList.add("cart__item__content");
  const divDescription = document.createElement("div");
  divDescription.classList.add("cart__item__content__description");
  const h2 = document.createElement("h2");
  h2.textContent = item.name;

  const p = document.createElement("p");
  p.textContent = item.color;

  const p2 = document.createElement("p");
  p2.textContent = item.price + " €";

  divDescription.appendChild(h2);
  divDescription.appendChild(p);
  divDescription.appendChild(p2);
  return divDescription;
  // divContent.appendChild(divDescription);
  // return divContent;
}
function insertCartItemContentSettings(item) {
  const settings = document.createElement("div");
  settings.classList.add("cart__item__content__settings");
  insertSettingsQuantity(settings, item);
  insertSettingsDelete(settings, item);
  return settings;
}
function insertSettingsQuantity(settings, item) {
  const quantity = document.createElement("div");
  quantity.classList.add("cart__item__content__settings__quantity");
  const p = document.createElement("p");
  p.textContent = "Qté : ";
  quantity.appendChild(p);
  const input = document.createElement("input");
  input.classList.add("itemQuantity");
  input.type = "number";
  input.name = "itemQuantity";
  input.min = "1";
  input.value = item.quantity;
  input.addEventListener("input", () =>
    changeTotal(item.id, input.value, item)
  );
  quantity.appendChild(input);
  settings.appendChild(quantity);
}
function insertSettingsDelete(settings, item) {
  const div = document.createElement("div");
  div.classList.add("cart__item__content__settings__delete");
  div.addEventListener("click", () => deleteItem(item));
  const p = document.createElement("p");
  p.textContent = "Supprimer";
  div.appendChild(p);
  settings.appendChild(div);
}
function deleteItem(item) {
  const itemToDelete = cart.findIndex(
    (kanap) => kanap.color === item.color && kanap.id === item.id
  );
  cart.splice(itemToDelete, 1);
  insertTotalPrice();
  insertTotalQuantity();
  deleteItemFromLocalStorage(item);
  deleteArticle(item);
}
function deleteItemFromLocalStorage(item) {
  const key = `${item.id}-${item.color}`;
  localStorage.removeItem(key);
}
function deleteArticle(item) {
  const articleToDelete = document.querySelector(
    `article[data-id="${item.id}"][data-color="${item.color}"]`
  );
  articleToDelete.remove();
}

function insertArticle(article) {
  const articleToInsert = document.querySelector("#cart__items");
  articleToInsert.appendChild(article);
}
function recoveryArticle(item) {
  const article = document.createElement("article");
  article.classList.add("card_item");
  article.dataset.id = item.id;
  article.dataset.color = item.color;
  return article;
}

function insertImage(item) {
  const divImage = document.createElement("div");
  divImage.classList.add("cart__item__img");
  const image = document.createElement("img");
  image.src = item.image;
  image.alt = item.alt;
  divImage.appendChild(image);
  return divImage;
}
