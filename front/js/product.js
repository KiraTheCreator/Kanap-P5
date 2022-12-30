const idString = window.location.search;
const urlSearch = new URLSearchParams(idString);
const itemId = urlSearch.get("id");
let altTxt;
let colors;
let description;
let imageUrl;
let itemName;
let price;
let _id;
let image;
let divImage;
console.log(idString);
console.log(itemId);

fetch(`http://localhost:3000/api/products/${itemId}`)
  .then((response) => response.json())
  .then((res) => manageData(res));

// reccupereer touttes les données du canap
function manageData(item) {
  altTxt = item.altTxt;
  colors = item.colors;
  description = item.description;
  imageUrl = item.imageUrl;
  itemName = item.name;
  price = item.price;
  _id = item._id;
  insertImage(imageUrl, altTxt);
  insertTitle(itemName);
  insertPrice(price);
  insertDescription(description);
  insertColors(colors);
}

function insertImage() {
  image = document.createElement("img");
  image.src = imageUrl;
  image.altTxt = altTxt;
  divImage = document.getElementsByClassName("item__img");
  divImage[0].appendChild(image);
}

function insertTitle() {
  const h1 = document.getElementById("title");
  console.log(h1);
  h1.textContent = itemName;
}

function insertPrice() {
  const span = document.getElementById("price");
  span.textContent = price;
}

function insertDescription() {
  const p = document.getElementById("description");
  p.textContent = description;
}

// creer variable selectColors et l'associé au select
// reccuperer les couleurs, creer option, associé les couleurs
// les mettre dans le select en enfant
function insertColors() {
  const selectColors = document.getElementById("colors");
  colors.forEach((color) => {
    const option = document.createElement("option");
    option.value = color;
    option.textContent = color;
    selectColors.appendChild(option);
  });
}

// --------------------
// Button ajouter au panier selectionner
const button = document.getElementById("addToCart");
// ajout d'un evenement au clic, réccupere la couleur et la quantité selectionné
button.addEventListener("click", (e) => {
  const colorSelected = document.getElementById("colors").value;
  const quantitySelected = document.getElementById("quantity").value;
  // si couleur ou quantité non selectionné, msg alert
  if (
    colorSelected == null ||
    colorSelected == "" ||
    quantitySelected == null ||
    quantitySelected == 0
  ) {
    alert(
      "Veuillez séléctionner une couleur et une quantité pour cet article."
    );
  } else {
    const DifferentColorToCart = `${_id}-${colorSelected}`;
    // creation de la structure de l'objet pour le local storage
    const toAddToCart = {
      name: itemName,
      id: _id,
      color: colorSelected,
      quantity: quantitySelected * 1,
      price: price,
      image: imageUrl,
      alt: altTxt,
    };
    // utilise l'objet créer et l'ajoute au local storage avec tout ses parametres tout en le stringify
    localStorage.setItem(DifferentColorToCart, JSON.stringify(toAddToCart));
    // accede a la page panier
    window.location.href = "cart.html";
  }
});
