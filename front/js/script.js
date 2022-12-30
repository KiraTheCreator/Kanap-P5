// Communication get avec le serveur, passe les données à la fonction addItems
fetch("http://localhost:3000/api/products")
  .then((res) => res.json())
  .then((data) => {
    return addItems(data);
  });

// Ligne 2 a 6 reecrire sans utiliser le then

// 1 - Reccupère les données du premier item, pour créer la const itemId
// 2 - Appelle la fonction makeItem avec itemId pour crée l'item sous forme de lien

// 3 - Appelle la fonction appendChildren pour réccuperer l'item crée et l'ajoute en tant qu'enfant de itemsList (élément html id #items)
// ID du canapé
let itemId;
// Url de l'image du canapé
let imageUrl;
// Texte alt de l'image
let altTxt;
// Nom du canapé
let name;
// Description du canapé
let itemDescription;
// Create element img
let itemImage;
// Create element a
let item;
// Create element p
let p;
// Create element article
let article;
// Create element h3
let h3;
// Ensemble des canapés
let itemList;

// Ajoute tout les items dans le dom dans l'ordre dans le array
function addItems(data) {
  data.forEach((item) => {
    itemId = item._id;
    imageUrl = item.imageUrl;
    altTxt = item.altTxt;
    itemName = item.name;
    itemDescription = item.description;
    itemImage = makeImage(imageUrl, altTxt);
    item = makeItem(itemId);
    p = makeDescription(itemDescription);
    article = makeArticle();
    h3 = makeTitle(itemName);
    article.appendChild(itemImage);
    article.appendChild(h3);
    article.appendChild(p);
    appendChildren(item, article);
  });
}

// Remplacer make par insert

// Fabrique l'item à partir de l'id de l'item réccupéré précédemment
function makeItem() {
  item = document.createElement("a");
  item.href = "./product.html?id=" + itemId;
  return item;
}

// Ajoute l'item en tant qu'enfant de l'élément html #items
function appendChildren() {
  itemsList = document.getElementById("items");
  itemsList.appendChild(item);
  item.appendChild(article);
}

function makeImage() {
  itemImage = document.createElement("img");
  itemImage.src = imageUrl;
  itemImage.alt = altTxt;
  return itemImage;
}

function makeArticle() {
  article = document.createElement("article");
  return article;
}

function makeTitle() {
  h3 = document.createElement("h3");
  h3.textContent = itemName;
  h3.classList.add("productName");
  return h3;
}
function makeDescription() {
  p = document.createElement("p");
  p.textContent = itemDescription;
  p.classList.add("productDescription");
  return p;
}
