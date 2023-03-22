import { generateCardsHTML } from './main.js';
import { handleBookNowButtonClick } from "./main.js";
import { mostrar_categorias_checkbox } from "./main.js";

async function loadCards() {
  const data = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
  const eventData = await data.json();
  
  // Filtrar los eventos que ya han pasado
  const futureEvents = eventData.events.filter(event => new Date(event.date) < new Date());
  
  //generar cards llamando a la funcion generateCardsHTML() recive como parametro los eventos
  const container = document.querySelector("#cards-container");
  
  // Cards Generation - Upcoming Events //
  const cardsHTML = generateCardsHTML(futureEvents);
  container.innerHTML = cardsHTML;

  const container3 = document.querySelector("#cards-container");
  const checkboxContainer = document.getElementById("checkbox");
  const searchForm = document.querySelector("#search form");
  const searchInput = document.querySelector('#search input[type="search"]');
  cardsHTML = mostrar_categorias_checkbox(eventData, container3, checkboxContainer,searchForm, searchInput);
  container.innerHTML = cardsHTML;

  
  //llamar a funcion para botom more info 
  const container2 = document.querySelector("#cards-container");
  handleBookNowButtonClick(container2);





//reproducir audio
 // var container_audio = document.getElementById("my-audio");
 // const audio = audio.play();
 // container_audio.innerHTML =  audio;
}

loadCards(); // Llama a la función para cargar la la página
