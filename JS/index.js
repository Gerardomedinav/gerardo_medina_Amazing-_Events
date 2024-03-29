import { data } from "./data.js";

/*              Logica para creacion de cards                */

const container = document.querySelector("#cards-container");

const cardsHTML = data.events.map((item) => `
  <div class="card" id="card-body">
    <img src="${item.image}" alt="${item.title}">
    <h2>${item.name}</h2>
    <date>Date: ${item.date}</date>
    <price>Price: $${item.price}</price>
    <category>Category: ${item.category}</category>
    <place>Place: ${item.place}</place>
    <description>${item.description}</description>
    <button>More Info</button>
  </div>
`).join("");

container.innerHTML = cardsHTML;