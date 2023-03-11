import { data } from "./data.js";


/* Cards Logic */

const container = document.querySelector("#cards-container");

// Generar las tarjetas con todos los eventos
function generateCardsHTML(events) {
  const cardsHTML = events.map(item => `
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
      <price>Price:$ ${item.price}</price>
      <category>Category: ${item.category}</category>
      <place>Place: ${item.place}</place>
      <description>Description: ${item.description}</description>
      <button class="book-now-btn" data-name="${item.name}" data-image="${item.image}" data-capacity="${item.capacity}" data-date="${item.date}" data-price="${item.price}" data-category="${item.category}" data-place="${item.place}" data-description="${item.description}">More Info</button>

  </div>
</div> `).join("");

  return cardsHTML;
}

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


// Mostrar todas las tarjetas al inicio
let cardsHTML = generateCardsHTML(data.events);
container.innerHTML = cardsHTML;

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
  input.addEventListener('change', function(event) {
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
  // Obtener las categorías seleccionadas
  const selectedCategories = [...checkboxContainer.querySelectorAll('input:checked')].map(input => input.value);

  // Filtrar los eventos por categoría y término de búsqueda
  const filteredEvents = data.events.filter(event => {
    const eventName = event.name.toLowerCase();
    const matchesSearchTerm = eventName.includes(searchTerm);
    const isCategorySelected = selectedCategories.length === 0 || selectedCategories.includes(event.category) || selectedCategories.includes('all');
    return matchesSearchTerm && isCategorySelected;
  });

  if (filteredEvents.length === 0) {
    alert("Invalid input. Please try another event name.");
  }

  // Actualizar el HTML del contenedor de tarjetas
  const filteredCardsHTML = generateCardsHTML(filteredEvents);
  container.innerHTML = filteredCardsHTML;
}


// Manejar la búsqueda cuando se envía el formulario
const searchForm = document.querySelector('#search form');
const searchInput = document.querySelector('#search input[type="search"]');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const searchTerm = searchInput.value.toLowerCase().trim();
  handleSearch(searchTerm);
});

// Manejar la búsqueda cuando se cambia el contenido del input
searchInput.addEventListener('input', function(event) {
  const searchTerm = event.target.value.toLowerCase().trim();
  handleSearch(searchTerm);
});

  

