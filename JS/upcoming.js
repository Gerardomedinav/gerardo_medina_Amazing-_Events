import { data } from "./data.js";

const currentDate = new Date(data.currentDate);

const container = document.querySelector("#cards-container");

function generateCardsHTML(events) {
  console.log("Generating cards upcoming ");
  const upcomingEvents = events.filter((event) => new Date(event.date) > currentDate);

  const cardsHTML = upcomingEvents.map((event) => `
  <div class="card" id="card-body">
  <span></span>
  <span></span>
  <span></span>
  <span></span>
  <div class="front">
      <img src="${event.image}" alt="${event.title}">
      <h2>${event.name}</h2>
  </div>
  <div class="back">
      <date>Date: ${event.date}</date>
      <price>Price: $${event.price}</price>
      <category>Category: ${event.category}</category>
      <place>Place: ${event.place}</place>
      <description>${event.description}</description>
      <button class="book-now-btn" data-name="${event.name}" data-image="${event.image}" data-capacity="${event.capacity}" data-date="${event.date}" data-price="${event.price}" data-category="${event.category}" data-place="${event.place}" data-description="${event.description}">More Info</button>
  </div>
</div> `).join("");

  return cardsHTML;
}


container.innerHTML = generateCardsHTML(data.events);


// Obtener los eventos únicos por categoría
const categories = [...new Set(data.events.map(event => event.category))];

// Generar los checkbox en el HTML
const checkboxContainer = document.getElementById('checkbox');
categories.forEach(category => {
  const div = document.createElement('div');
  div.classList.add('form-check', 'form-check-inline');

  const input = document.createElement('input');
  input.classList.add('form-check-input');
  input.type = 'checkbox';
  input.id = category;
  input.value = category;

  const label = document.createElement('label');
  label.classList.add('form-check-label');
  label.setAttribute('for', category);
  label.textContent = category;

  div.appendChild(input);
  div.appendChild(label);
  checkboxContainer.appendChild(div);

  // Agregar listener al checkbox
  input.addEventListener('change', function (event) {
    // Obtener las categorías seleccionadas
    const selectedCategories = [...checkboxContainer.querySelectorAll('input:checked')].map(input => input.value);

    // Si no hay ningún checkbox seleccionado, mostrar todas las tarjetas
    if (selectedCategories.length === 0) {
      container.innerHTML = generateCardsHTML(data.events);
    } else {
      // Agregar opción "todas"
      if (selectedCategories.includes('all')) {
        container.innerHTML = generateCardsHTML(data.events);
      } else {
        // Filtrar los eventos que corresponden a las categorías seleccionadas
        const filteredEvents = data.events.filter(event => selectedCategories.includes(event.category));
        // Generar las tarjetas con los eventos filtrados
        const filteredCardsHTML = generateCardsHTML(filteredEvents);
        // Actualizar el HTML del contenedor de tarjetas
        container.innerHTML = filteredCardsHTML;
      }
    }
  });
});


/* Search Logic */

// Función que maneja la búsqueda
function handleSearch(searchTerm) {
  if (searchTerm === '') {
    // mostrar todas las tarjetas si el término de búsqueda está vacío
    container.innerHTML = cardsHTML;
  } else {
    // filtrar los eventos que contienen el término de búsqueda en el nombre o descripción
    const filteredEvents = data.events.filter(event => {
      const eventName = event.name.toLowerCase();
      return eventName.includes(searchTerm);
    });
    if (filteredEvents.length === 0) {
      // Mostrar un prompt al usuario si no se encontraron eventos
      alert("Invalid input. Please try another event name.");
    }
    const filteredCardsHTML = generateCardsHTML(filteredEvents);
    container.innerHTML = filteredCardsHTML;
  }
}

// Manejar la búsqueda cuando se envía el formulario
const searchForm = document.querySelector('#search form');
const searchInput = document.querySelector('#search input[type="search"]');

searchForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase().trim();
  handleSearch(searchTerm);
});

// Manejar la búsqueda cuando se cambia el contenido del input
searchInput.addEventListener('input', function (event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  handleSearch(searchTerm);
});

// Escuchar el evento click en los botones "More Info"
container.addEventListener("click", event => {
  if (event.target.classList.contains("book-now-btn")) {
    const eventData = {
      name: event.target.getAttribute("data-name"),
      image: event.target.getAttribute("data-image"),
      date: event.target.getAttribute("data-date"),
      price: event.target.getAttribute("data-price"),
      category: event.target.getAttribute("data-category"),
      place: event.target.getAttribute("data-place"),
      description: event.target.getAttribute("data-description"),
      capacity: event.target.getAttribute("data-capacity")
    };

    // Guardar los datos del evento en el localStorage
    localStorage.setItem("selectedEvent", JSON.stringify(eventData));

    // Redirigir al usuario a details.html
    window.location.href = "./details.html";
  }
});















