import { generateCardsHTML } from './main.js';
import { handleBookNowButtonClick } from "./main.js";
import { mostrar_categorias_checkbox } from "./main.js";

async function loadpage() {
  const data = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
  //console.log(data);
  const eventData = await data.json();
  //console.log(eventData);
  //generar cards llamando a la funcion generateCardsHTML() recive como parametro los eventos
  const container = document.querySelector("#cards-container");
  const cardsHTML = generateCardsHTML(eventData.events);
  container.innerHTML = cardsHTML;

  const container3 = document.querySelector("#cards-container");
  const checkboxContainer = document.getElementById("checkbox");
  const searchForm = document.querySelector("#search form");
  const searchInput = document.querySelector('#search input[type="search"]');
  mostrar_categorias_checkbox(eventData, container3, checkboxContainer, searchForm, searchInput);

  //llamar a funcion para botom more info 
  const container2 = document.querySelector("#cards-container");
  handleBookNowButtonClick(container2);


}

loadpage(); // Llama a la función  cargar la página