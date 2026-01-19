import "./style.css";
import { request } from "./js/request.js";
import { aboutUI } from "./js/updateUI.js";
import { reviewUI } from "./js/updateUI.js";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const productId = urlParams.get("id");

request("https://dummyjson.com/products/" + productId)
  .then((data) => {
    aboutUI(data);
  })
  .catch((error) => console.log(error));
