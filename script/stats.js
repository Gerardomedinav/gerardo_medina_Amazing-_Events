// Función asíncrona para obtener los datos de la API
async function fetchData() {
  try {
    const response = await fetch('https://mindhub-xj03.onrender.com/api/amazing');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener los datos de la API', error);
  }
}

// Función para encontrar las estadísticas de asistencia de los eventos
function findAttendanceStats(events) {
  // Variables para almacenar los valores máximos y mínimos de asistencia y capacidad, así como los nombres de los eventos correspondientes
  let maxAttendance = 0;
  let minAttendance = 100;
  let maxCapacity = 0;
  let maxAttendanceEvent = '';
  let minAttendanceEvent = '';
  let maxCapacityEvent = '';

  // Iterar sobre cada evento para calcular la asistencia, capacidad y encontrar los valores máximos y mínimos
  events.forEach(event => {
    const attendancePercentage = (event.assistance / event.capacity) * 100;

    if (attendancePercentage > maxAttendance) {
      maxAttendance = attendancePercentage;
      maxAttendanceEvent = `${event.name} (${attendancePercentage.toFixed(2)}%)`;
    }

    if (attendancePercentage < minAttendance) {
      minAttendance = attendancePercentage;
      minAttendanceEvent = `${event.name} (${attendancePercentage.toFixed(2)}%)`;
    }

    if (event.capacity > maxCapacity) {
      maxCapacity = event.capacity;
      maxCapacityEvent = `${event.name} (${event.capacity})`;
    }
  });

  // Retornar un objeto con los nombres de los eventos correspondientes a los valores máximos y mínimos de asistencia y capacidad
  return { maxAttendanceEvent, minAttendanceEvent, maxCapacityEvent };
}

// Función para actualizar la tabla de estadísticas en la página web
function actualizarTabla(data) {
  // Encontrar las estadísticas de asistencia de los eventos
  const attendanceStats = findAttendanceStats(data.events);
   // Actualizar la tabla de estadísticas con los valores correspondientes
  const firstTd = document.querySelector('#stats-table tr:nth-child(3) td:nth-child(1)');
  const progressBarContainer = document.createElement("div");
  progressBarContainer.classList.add("progress-bar-container");
  const progressBar = document.createElement('div');
  progressBar.classList.add('progress-bar');
  const porcentajeMaxAttendanceEvent = parseFloat(extraerNumeroDecimal(attendanceStats.maxAttendanceEvent));
  console.log(porcentajeMaxAttendanceEvent);
  progressBar.style.width = `${porcentajeMaxAttendanceEvent}%`;
  const progressBarLabel = document.createElement("div");
  progressBarLabel.classList.add("progress-bar-label");
  progressBarLabel.textContent = `${attendanceStats.maxAttendanceEvent}`;
  progressBarContainer.appendChild(progressBar);
  progressBarContainer.appendChild(progressBarLabel); // Agregar la etiqueta de la barra de progreso
  firstTd.textContent = ""; // Eliminar el contenido anterior del td
  firstTd.appendChild(progressBarContainer); // Agregar el contenedor de la barra de progreso al td

  const secondTd = document.querySelector('#stats-table tr:nth-child(3) td:nth-child(2)');
  const progressBarContainer2 = document.createElement("div");
  progressBarContainer2.classList.add("progress-bar-container");
  const progressBar2 = document.createElement('div');
  progressBar2.classList.add('progress-bar');
  const porcentajeMinAttendanceEvent = parseFloat(extraerNumeroDecimal(attendanceStats.minAttendanceEvent));
  console.log(porcentajeMinAttendanceEvent);
  progressBar2.style.width = `${porcentajeMinAttendanceEvent}%`;
  const progressBarLabel2 = document.createElement("div");
  progressBarLabel2.classList.add("progress-bar-label");
  progressBarLabel2.textContent = `${attendanceStats.minAttendanceEvent}`;
  progressBarContainer2.appendChild(progressBar2);
  progressBarContainer2.appendChild(progressBarLabel2); // Agregar la etiqueta de la barra de progreso
  secondTd.textContent = "";// Eliminar el contenido anterior del td
  secondTd.appendChild(progressBarContainer2);// Agregar el contenedor de la barra de progreso al td

  
  const thirdTd = document.querySelector('#stats-table tr:nth-child(3) td:nth-child(3)');
  thirdTd.textContent = attendanceStats.maxCapacityEvent;
}

