function audi(){
    let correo = 'ayana.siegle@ucb.edu.bo';
    const ahora = new Date().toString();
    fetch("http://localhost/Aerolinea-Web-Segura/backend/audi.php", {
                method: "POST",
                body: JSON.stringify({ correo: correo, fecha:ahora}),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en la solicitud');
            })
            .then(data => {
                if (data.estado === "registro_exitoso") {
                } else if (data.estado === "error_registro") {
                    alert('Ya existe un usuario con ese correo electrónico');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Estás seguro que no tienes una cuenta?');
            });
}




$(document).ready(function() {
    // Función para cargar todos los pasajeros al cargar la página
    loadAllPassengers();

    $("#buscarBtn").click(function() {
        var documento = $("#numeroDocumento").val();
        if (!documento) {
            alert('Por favor ingrese un número de documento.');
            return;
        }
  
        // Realizar una solicitud AJAX para buscar el pasajero por documento
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/listar_pasajeros.php',
            type: 'POST',
            data: { documento: documento }, // Enviar el documento directamente en el formulario POST
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else if (response.length === 0) {
                    alert("No hay reservas con el carnet introducido");
                } else {
                    updateTable(response);
                }
            },
            error: function(xhr, status, error) {
                alert("Error en AJAX: " + error);
            }
        });
    });
  
    // Función para cargar todos los pasajeros
    function loadAllPassengers() {
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/listar_usuarios.php',
            type: 'POST',
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    updateTable(response);
                }
            },
            error: function(xhr, status, error) {
                alert("Error en AJAX: " + error);
            }
        });
    }

    function updateTable(data) {
        var tbody = $('table tbody');
        tbody.empty(); // Limpia la tabla antes de agregar nuevos datos
        data.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
        data.forEach(function(item) {
            var row = `<tr>
                <td>${item.correo_usuario}</td>
                <td>${item.fecha}</td>
               
            </tr>`;
            tbody.append(row);
        });

        // Manejar el cambio de estado del combo box
        $('.dropdown-item').click(function() {
            var newStatus = $(this).attr('data-value');
            var documento = $(this).closest('tr').find('.documento').text(); // Obtener el documento del pasajero

            // Obtener el estado actual del check-in
            var estadoActual = $('#estadoCheckInDropdown' + documento).text().trim();

            // Verificar si el estado actual es "Realizado" y el nuevo estado es "Pendiente"
            if (estadoActual === "Realizado" && newStatus === "Pendiente") {
                alert("No se puede cambiar el estado a 'Pendiente' porque ya está 'Realizado'");
                return; // Evitar enviar la solicitud AJAX
            }

            // Si no hay problemas con la validación, enviar la solicitud AJAX
            updateCheckInStatus(documento, newStatus);
        });
    }

    function updateCheckInStatus(documento, newStatus) {
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/estado_checkin.php',
            type: 'POST',
            data: { documento: documento, estado: newStatus },
            success: function(response) {
                if (response.error) {
                    alert(response.error);
                } else {
                    // Actualizar el texto del botón del combo box después de cambiar el estado
                    var dropdownButton = $('#estadoCheckInDropdown' + documento);
                    dropdownButton.text(newStatus);
                }
            },
            error: function(xhr, status, error) {
                alert("Error en AJAX: " + error);
            }
        });
    }
});
