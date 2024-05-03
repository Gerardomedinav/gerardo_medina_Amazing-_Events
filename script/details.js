const apiUrl = "https://mindhub-xj03.onrender.com/api/amazing";
//const apiUrl = './script/amazing.json'  // en caso que el servidor remoto no funcione";

function hasProperty(event, property) {
  return event.hasOwnProperty(property) && event[property];
}

function generateDetailsHTML(eventData, currentDate) {
  const hasAssistance = hasProperty(eventData, "assistance");
  const hasEstimate = hasProperty(eventData, "estimate");
  const eventDate = new Date(eventData.date);
  const isEventPast = eventDate <= currentDate;
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
      <div>
        ${
          hasAssistance
            ? `<assistance>Assistance: ${eventData.assistance}</assistance>`
            : ""
        }
      </div>
      ${
        hasEstimate
          ? `<estimate>Estimate: ${eventData.estimate}</estimate>`
          : ""
      }
      <description>${eventData.description}</description>
      ${
        isEventPast
          ? `<button type="button" class="btn btn-primary d-flex" id="home">The event has already happened! Return Home?</button>`
          : `<button type="button" class="btn btn-primary" id="buy-tickets-button" onClick="alert('You have bought your ticket, enjoy the event!')">Buy Tickets</button>
            <button type="button" class="btn btn-primary d-flex" id="home2">Return Home?</button>`
      }
    </div>
  `;

  return detailsHTML;
}

async function fetchData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

async function displayEventDetails() {
  const data = await fetchData();
  if (!data) return;

  const eventData = JSON.parse(localStorage.getItem("selectedEvent"));
  const currentDate = new Date(data.currentDate);
  const container = document.querySelector("#detail-card-container");
  container.innerHTML = generateDetailsHTML(eventData, currentDate);

  const miBoton = document.getElementById("home");
  const miBoton2 = document.getElementById("home2");

  if (miBoton) {
    miBoton.addEventListener("click", function () {
      window.location.href = "./index.html";
    });
  }

  if (miBoton2) {
    miBoton2.addEventListener("click", function () {
      window.location.href = "./index.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", displayEventDetails);