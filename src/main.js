import "./style.css";
import "./js/geolocation";
import Splide from "@splidejs/splide";
import "@splidejs/splide/css";
import { request } from "./js/request";
import { cheapestProducts } from "./js/updateUI";
import { expensiveProducts } from "./js/updateUI";


const date = document.querySelector("#date");
date.textContent = new Date().getFullYear();

const totalAmountEl = document.getElementById("total_amount");
console.log(totalAmountEl)
let allProducts;
let basketProducts = localStorage.getItem("products") ? JSON.parse(localStorage.getItem('products')) : [];

if (basketProducts.length) {
  calculateBasket(basketProducts)
}


function calculateBasket(products) {
  let totalPrice = 0;
  let totalAmount = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.amount;
    totalAmount += product.amount;
  });
  totalAmountEl.textContent = totalAmount;
}

document.addEventListener("DOMContentLoaded", function () {
  new Splide("#image-carousel", {
    type: "loop",
  }).mount();

  request("https://dummyjson.com/products?limit=194").then(({ products }) => {
    cheapestProducts(products);
    expensiveProducts(products);
    allProducts = products;
  });
});

window.buy = buyProduct;
function buyProduct(event, el) {
  event.preventDefault();
  let productId = el.dataset.id;
  let item = allProducts.find((product) => product.id == productId);
  let search = basketProducts.find((p) => p.id == item.id);
  if (search) {
    search.amount++;
  } else {
    basketProducts.push({ ...item, amount: 1 });
  }
  calculateBasket(basketProducts);
  localStorage.setItem('products', JSON.stringify(basketProducts))
}
