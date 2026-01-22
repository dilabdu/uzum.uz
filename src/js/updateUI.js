import { calculatePrice } from "../app.js";
const popularProductsTemplate = document.getElementById("popular-products");
const popularProductsList = document.getElementById("popular-products-list");

const productTitle = document.getElementById("product_title");
const carouselEl = document.querySelector(".carousel");

const aboutPrice = document.getElementById("about_price");
const shippingInfo = document.getElementById("shipping");
const return_policy = document.getElementById("return_policy");
const availability_status = document.getElementById("availability_status");
const create_at = document.getElementById("create_at");
const weigth = document.getElementById("weigth");
const descriptionEl = document.getElementById("product_description");
const warranty_information = document.getElementById("warranty_information");
const brend = document.getElementById("brand");
const imageEl = document.querySelector(".image");

const expensiveTemplate = document.getElementById("expensive-products");
const expensiveProductsList = document.getElementById(
  "expensive-products-list",
);

function cheapestProducts(products) {
  products
    .sort((a, b) => {
      return a.price - b.price;
    })
    .slice(0, 20)
    .forEach((product) => {
      const { thumbnail, price, title, rating, description, id } = product;

      const clone = popularProductsTemplate.content.cloneNode(true);
      const img = clone.querySelector("img");
      const cardTitle = clone.querySelector(".card-title");
      const priceCart = clone.querySelector("#price_cart");
      const priceEl = clone.querySelector(".price");
      const priceMonth = clone.querySelector(".price_month");
      const product_description = clone.querySelector(".product_description");
      const productRating = clone.querySelector(".product_rating");
      const buyButton = clone.querySelector(".buy-now");
      const a = clone.querySelector("a");
      const likedButton = clone.querySelector(".liked-button");

      let likedProducts = localStorage.getItem("liked-products")
        ? JSON.parse(localStorage.getItem("liked-products"))
        : [];

      let item = likedProducts.find((product) => product.id == id);
      if (item) {
        likedButton.classList.add("btn-primary");
        likedButton.classList.remove("btn-outline");
      }

      img.src = thumbnail;
      cardTitle.textContent = title;
      priceCart.textContent = calculatePrice(
        Math.floor(parseFloat(price) * 0.95 * 100) / 100,
      );
      priceEl.textContent = calculatePrice(price);
      priceMonth.textContent =
        calculatePrice(Math.floor((parseFloat(price) / 12) * 100) / 100) +
        "/mo";
      product_description.textContent = description;
      productRating.textContent = `${rating}`;
      document.querySelectorAll(".like-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("text-red-500");
        });
      });
      buyButton.dataset.id = id;
      a.href = `/about.html?id=${id}`;

      popularProductsList.appendChild(clone);
    });
}

function expensiveProducts(products) {
  products
    .sort((a, b) => {
      return b.price - a.price;
    })
    .slice(0, 20)
    .forEach((product) => {
      const { thumbnail, price, title, rating, description, id } = product;
      const clone = expensiveTemplate.content.cloneNode(true);

      const img = clone.querySelector("img");
      const cardTitle = clone.querySelector(".card-title");
      const priceCart = clone.querySelector("#price_cart");
      const priceEl = clone.querySelector(".price");
      const priceMonth = clone.querySelector(".price_month");
      const product_description = clone.querySelector(".product_description");
      const productRating = clone.querySelector(".product_rating");
      const buyButton = clone.querySelector(".btn");
      const a = clone.querySelector("a");

      const likedButton = clone.querySelector(".liked-button");
      let likedProducts = localStorage.getItem("liked-products")
        ? JSON.parse(localStorage.getItem("liked-products"))
        : [];

      let item = likedProducts.find((product) => product.id == id);
      if (item) {
        likedButton.classList.add("btn-primary");
        likedButton.classList.remove("btn-outline");
      }

      img.src = thumbnail;
      cardTitle.textContent = title;
      priceCart.textContent = calculatePrice(
        Math.floor(parseFloat(price) * 0.95 * 100) / 100,
      );
      priceEl.textContent = calculatePrice(price);
      priceMonth.textContent =
        calculatePrice(Math.floor((parseFloat(price) / 12) * 100) / 100) +
        "/mo";
      product_description.textContent = description;
      productRating.textContent = `${rating}`;
      document.querySelectorAll(".like-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
          btn.classList.toggle("text-red-500");
        });
      });

      buyButton.dataset.id = id;
      a.href = `/about.html?id=${id}`;

      expensiveProductsList.appendChild(clone);
    });
}

