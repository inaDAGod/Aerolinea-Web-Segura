document.addEventListener('DOMContentLoaded', function() {
    fetchOpiniones();
});

function fetchOpiniones() {
    fetch('http://localhost/Aerolinea-Web-Segura/backend/fetch_opiniones.php')
        .then(response => response.json())
        .then(data => {
            renderOpiniones(data);
            renderOpinionesChart(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderOpiniones(opiniones) {
    const container = document.getElementById('opiniones-container');
    container.innerHTML = ''; // Limpiar el contenedor

    opiniones.forEach(opinion => {
        const opinionDiv = document.createElement('div');
        opinionDiv.className = 'col-md-6 mb-4';

        opinionDiv.innerHTML = `
            <div class="card shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${opinion.nombres_usuario} ${opinion.apellidos_usuario}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${new Date(opinion.fecha_opinion).toLocaleDateString()}</h6>
                    <p class="card-text">${opinion.comentario}</p>
                    <div class="stars">
                        ${renderStars(opinion.estrellas)}
                    </div>
                    <div align = "right">
                        <button class="btn btn-danger btn-md mt-2" onclick="eliminarOpinion(${opinion.copinion})">
                        <i class="fas fa-trash-alt "></i>
                    </button>
                    </div>
                    
                </div>
            </div>
        `;

        container.appendChild(opinionDiv);
    });
}

function renderStars(estrellas) {
    let starsHtml = '';
    for (let i = 0; i < 5; i++) {
        if (i < estrellas) {
            starsHtml += '<i class="fas fa-star text-warning"></i>';
        } else {
            starsHtml += '<i class="far fa-star text-warning"></i>';
        }
    }
    return starsHtml;
}

let opinionesChartInstance;
function renderOpinionesChart(opiniones) {
    const starCounts = [0, 0, 0, 0, 0];

    opiniones.forEach(opinion => {
        if (opinion.estrellas >= 1 && opinion.estrellas <= 5) {
            starCounts[opinion.estrellas - 1]++;
        }
    });

    const ctx = document.getElementById('opinionesChart').getContext('2d');

    if (opinionesChartInstance) {
        opinionesChartInstance.destroy();
    }
    opinionesChartInstance = new Chart(ctx, {
        type: 'bar', // Cambiado a barra vertical
        data: {
            labels: ['1 estrella', '2 estrellas', '3 estrellas', '4 estrellas', '5 estrellas'],
            datasets: [{
                label: 'Número de Opiniones',
                data: starCounts,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            scales: {
                x: {
                    beginAtZero: true
                }
            }
        }
    });
}

function eliminarOpinion(idOpinion) {
    Swal.fire({
        title: '¿Está seguro de eliminar esta opinión?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            fetch(`http://localhost/Aerolinea-Web-Segura/backend/eliminar_opinion.php?copinion=${idOpinion}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    fetchOpiniones(); // Actualizar la lista de opiniones después de eliminar
                    Swal.fire({
                        title: 'Opinión eliminada',
                        icon: 'success'
                    });
                } else {
                    Swal.fire({
                        title: 'Error',
                        text: 'No se pudo eliminar la opinión',
                        icon: 'error'
                    });
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire({
                    title: 'Error',
                    text: 'Ocurrió un error al intentar eliminar la opinión',
                    icon: 'error'
                });
            });
        }
    });
}
