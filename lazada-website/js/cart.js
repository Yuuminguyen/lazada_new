let carts = document.querySelectorAll(".cart-btn");
let products = [
  {
    name: "Grey Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "greyshirt.jpeg",
  },
  {
    name: "Black Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "blackshirt.jpeg",
  },
  {
    name: "Mint Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "mintshirt.jpeg",
  },
  {
    name: "Pink Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "pinkshirt.jpeg",
  },
  {
    name: "Polo Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "poloshirt.jpeg",
  },
  {
    name: "White Shirt",
    price: 12,
    size: "M",
    inCart: 0,
    tag: "whiteshirt.jpeg",
  },
];

for (let i = 0; i < carts.length; i++) {
  carts[i].addEventListener("click", () => {
    cartNumbers(products[i]);
    totalCost(products[i]);
  });
}

function onLoadCartNumbers() {
  let productNumbers = localStorage.getItem("cartNumbers");

  if (productNumbers) {
    document.querySelector(".icons span").textContent = productNumbers;
  }
}

function cartNumbers(product) {
  let productNumbers = localStorage.getItem("cartNumbers");

  productNumbers = parseInt(productNumbers);

  if (productNumbers) {
    localStorage.setItem("cartNumbers", productNumbers + 1);
    document.querySelector(".icons span").textContent = productNumbers + 1;
  } else {
    localStorage.setItem("cartNumbers", 1);
    document.querySelector(".icons span").textContent = 1;
  }

  setItems(product);
}

function setItems(product) {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);

  if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
      cartItems = {
        ...cartItems,
        [product.tag]: product,
      };
    }
    cartItems[product.tag].inCart += 1;
  } else {
    product.inCart = 1;
    cartItems = {
      [product.tag]: product,
    };
  }

  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product) {
  let cartCost = localStorage.getItem("totalCost");
  console.log("My cartCost is", cartCost);
  console.log(typeof cartCost);

  if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  } else {
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart() {
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".products");
  let cartCost = localStorage.getItem("totalCost");

  if (cartItems && productContainer) {
    productContainer.innerHTML = "";
    Object.values(cartItems).map((item) => {
      productContainer.innerHTML += `
    <div class="total-cart"> 
        <div class="product">
      <img class="close" src="./images/cancel.png" object=${item.tag}></img>
      <img src="./images/${item.tag}"></img>
      <span>${item.name}</span>
   </div>
   <div class="price"><span>$</span>${item.price},00</div>
   <div class="quantity">
      <img class="minus" src="./images/minus.png"></img>
      <span>${item.inCart}</span>
      <img class="add" src="./images/add.png"></img>
    </div>
    <div class="total"><span>$</span>${item.inCart * item.price},00</div>
    </div>
`;
    });

    productContainer.innerHTML += `
      <div class="basketTotalContainer">
        <h4 class="basketTotalTitle">Basket Total</h4>
        <h4 class="basketTotal">$${cartCost},00</h4>
        `;
  }

  // Event listener on delete productsInCart

  // const closeButtons = document.querySelectorAll(".close");

  // Array.prototype.map.call(closeButtons, (item) => {
  //   const tag = item.getAttribute("object");
  //   item.addEventListener("click", () => {
  //     const objectToSave = {};
  //     const productsInCart = JSON.parse(localStorage.getItem("productsInCart"));
  //     Object.values(productsInCart).forEach((item) => {
  //       if (item.tag !== tag) {
  //         objectToSave[item.tag] = item;
  //       }
  //     });

  //     localStorage.setItem("productsInCart", JSON.stringify(objectToSave));

  //     displayCart();
  //   });
  // });
}





onLoadCartNumbers();
displayCart();
