// Fetch user statistics from PHP script
fetch('http://localhost/Aerolinea-Web-Segura/backend/user_statistics.php')
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
    initPasswordChangeModal();
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
// Función para inicializar el modal de cambio de contraseña
function initPasswordChangeModal() {
    const changePasswordBtn = document.getElementById('change-password-btn');
    const modal = document.getElementById('passwordModal');
    const closeBtn = document.querySelector('.close');
    const passwordForm = document.getElementById('passwordForm');
    const passwordMessage = document.getElementById('passwordMessage');

    // Mostrar modal al hacer clic en el botón
    if (changePasswordBtn) {
        changePasswordBtn.addEventListener('click', function() {
            modal.style.display = 'block';
        });
    }

    // Cerrar modal al hacer clic en la X
    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            modal.style.display = 'none';
            passwordMessage.textContent = '';
            passwordForm.reset();
        });
    }

    // Cerrar modal al hacer clic fuera del contenido
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            passwordMessage.textContent = '';
            passwordForm.reset();
        }
    });

    // Función para verificar complejidad de contraseña
    function esContraseniaCompleja(contrasenia) {
        if (contrasenia.length < 10) return false;
        if (!/[A-Z]/.test(contrasenia)) return false;
        if (!/[a-z]/.test(contrasenia)) return false;
        if (!/[0-9]/.test(contrasenia)) return false;
        if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasenia)) return false;
        return true;
    }

    // Manejar el envío del formulario
    if (passwordForm) {
        passwordForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Resetear mensajes
            passwordMessage.textContent = '';
            passwordMessage.style.color = 'red';

            // Validaciones básicas
            if (!currentPassword || !newPassword || !confirmPassword) {
                passwordMessage.textContent = 'Todos los campos son obligatorios';
                return;
            }

            if (newPassword !== confirmPassword) {
                passwordMessage.textContent = 'Las nuevas contraseñas no coinciden';
                return;
            }

            if (!esContraseniaCompleja(newPassword)) {
                passwordMessage.textContent = 'La contraseña no cumple con los requisitos de seguridad';
                return;
            }

            // Obtener el correo del usuario de la sesión
            const userEmail = document.querySelector('#user-details div:nth-child(3)').textContent.split(': ')[1].trim();
            
            try {
                // 1. Verificar contraseña actual
                const verifyResponse = await fetch('http://localhost/Aerolinea-Web-Segura/backend/login.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: userEmail,
                        password: CryptoJS.MD5(currentPassword).toString()
                    })
                });
                
                const verifyData = await verifyResponse.json();
                
                if (verifyData.estado !== 'contraseña_correcta') {
                    passwordMessage.textContent = 'La contraseña actual es incorrecta';
                    return;
                }

                // 2. Verificar historial de contraseñas
                const historyResponse = await fetch('http://localhost/Aerolinea-Web-Segura/backend/checkPasswordHistory.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: userEmail,
                        password: CryptoJS.MD5(newPassword).toString()
                    })
                });
                
                const historyData = await historyResponse.json();
                
                if (historyData.estado === 'password_recently_used') {
                    passwordMessage.textContent = 'No puedes usar una contraseña utilizada en los últimos 3 meses';
                    return;
                }

                // 3. Actualizar contraseña
                const updateResponse = await fetch('http://localhost/Aerolinea-Web-Segura/backend/updatePassword.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        username: userEmail,
                        currentPassword: CryptoJS.MD5(currentPassword).toString(),
                        newPassword: CryptoJS.MD5(newPassword).toString()
                    })
                });
                
                const updateData = await updateResponse.json();
                
                if (updateData.estado === 'contraseña_cambiada') {
                    passwordMessage.textContent = 'Contraseña cambiada con éxito';
                    passwordMessage.style.color = 'green';
                    
                    // Cerrar el modal después de 2 segundos
                    setTimeout(() => {
                        modal.style.display = 'none';
                        passwordMessage.textContent = '';
                        passwordForm.reset();
                    }, 2000);
                } else {
                    passwordMessage.textContent = updateData.mensaje || 'Error al cambiar la contraseña';
                }
            } catch (error) {
                console.error('Error:', error);
                passwordMessage.textContent = 'Error al conectar con el servidor';
            }
        });
    }
}