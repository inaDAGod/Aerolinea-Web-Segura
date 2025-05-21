    
$(document).ready(function () {
    function loadSeatsTable() {
        $('#seatSelectionContainer').load('http://localhost/Aerolinea-Web-Segura/backend/load_seats.php');
    }

    // Cargar la tabla de asientos al cargar la página
    loadSeatsTable();

    $('#reservationForm').submit(function (event) {
        event.preventDefault();
        // Validar si el captcha fue resuelto
        var response = grecaptcha.getResponse();
        if (response.length === 0) {
            Swal.fire({
                icon: 'warning',
                title: 'Verificación necesaria',
                text: 'Por favor, verifica que no eres un robot.'
            });
            return;
        }
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/process_form.php',
            type: 'POST',
            data: $(this).serialize(),
            success: function (response) {
                if (response.includes("REDIRECT")) {
                    // Si la respuesta indica que se debe redirigir
                    Swal.fire({
                        title: 'Reserva exitosa',
                        text: 'Redirigiendo...',
                        icon: 'success',
                        timer: 2000, // 2 segundos
                        timerProgressBar: true,
                        didOpen: () => {
                            Swal.showLoading();
                        },
                        willClose: () => {
                            window.location.href = 'reservafinal.html';
                        }
                    });
                } else if (response.includes("¡Reserva exitosa!")) {
                    // Si la respuesta indica que la reserva fue exitosa
                    Swal.fire({
                        title: 'Reserva exitosa',
                        text: 'Tu reserva ha sido registrada exitosamente.',
                        icon: 'success'
                    }).then(function () {
                        grecaptcha.reset(); // Reiniciar el captcha para otro intento
                        loadSeatsTable();
                        $('#reservationForm')[0].reset();
                    });
                }
            },
            error: function () {
                Swal.fire({
                    title: 'Error',
                    text: 'Error al procesar la solicitud.',
                    icon: 'error'
                });
            }
        });
    });
});





function loadEchoes() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                // Inserta los echos en el contenedor
                document.getElementById("echoContainer").innerHTML = xhr.responseText;
            } else {
                console.error('Hubo un error al cargar los echos.');
            }
        }
    };

    xhr.open('GET', 'http://localhost/Aerolinea-Web-Segura/backend/process_form.php', true);
    xhr.send();
}

// Llama a la función para cargar los echos cuando la página se carga completamente
window.onload = function() {
    loadEchoes();
};
document.addEventListener("DOMContentLoaded", function() {
    // Function to validate the CI number
    function validateCI(ci) {
        // Check if the length is 8
        if (ci.length !== 8) {
            return false;
        }
        // Check if all characters are numbers
        return /^\d+$/.test(ci);
    }

    // Function to validate the form
    function validateForm() {
        var ciInput = document.getElementById("ci_persona").value.trim();
        var errorMessageElement = document.getElementById("ci_error_message");

        // Validate the CI input
        if (validateCI(ciInput)) {
            // Clear error message if CI is valid
            errorMessageElement.textContent = "";
            return true; // Allow form submission
        } else {
            // Display error message if CI is invalid
            errorMessageElement.textContent = "La cédula de identidad debe contener 8 dígitos.";
            return false; // Prevent form submission
        }
    }

    // Add event listener to the input field
    document.getElementById("ci_persona").addEventListener("input", function() {
        var ciInput = this.value.trim();
        var errorMessageElement = document.getElementById("ci_error_message");

        // Validate the input
        if (validateCI(ciInput)) {
            // Clear error message if CI is valid
            errorMessageElement.textContent = "";
        } else {
            // Display error message if CI is invalid
            errorMessageElement.textContent = "La cédula de identidad debe contener 8 dígitos.";
        }
    });

    // Add event listener to the form to validate on submit
    document.querySelector("form").addEventListener("submit", function(event) {
        if (!validateForm()) {
            event.preventDefault(); // Prevent form submission
        }
    });
});

document.getElementById('eliminar-reserva-btn').addEventListener('click', function() {
    fetch('http://localhost/Aerolinea-Web-Segura/backend/eliminar_reserva.php', {
    method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
    if (data.error) {
    alert("Error: " + data.error);
    } else {
    Swal.fire({ // Utilizar Swal.fire para mostrar una alerta bonita
    title: '¡Reserva eliminada!',
    text: data.message,
    icon: 'success',
    showCancelButton: false,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'OK'
    }).then((result) => {
    if (result.isConfirmed) {
    window.location.href = 'indexCliente.html';
    }
    });
    }
    })
    .catch(error => {
    console.error('Error eliminando reserva:', error);
    });
    });

$(document).ready(function() {
    // Realizar una petición AJAX para obtener el tipo de persona
    $.ajax({
        url: 'http://localhost/Aerolinea-Web-Segura/backend/process_form.php', // Ruta al archivo PHP
        type: 'GET',
        success: function(response) {
            // Actualizar el contenido del span con el tipo de persona
            $('#tipo-persona').text(response);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
});


