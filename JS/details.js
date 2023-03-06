import { data } from "./data.js";

/*              Logica para creacion de cards                */

const container = document.querySelector("#cards-container");

const cardsHTML = data.events.map((item) => `
  <div class="card" id="card-body">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <div class="front">
        <img src="${item.image}" alt="${item.title}">
        <h2>${item.name}</h2>
    </div>
    <div class="back">
        <date>Date: ${item.date}</date>
        <price>Price: $${item.price}</price>
        <category>Category: ${item.category}</category>
        <place>Place: ${item.place}</place>
        <description>${item.description}</description>
        <button>More Info</button>
    </div>
  </div>
`).join("");

container.innerHTML = cardsHTML;