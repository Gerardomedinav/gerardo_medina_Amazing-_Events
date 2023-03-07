import { data } from "./data.js";

// Obtener la fecha actual en formato de fecha de JavaScript
const currentDate = new Date(data.currentDate);

// Generar las tarjetas dinámicamente
const container = document.querySelector("#cards-container");

let cardsHTML = "";

for (let i = 0; i < data.events.length; i++) {
  const item = data.events[i];
  // Convertir la fecha del evento en formato de fecha de JavaScript
  const eventDate = new Date(item.date);
  // Solo agregar la tarjeta si la fecha del evento es anterior a la fecha actual
  if (eventDate > currentDate) {
    cardsHTML +=  `
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
  </div> `
  }
}

container.innerHTML = cardsHTML;