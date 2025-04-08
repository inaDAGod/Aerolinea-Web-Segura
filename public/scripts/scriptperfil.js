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
    // Agregar un controlador de eventos de clic para los encabezados de sección
    var sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(function(header) {
        header.addEventListener('click', function() {
            var sectionId = this.dataset.sectionId;
            showSection(sectionId);
        });
    });
    
    // Load user statistics when the page loads
    loadUserStatistics();
});

function loadUserInfo() {
    // Lógica para cargar los detalles del usuario utilizando AJAX
    fetch('user_info.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('user-details').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching user info:', error);
    });
}

function loadWeekFlights() {
    // Lógica para cargar los vuelos de la semana utilizando AJAX
    fetch('week_flights.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('week-flights').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching week flights:', error);
    });
}

function loadUserReservations() {
    // Lógica para cargar las reservas del usuario utilizando AJAX
    fetch('reservations.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('user-reservations').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching user reservations:', error);
    });
}

function loadPastUserFlights() {
    // Lógica para cargar los vuelos pasados del usuario utilizando AJAX
    fetch('past_flights.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('past-user-flights').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching past user flights:', error);
    });
}

function loadUserStatistics() {
    // Lógica para cargar las estadísticas del usuario utilizando AJAX
    fetch('user_statistics.php')
    .then(response => response.text())
    .then(data => {
        document.getElementById('userStatistics').innerHTML = data;
    })
    .catch(error => {
        console.error('Error fetching user statistics:', error);
    });
}
