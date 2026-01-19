import "./style.css";
import { productUI } from "./js/updateUI";

const totalAmountEl = document.getElementById("total_amount");

let likedProducts = localStorage.getItem("liked-products")
  ? JSON.parse(localStorage.getItem("liked-products"))
  : [];

let basketProducts = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];

if (likedProducts.length) {
  calculateBasket(basketProducts);
  productUI(basketProducts);
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
