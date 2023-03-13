import { data } from './data.js';

/* Details Logic */


// Generar la tarjeta con la información del evento seleccionado
function generateDetailsHTML(eventData) {
  //preguntar si evento es pasado
  if (new Date(eventData.date) > new Date(data.currentDate)){
  const detailsHTML = `
    <div class="big-card-body" id="detail-card-body">
      <h2 id="nombre">${eventData.name}</h2>
      <img src="${eventData.image}" alt="${eventData.title}" id="foto">
      <img src="./asset/img/fire3.png" alt="fire3" id="fire3">
      <date>Date: ${eventData.date}</date>
      <price>Price: $${eventData.price}</price>
      <category>Category: ${eventData.category}</category>
      <place>Place: ${eventData.place}</place>
      <capacity>Capacity: ${eventData.capacity}</capacity>
      <estimate>Estimate: ${eventData.estimate}</estimate>
      <description>Description: ${eventData.description}</description>
      <button type="button" class="btn btn-primary" id="buy-tickets-button">Buy Tickets</button>
      <button type="button" class="btn btn-primary d-flex" id="home">Return Home?</button>
    </div>
      `;
      return detailsHTML;
  } else {
    const detailsHTML = `
    <div class="big-card-body" id="detail-card-body">
      <h2 id="nombre">${eventData.name}</h2>
      <img src="${eventData.image}" alt="${eventData.title}" id="foto">
      <img src="./asset/img/fire3.png" alt="fire3" id="fire3">
      <date>Date: ${eventData.date}</date>
      <price>Price: $${eventData.price}</price>
      <category>Category: ${eventData.category}</category>
      <place>Place: ${eventData.place}</place>
      <capacity>Capacity: ${eventData.capacity}</capacity>
      <assistance>Assistance: ${eventData.assistance}</assistance>
      <description>Description: ${eventData.description}</description>
      
      <button type="button" class="btn btn-primary d-flex" id="home">Return Home?</button>
    </div>
      `;
      return detailsHTML;

  }

  
}

document.addEventListener("DOMContentLoaded", () => {
  // Obtener los datos del evento seleccionado del localStorage
  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));

  // Generar la tarjeta con los datos del evento seleccionado
  const container = document.querySelector("#detail-card-container");
  container.innerHTML = generateDetailsHTML(eventData);
});


document.addEventListener("DOMContentLoaded", () => {
  // Agrega un manejador de eventos para el botón "buy-tickets-button"
  document.getElementById("buy-tickets-button").addEventListener("click", () => {
    alert("You have bought your ticket, Enjoy the event!");
  });
});

//funcion volver al inicio boton card details
document.addEventListener("DOMContentLoaded", () => {
const miBoton = document.getElementById("home");

miBoton.addEventListener("click", function() {
  window.location.href = "./index.html";
});
});