function extraerNumeroDecimal(str) {
  // Busca un número decimal en el string
  const regex = /[-+]?\d+(\.\d+)/g;
  const match = regex.exec(str);

  // Si se encuentra un número decimal, lo convierte a un número y lo retorna
  if (match) {
    return parseFloat(match[0]);
  }

  // Si no se encuentra un número decimal, retorna null
  return null;
}

// Función para mostrar las categorías de eventos en la página web
function mostrarCategorias(data, isPast) {
  // Obtener la fecha actual
  const currentDate = new Date(data.currentDate);

  // Filtrar los eventos según si son eventos pasados o futuros
  const filteredEvents = data.events.filter(event => {
    const eventDate = new Date(event.date);
    return isPast ? eventDate < currentDate : eventDate > currentDate;
  });

  // Encontrar las categorías únicas de los eventos filtrados
  const categories = filteredEvents.reduce((acc, event) => {
    if (!acc.includes(event.category)) {
      acc.push(event.category);
    }
    return acc;
  }, []);

  // Encontrar los precios totales, asistencias totales y capacidad total por categoría de evento

  const totalPricesAndAttendanceByCategory = filteredEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = {
        totalPrice: 0,
        totalAttendance: 0,
        totalEstimate: 0,
      };
    }

    const attendance = event.assistance || event.estimate || 0;
    acc[event.category].totalPrice += event.price * attendance;
    acc[event.category][isPast ? 'totalAttendance' : 'totalEstimate'] += attendance;

    return acc;
  }, {});


  const totalCapacityByCategory = filteredEvents.reduce((acc, event) => {
    if (!acc[event.category]) {
      acc[event.category] = 0;
    }
    acc[event.category] += event.capacity;
    return acc;
  }, {});

  const tableBody = document.querySelector('#stats-table tbody');
  const table = document.querySelector('#stats-table');
  const startingRow = document.querySelector(isPast ? '#past-table' : '#upcoming-table').parentNode.rowIndex + 2;

  categories.forEach((category, index) => {
    const row = startingRow + index;
    const newRow = table.insertRow(row);
    const categoryCell = newRow.insertCell(0);
    categoryCell.textContent = category;
    const revenueCell = newRow.insertCell(1);
    revenueCell.textContent = `$${totalPricesAndAttendanceByCategory[category].totalPrice}`;
    const attendancePercentage = ((totalPricesAndAttendanceByCategory[category][isPast ? 'totalAttendance' : 'totalEstimate'] / totalCapacityByCategory[category]) * 100).toFixed(2);
    const attendanceCell = newRow.insertCell(2);
    /* ================= barra de progreso en % de asistencia por evento ================= */
    const progressBarContainer = document.createElement("div");
    progressBarContainer.classList.add("progress-bar-container");
    const progressBar = document.createElement("div");
    progressBar.classList.add("progress-bar");
    progressBar.style.width = `${attendancePercentage}%`;
    const progressBarLabel = document.createElement("div");
    progressBarLabel.classList.add("progress-bar-label");
    progressBarLabel.textContent = `${attendancePercentage}%`;
    progressBarContainer.appendChild(progressBar);
    progressBarContainer.appendChild(progressBarLabel);

    attendanceCell.appendChild(progressBarContainer);
  });
}

async function executeOnLoad() {
  const data = await fetchData();

  if (data) {
    actualizarTabla(data);
    mostrarCategorias(data, true); // Para eventos pasados
    mostrarCategorias(data, false); // Para eventos futuros
  }
}
// Evento para cargar la función executeOnLoad cuando se carga la página
window.addEventListener('load', executeOnLoad);
