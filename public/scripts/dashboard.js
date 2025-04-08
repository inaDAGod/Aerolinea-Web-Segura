// Obtiene los datos de PHP para la cantidad de vuelos por ciudad
fetch('http://localhost/SistemaWeb-Aerolinea/backend/get_data.php?vuelosPorCiudad=true')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor');
    }
    return response.json();
  })
  .then(data => {
    // Procesa los datos para la cantidad de vuelos por ciudad
    const labels1 = data.vuelos_por_ciudad.map(entry => entry.ciudad);
    const valores1 = data.vuelos_por_ciudad.map(entry => entry.cantidad_vuelos);

    // Crea el gráfico para la cantidad de vuelos por ciudad
    const ctx1 = document.getElementById('vuelosPorCiudadChart').getContext('2d');
    const vuelosPorCiudadChart = new Chart(ctx1, {
      type: 'bar',
      data: {
        labels: labels1,
        datasets: [{
          label: 'Cantidad de Vuelos',
          data: valores1,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de cantidad de vuelos por ciudad:', error.message);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  });

// Obtiene los datos de PHP para las personas con más millas acumuladas
fetch('http://localhost/SistemaWeb-Aerolinea/backend/get_data.php?personasConMasMillas=true')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor');
    }
    return response.json();
  })
  .then(data => {
    // Procesa los datos para las personas con más millas acumuladas
    const labels2 = data.personas_con_mas_millas.map(entry => entry.nombres_usuario + ' ' + entry.apellidos_usuario);
    const valores2 = data.personas_con_mas_millas.map(entry => entry.millas);

    // Crea el gráfico para las personas con más millas acumuladas
    const ctx2 = document.getElementById('personasConMasMillasChart').getContext('2d');
    const personasConMasMillasChart = new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labels2,
        datasets: [{
          label: 'Millas acumuladas',
          data: valores2,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 177, 21)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de personas con más millas acumuladas:', error.message);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  });

// Obtiene los datos de PHP para la cantidad de reservas por estado
fetch('http://localhost/SistemaWeb-Aerolinea/backend/get_data.php?reservasPorEstado=true')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor');
    }
    return response.json();
  })
  .then(data => {
    // Procesa los datos para la cantidad de reservas por estado
    const labels3 = data.reservas_por_estado.map(entry => entry.estado_reserva);
    const valores3 = data.reservas_por_estado.map(entry => entry.cantidad_reservas);

    // Crea el gráfico de barras para la cantidad de reservas por estado
    const ctx3 = document.getElementById('reservasPorEstadoChart').getContext('2d'); // Corregir aquí
    const reservasPorEstadoChart = new Chart(ctx3, { // Corregir aquí
      type: 'bar',
      data: {
        labels: labels3,
        datasets: [{
          label: 'Cantidad de Reservas',
          data: valores3,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(32, 119, 209)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de cantidad de reservas por estado:', error.message);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  });

// Obtiene los datos de PHP para la distribución de personas por sexo
fetch('http://localhost/SistemaWeb-Aerolinea/backend/get_data.php?distribucionPorSexo=true')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error al obtener los datos del servidor');
    }
    return response.json();
  })
  .then(data => {
    // Procesa los datos para la distribución de personas por sexo
    const labels4 = data.distribucion_por_sexo.map(entry => entry.sexo);
    const valores4 = data.distribucion_por_sexo.map(entry => entry.cantidad);

    // Asegúrate de tener 3 colores para los 3 parámetros
    const backgroundColors = ['#2077D1', '#FF8500', '#FFB115'];

    // Crea el gráfico de torta para la distribución de personas por sexo
    const ctx4 = document.getElementById('distribucionPorSexoChart').getContext('2d');
    const distribucionPorSexoChart = new Chart(ctx4, {
      type: 'pie',
      data: {
        labels: labels4,
        datasets: [{
          label: 'Distribución por Sexo',
          data: valores4,
          backgroundColor: backgroundColors,
          borderWidth: 1
        }]
      }
    });
  })
  .catch(error => {
    console.error('Error al obtener los datos de distribución de personas por sexo:', error.message);
    // Aquí puedes manejar el error, como mostrar un mensaje al usuario
  });
