import { data } from './data.js';

/* Details Logic */

// Generar la tarjeta con la información del evento seleccionado
function generateDetailsHTML(eventData) {
  const detailsHTML = `
    <div class="big-card-body" id="detail-card-body">
      <h2>${eventData.name}</h2>
      <img src="${eventData.image}" alt="${eventData.title}">
      <date>Date: ${eventData.date}</date>
      <price>Price: $${eventData.price}</price>
      <category>Category: ${eventData.category}</category>
      <place>Place: ${eventData.place}</place>
      <capacity>Capacity: ${eventData.capacity}</capacity>
      <description>Description: ${eventData.description}</description>
      <button type="button" class="btn btn-primary" id="buy-tickets-button">Buy Tickets</button>
    </div>
  `;

  return detailsHTML;
}

document.addEventListener("DOMContentLoaded", () => {
  // Obtener los datos del evento seleccionado del localStorage
  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));

  // Generar la tarjeta con los datos del evento seleccionado
  const container = document.querySelector("#detail-card-container");
  container.innerHTML = generateDetailsHTML(eventData);
});