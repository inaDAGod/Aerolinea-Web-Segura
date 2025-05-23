$(document).ready(function() {
    // Función para cargar todos los pasajeros al cargar la página
    loadAllPassengers();

    $("#buscarBtn").click(function() {
        var documento = $("#numeroDocumento").val();
        var nombre = $("#nombre").val(); // Nuevo: obtener el valor del campo de nombre
        var apellido = $("#apellido").val(); // Nuevo: obtener el valor del campo de apellido

        if (!documento && !nombre && !apellido) {
            Swal.fire('Por favor ingrese un criterio de búsqueda.', 'error', 'error');
            return;
        }

        // Realizar una solicitud AJAX para buscar el pasajero por documento, nombre y apellido
        $.ajax({
            url: '/backend/listar_pasajeros.php',
            type: 'POST',
            data: { documento: documento, nombre: nombre, apellido: apellido }, // Nuevo: enviar nombre y apellido
            dataType: 'json',
            success: function(response) {
                if (response.error) {
                    Swal.fire('Por favor ingrese un criterio de búsqueda.', response.error, 'error');
                } else if (response.length === 0) {
                    Swal.fire('No se encontraron pasajeros con los criterios de búsqueda proporcionados.', 'error', 'error');
                } else {
                    updateTable(response);
                }
            },
            error: function(xhr, status, error) {
                Swal.fire('Error en ajax', xhr.responseText, 'error');
            }
        });
    });

    // Función para cargar todos los pasajeros
    function loadAllPassengers() {
        $.ajax({
            url: '/backend/listar_pasajeros.php',
            type: 'POST',
            dataType: 'json',
            success: function(response) {
                if (response.error) {
                    Swal.fire('No se pudo cargar la lista de pasjeros correctamente', response.error, 'error');
                } else {
                    updateTable(response);
                }
            },
            error: function(xhr, status, error) {
                Swal.fire('Error en ajax', xhr.responseText, 'error');
            }
        });
    }

    function updateTable(data) {
        var tbody = $('table tbody');
        tbody.empty(); // Limpia la tabla antes de agregar nuevos datos
        data.forEach(function(item) {
            var row = `<tr>
                <td>${item.tipo_pasajero}</td>
                <td>${item.asiento}</td>
                <td>${item.tipo_asiento}</td>
                <td>${item.nombres}</td>
                <td>${item.apellidos}</td>
                <td class="documento">${item.documento}</td>
                <td>
                    <select class="btn btn-secondary dropdown-toggle estado-checkin-dropdown" data-documento="${item.documento}" data-estado-actual="${item.estado_checkin}">
                        <option value="Pendiente" ${item.estado_checkin === "Pendiente" ? "selected" : ""}>Pendiente</option>
                        <option value="Realizado" ${item.estado_checkin === "Realizado" ? "selected" : ""}>Realizado</option>
                    </select>
                </td>
            </tr>`;
            tbody.append(row);
        });
    
        // Manejar el cambio de estado del combo box
        $('.estado-checkin-dropdown').change(function() {
            var newStatus = $(this).val();
            var documento = $(this).data('documento'); // Obtener el documento del pasajero
            var estadoActual = $(this).data('estado-actual'); // Obtener el estado actual
    
            // Verificar si el estado actual es "Realizado" y el nuevo estado es "Pendiente"
            if (estadoActual === "Realizado" && newStatus === "Pendiente") {
                Swal.fire('No se puede cambiar el estado a Pendiente porque ya está Realizado', '', 'error');
                // Revertir el cambio en el dropdown
                $(this).val(estadoActual);
                return; // Evitar enviar la solicitud AJAX
            }
    
            // Si no hay problemas con la validación, enviar la solicitud AJAX
            updateCheckInStatus(documento, newStatus);
        });
    }
    
    function updateCheckInStatus(documento, newStatus) {
        $.ajax({
            url: '/backend/estado_checkin.php',
            type: 'POST',
            data: { documento: documento, estado: newStatus },
            dataType: 'json',
            success: function(response) {
                if (response.error) {
                    Swal.fire('No se puede cambiar el estado', response.error, 'error');
                } else {
                    // Actualizar el estado actual en el dropdown
                    var dropdown = $(`select[data-documento="${documento}"]`);
                    dropdown.data('estado-actual', newStatus);
                    Swal.fire('Estado de Check-In actualizado correctamente', '', 'success');
                }
            },
            error: function(xhr, status, error) {
                Swal.fire('Error en ajax', xhr.responseText, 'error');
            }
        });
    }
    
    $("#mostrarTodosBtn").click(function() {
        $("#numeroDocumento").val('');
        $("#nombre").val('');
        $("#apellido").val('');
        loadAllPassengers();
    });
});
