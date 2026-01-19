import './style.css';
import { cardUI } from './js/updateUI';
const totalAmountEl = document.getElementById("total_amount");
const cartCounter = document.getElementById('cart-counter')

let basketProducts = localStorage.getItem("products") ? JSON.parse(localStorage.getItem('products')) : [];

if (basketProducts.length) {
  calculateBasket(basketProducts)
  cardUI(basketProducts)
}

function calculateBasket(products) {
  let totalPrice = 0;
  let totalAmount = 0;
  products.forEach((product) => {
    totalPrice += product.price * product.amount;
    totalAmount += product.amount;
  });
  totalAmountEl.textContent = totalAmount;
  cartCounter.textContent = totalAmount;
}
