// FUNCTIONS START ******************************************************
// SAVE ARTICLES BASKET
function saveBasket(basket) {
  localStorage.setItem("basket", JSON.stringify(basket));
}

// EXIT ARTICLES BASKET
function getBasket() {
  let basket = localStorage.getItem("basket");
  if (basket == null){
    return [];
  } else {
    return JSON.parse(basket);
  }
}

// REMOVE ARTICLES
function removeFromBasket(product) {
  let basket = getBasket();
  basket = basket.filter(p => p.id+p.color != product.id+product.color);
  saveBasket(basket);
}

// CHANGE QUANTITY
function changeQuantity(product,quantity) {

  let basket = getBasket();
  let foundProduct = basket.find(p => p.id+p.color == product.id+product.color);

  if (foundProduct != undefined) {
    foundProduct.quantity = quantity;
    if (foundProduct.quantity <= 0) {
      removeFromBasket(product);
    } else {
      saveBasket(basket);
    }
  }
}

// TOTAL QUANTITY BASKET
function totalQuantityBasket() {
  let basket = getBasket();
  let result = 0;
  for (const item of basket) {
    result += item.quantity
  }
  return result
}

// TOTAL PRICE ITEMS
function totalPriceItems(numberInputValue, price) {
  return numberInputValue * price;
};

// TOTAL PRICE BASKET
let priceBasket = 0;
function totalPriceBasket(quantity, price) {
  priceBasket += quantity * price;
  return priceBasket
}

// FUNCTIONS END ********************************************************
// CREATE ARTICLES
let basket = getBasket();

for (const product of basket) {
  fetch("http://localhost:3000/api/products/" + product.id)
  .then(response => response.json())
  .then(data => {
    let sectionCartItems = document.querySelector("#cart__items");
    let articleCartItem = document.createElement("article");
    articleCartItem.className = "cart__item";
    articleCartItem.setAttribute("data-id", product.id);
    articleCartItem.setAttribute("data-color", product.color);
    sectionCartItems.append(articleCartItem);

    let divCartItemImg = document.createElement("div");
    divCartItemImg.className = "cart__item__img";
    articleCartItem.append(divCartItemImg);

    let img = document.createElement("img");
    img.src = data.imageUrl;
    img.alt = data.altTxt;
    divCartItemImg.append(img);

    let divCartItenContent = document.createElement("div");
    divCartItenContent.className = "cart__item__content";
    articleCartItem.append(divCartItenContent);

    let divCartItenContentDescription = document.createElement("div");
    divCartItenContentDescription.className = "cart__item__content__description";
    divCartItenContent.append(divCartItenContentDescription);

    let h2 = document.createElement("h2");
    h2.textContent = data.name;
    divCartItenContentDescription.append(h2);

    let pColor = document.createElement("p");
    pColor.textContent = product.color;
    divCartItenContentDescription.append(pColor);

    let pPrice = document.createElement("p");
    // pPrice.textContent  = ("Prix unitaire : " + data.price + " €");
    let priceTotal = product.quantity * data.price;
    pPrice.textContent  = ("Prix total : " + priceTotal + " €");
    divCartItenContentDescription.append(pPrice);

    let divCartItemContentSettings = document.createElement("div");
    divCartItemContentSettings.className = "cart__item__content__settings";
    divCartItenContent.append(divCartItemContentSettings);

    let divCartItemContentSettingsQuantity = document.createElement("div");
    divCartItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
    divCartItemContentSettings.append(divCartItemContentSettingsQuantity);

    let pQuantity = document.createElement("p");
    pQuantity.textContent = "Qté : "
    divCartItemContentSettingsQuantity.append(pQuantity);

    let input = document.createElement("input");
    input.type = "number";
    input.className = "itemQuantity";
    input.name = "itemQuantity";
    input.min = 1;
    input.max = 100;
    input.setAttribute("value", product.quantity);
    divCartItemContentSettingsQuantity.append(input);

    let divCartItemContentSettingsDelete = document.createElement("div");
    divCartItemContentSettingsDelete.className = "cart__item__content__settings__delete";
    divCartItemContentSettings.append(divCartItemContentSettingsDelete);

    let pDeleteItem = document.createElement("p");
    pDeleteItem.className = "deleteItem";
    pDeleteItem.textContent = "Supprimer";
    divCartItemContentSettingsDelete.append(pDeleteItem);

    pDeleteItem.addEventListener("click", () => {
      removeFromBasket(product);
      articleCartItem.remove();
      totalQuantity.textContent = totalQuantityBasket();
      totalPrice.textContent    = totalPriceBasket(data.price);
    })
    
    input.addEventListener("change", () => {
      let numberInputValue = Number(input.value);
      pPrice.textContent  = ("Prix total : " + totalPriceItems(numberInputValue, data.price) + " €");

      if (numberInputValue <= 0) {
        if(confirm("Quantité " +  numberInputValue + " non accepter!\nVoulez vous supprimez cet article.")){
          removeFromBasket(product);
          articleCartItem.remove();
        }
      } else {
        changeQuantity(product, numberInputValue);
        totalQuantity.textContent = totalQuantityBasket();
        // totalPrice.textContent    = totalPriceBasket(data.price, product.quantity)

      }
    })
    console.log(data.price);
    console.log(product.quantity);
    totalQuantity.textContent = totalQuantityBasket();
    totalPrice.textContent    = totalPriceBasket(data.price, product.quantity)
  })
}

// FORMULAIRE **************************************************



let lastName = document.querySelector("#lastName");
lastName.style.backgroundColor = "#31d0be";

let address = document.querySelector("#address");
address.style.backgroundColor = "#44c3a1";

let city = document.querySelector("#city");
city.style.backgroundColor = "#56d725";

let email = document.querySelector("#email");
email.style.backgroundColor = "#4dcc15";

let order = document.querySelector("#order");
order.addEventListener("submit", (e) => {

  let firstName = document.querySelector("#firstName");
  firstName.style.backgroundColor = "#06ef82";
  if (firstName.value.trim() == ""){
    let myError = document.querySelector("#firstNameErrorMsg");
    myError.textContent = "yes";
    e.preventDefault()
  }

  // localStorage.clear(basket);
  // window.location = "confirmation.html";
})