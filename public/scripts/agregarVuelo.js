$(function() {
    $("#datepicker").datepicker({
        dateFormat: 'dd/mm/yy',
        changeMonth: true,
        changeYear: true
    });
});

$(document).ready(function() {
    $.ajax({
        url: 'http://localhost/Aerolinea-Web-Segura/backend/agregarVuelo.php',
        type: 'GET',
        dataType: 'json',
        success: function(ciudades) {
            ciudades.forEach(function(ciudad) {
                $('#origen').append(new Option(ciudad, ciudad));
                $('#destino').append(new Option(ciudad, ciudad));
            });
        },
        error: function() {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Error cargando las ciudades!',
            });
        }
    });

    $('#formAgregarVuelo').submit(function(e) {
        e.preventDefault();
        var origen = $('#origen').val();
        var destino = $('#destino').val();
        var avion = $('#avion').val();
        var fecha_vuelo = $('#datepicker').val();
        var hora = $('#hora').val();
        var costo_vip = $('#costo_vip').val();
        var costo_business = $('#costo_business').val();
        var costo_economico = $('#costo_economico').val();
        // Convertir la fecha de vuelo del formato dd/mm/yyyy a Date object para comparación
var partesFecha = fecha_vuelo.split('/');
var fechaVueloDate = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);

// Obtener la fecha actual y ajustarla para comparar solo las fechas, sin las horas
var fechaActual = new Date();
fechaActual.setHours(0, 0, 0, 0);

if (fechaVueloDate <= fechaActual) {
    Swal.fire('Error', 'La fecha del vuelo no puede ser anterior o igual a la fecha actual.', 'error');
    return;
}
        if (origen === destino) {
            Swal.fire('Error', 'El origen y el destino no pueden ser el mismo.', 'error');
            return;
        }

        if (costo_vip < 100 || costo_vip > 3500 || costo_business < 100 || costo_business > 3500 || costo_economico < 100 || costo_economico > 3500) {
            Swal.fire('Error', 'Los costos deben estar entre 100 y 3500.', 'error');
            return;
        }

        var datos = {
            origen: origen,
            destino: destino,
            avion: avion,
            fecha_vuelo: fecha_vuelo,
            hora: hora,
            costo_vip: costo_vip,
            costo_business: costo_business,
            costo_economico: costo_economico
        };

        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/agregarVuelo.php',
            type: 'POST',
            data: JSON.stringify(datos),
            contentType: 'application/json',
            dataType: 'json',
            success: function(response) {
                if(response.success) {
                    Swal.fire('¡Agregado!', 'Vuelo agregado correctamente.', 'success').then(() => location.reload());
                } else {
                    Swal.fire('Error al agregar vuelo', response.error, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Error al realizar la solicitud.', 'error');
            }
        });
    });
});
