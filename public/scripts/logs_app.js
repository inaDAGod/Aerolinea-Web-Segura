$(document).ready(function() {
    cargarLogs();

    function cargarLogs() {
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/listar_log_app.php',
            method: 'POST',
            success: function(response) {
                if (Array.isArray(response) && response.length > 0) {
                    actualizarTabla(response);
                } else {
                    $('table tbody').html('<tr><td colspan="3" class="text-center">No hay registros.</td></tr>');
                }
            },
            error: function(error) {
                console.error("Error al cargar los logs:", error);
                alert("Error al cargar los registros del log.");
            }
        });
    }

    function actualizarTabla(data) {
        const tbody = $('table tbody');
        tbody.empty();
        data.forEach(item => {
            const row = `
                <tr>
                    <td>${item.correo_usuario}</td>
                    <td>${item.mensaje}</td>
                    <td>${formatearFecha(item.fecha)}</td>
                </tr>`;
            tbody.append(row);
        });
    }

    function formatearFecha(fechaISO) {
        const fecha = new Date(fechaISO);
        return fecha.toLocaleString('es-BO', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
});
