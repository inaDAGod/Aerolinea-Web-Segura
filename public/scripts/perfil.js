
// Fetch user statistics from PHP script
fetch('user_statistics.php')
    .then(response => response.json())
    .then(data => {
        // Update HTML with user statistics
        document.getElementById('userStatistics').innerHTML = data.message;
    })
    .catch(error => {
        console.error('Error fetching user statistics:', error);
    });



// Define the showSection function in the global scope
function showSection(sectionId) {
    // Hide all sections except for "Datos del Usuario"
    var sections = document.querySelectorAll('.section-content:not(#user-info)');
    sections.forEach(function(section) {
        section.classList.remove('active');
    });
    
    // Show the selected section
    var selectedSection = document.getElementById(sectionId);
    if (selectedSection) {
        selectedSection.classList.add('active');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Fetch and display user details
    loadUserInfo();
    loadStatistics();
    loadWeekFlights();
    loadUserReservations();
    loadPastUserFlights();
});

function loadUserInfo() {
    // Lógica para cargar los detalles del usuario utilizando AJAX
    fetch('http://localhost/Aerolinea-Web-Segura/backend/user_info.php')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-name').textContent = data.nombres_usuario;
            document.getElementById('user-details').innerHTML = `
                <div><span>Nombre:</span> ${data.nombres_usuario}</div>
                <div><span>Apellido:</span> ${data.apellidos_usuario}</div>
                <div><span>Correo:</span> ${data.correo_usuario}</div>
            `;
            document.getElementById('user-millas').textContent = data.millas;
        })
        .catch(error => {
            console.error('Error fetching user info:', error);
        });
}

function loadStatistics() {
    // Fetch user statistics
    fetch('http://localhost/Aerolinea-Web-Segura/backend/user_statistics.php')
    .then(response => response.json())
    .then(data => {
        // Update HTML with user statistics
        document.getElementById('userStatistics').innerHTML = `
        <table class='esta-user'>
            <th><span>Total ciudades visitadas:</span> ${data.total_cities_visited}</th>
            <th><span>Total millas ganadas:</span> ${data.total_miles_earned}<th>

            </tr></table>
        `;
    })
    .catch(error => {
        console.error('Error fetching user statistics:', error);
    });
}

function loadWeekFlights() {
    // Lógica para cargar los vuelos de la semana utilizando AJAX
    fetch('http://localhost/Aerolinea-Web-Segura/backend/week_flights.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('week-flights-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching week flights:', error);
        });
}

function loadUserReservations() {
    // Lógica para cargar las reservas del usuario utilizando AJAX
    fetch('http://localhost/Aerolinea-Web-Segura/backend/reservations.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('user-reservations-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching user reservations:', error);
        });
}

function loadPastUserFlights() {
    // Lógica para cargar los vuelos pasados del usuario utilizando AJAX
    fetch('http://localhost/Aerolinea-Web-Segura/backend/past_flights.php')
        .then(response => response.text())
        .then(data => {
            document.getElementById('past-user-flights-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching past user flights:', error);
        });
}