function aboutUI(product) {
  carouselEl.innerHTML = "";

  const {
    id,
    thumbnail,
    title,
    description,
    images,
    reviews,
    price,
    shippingInformation,
    returnPolicy,
    stock,
    weight,
    warrantyInformation,
    brand,
    meta,
  } = product;
  productTitle.textContent = title;
  brend.textContent = brand;
  descriptionEl.textContent = description;
  aboutPrice.textContent = `Price: ${calculatePrice(price)}`;
  shippingInfo.textContent = `Shipping:  ${shippingInformation}`;
  return_policy.textContent = `Return:  ${returnPolicy}`;
  availability_status.textContent = `Stock: ${stock}`;
  warranty_information.textContent = `Warranty: ${warrantyInformation}`;
  weigth.textContent = `Weight: ${weight}`;
  create_at.textContent = meta.createAt;

  if (images.length > 1) {
    images.forEach((img) => {
      carouselEl.innerHTML += `<div class="carousel-item w-full"> 
      <img src=${img} class="w-full"  alt="Tailwind css carousel"/>
      </div>`;
    });
  } else {
    imageEl.src = thumbnail;
  }
}

const ratingEl = document.getElementById("rating");
const reviewsTemplate = document.getElementById("rewiews-template");
const rewiewCard = document.getElementById("rewiew_card");
function reviewUI(reviews) {
  reviews.forEach((r) => {
    const clone = reviewsTemplate.content.cloneNode(true);
    const user = clone.getElementById("user");
    const email = clone.getElementById("user_email");
    const dateEl = clone.getElementById("date");
    const descriptionEl = clone.getElementById("comment_description");
    const { comment, date, rating, reviewerEmail, reviewerName } = r;
    const ratingItem = Math.round(rating) * 2;
    console.log(ratingItem);
    ratingEl.childern[ratingItem].setAttribute("checked", "checked");
    ratingEl.textContent = rating;
    user.textContent = reviewerName;
    email.textContent = reviewerEmail;
    dateEl.textContent = date;
    descriptionEl.textContent = comment;
    rewiewCard.appendChild(clone);
  });
}

const template = document.getElementById("card_template");
const list = document.querySelector(".card_list");
const card_item = document.querySelector(".card_item");

let likedProducts = localStorage.getItem("products")
  ? JSON.parse(localStorage.getItem("products"))
  : [];
function cardUI(products) {
  card_item.innerHTML = "";
  products.forEach((item) => {
    const clone = template.content.cloneNode(true);
    const cardImage = clone.querySelector(".card_image");
    const cardTitle = clone.querySelector(".card_title");
    const cardPrice = clone.querySelector(".card_price");
    const cardBrend = clone.querySelector(".card_brand");
    const cardAmount = clone.querySelector(".card_amount");
    const amountEl = clone.querySelector(".amount");
    const incrementAmount = clone.querySelector(".increment-amount");
    const decrementAmount = clone.querySelector(".decrement-amount");
    const btnDelete = clone.querySelector(".btn-delete");

    const product = basketproducts.find((p) => p.id == item.id);
    incrementAmount.addEventListener("click", () => {
      product.amount += 1;
      localStorage.setItem("products", JSON.stringify(basketProduct));
      amountEl.textContent = product.amount;
    });
    decrementAmount.addEventListener("click", () => {
      product.amount -= 1;
      localStorage.setItem("products", JSON.stringify(basketProduct));
      amountEl.textContent = product.amount;
    });

    btnDelete.addEventListener("click", () => {
      basketProducts = basketProducts.filter((p) => p.id == item.id);
      localStorage.setItem("products", JSON.stringify(basketProducts));
      cardUI(basketProducts);
    });
    const { id, thumbnail, title, price, brand, amount } = item;
    cardImage.src = thumbnail;
    cardTitle.textContent = title;
    cardPrice.textContent = calculatePrice(price);
    cardBrend.textContent = brand;
    cardAmount.textContent = amount;
    console.log(card_item);
    card_item.appendChild(clone);
  });
}

const producTemplate = document.getElementById("liked_template");
const productList = document.querySelector("#product_list");
const productCard = document.querySelector("#liked_card");

function productUI(products) {
  products.forEach((item) => {
    const clone = producTemplate.content.cloneNode(true);
    const productImage = clone.getElementById("liked_image");
    const productTitle = clone.getElementById("liked_title");

    const productPrice = clone.getElementById("liked_price");
    const likedCard = clone.getElementById("liked_cart");
    const descriptionEl = clone.querySelector(".product_description");
    const likedRating = clone.querySelector(".liked_rating");
    const priceMonth = clone.querySelector(".price_month");

    const { thumbnail, title, price, brand, description, rating } = item;
    console.log(item);

    productImage.src = thumbnail;
    productTitle.textContent = title;

    productPrice.textContent = calculatePrice(price);
    likedCard.textContent = calculatePrice(
      Math.floor(parseFloat(price) * 0.95 * 100) / 100,
    );
    priceMonth.textContent =
      calculatePrice(Math.floor((parseFloat(price) / 12) * 100) / 100) + "/mo";
    descriptionEl.textContent = description;
    likedRating.textContent = rating;

    productCard.appendChild(clone);
  });
}

export {
  cheapestProducts,
  expensiveProducts,
  aboutUI,
  cardUI,
  productUI,
  reviewUI,
};
