import { generateCardsHTML } from './main.js';
import { handleBookNowButtonClick } from "./.js";
import { mostrar_categorias_checkbox } from "./main.js";

async function loadPage() {
  const data = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
  const eventData = await data.json();
  
  // Filtrar los eventos que ya han pasado
  const pastEvents = eventData.events.filter(event => new Date(event.date) < new Date());
  
  //generar cards llamando a la funcion generateCardsHTML() recive como parametro los eventos
  const container = document.querySelector("#cards-container");
  
  // Cards Generation - Past Events //
  const cardsHTML = generateCardsHTML(pastEvents);
  container.innerHTML = cardsHTML;

  const container3 = document.querySelector("#cards-container");
  const checkboxContainer = document.getElementById("checkbox");
  const searchForm = document.querySelector("#search form");
  const searchInput = document.querySelector('#search input[type="search"]');
  mostrar_categorias_checkbox(eventData, container3, checkboxContainer,searchForm, searchInput);
  

  
  //llamar a funcion para botom more info 
  const container2 = document.querySelector("#cards-container");
  handleBookNowButtonClick(container2);

}

loadPage(); // Llama a la función para cargar la la página
