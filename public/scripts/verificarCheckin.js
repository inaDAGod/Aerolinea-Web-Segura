$(document).ready(function() {
    $("#buscarBoletoBtn").click(function() {
        var carnet = $("#carnet").val();
        var numeroVuelo = $("#numeroVuelo").val();
        if (!carnet || !numeroVuelo) {
            Swal.fire('Error', 'Debe ingresar tanto el carnet como el número de vuelo.', 'error');
            return;
        }
        $.ajax({
            url: 'http://localhost/Aerolinea-Web-Segura/backend/verificarCheckin.php',
            type: 'POST',
            dataType: 'json',
            data: { carnet: carnet, numeroVuelo: numeroVuelo },
            success: function(response) {
                if (response.encontrado) {
                    $("#nombre").val(response.nombre);
                    $("#apellido").val(response.apellido);
                    $("#numeroDocumento").val(carnet);
                    $("#fechaVuelo").val(response.fechaVuelo);
                    $("#horaVuelo").val(response.horaVuelo);
                    $("#origen").val(response.origen);
                    $("#destino").val(response.destino);
                    Swal.fire('Encontrado', 'El boleto ha sido encontrado.', 'success');
                } else {
                    resetFields();
                    Swal.fire('No encontrado', response.message, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Hubo un problema al conectar con el servidor.', 'error');
            }
        });
    });

    function resetFields() {
        $("#nombre, #apellido, #numeroDocumento, #fechaVuelo, #horaVuelo, #origen, #destino").val('');
        $("#equipajeMano, #maleta, #equipajeExtra").prop('checked', false);
    }

    $("#formCheckin").submit(function(event) {
        event.preventDefault();
        var isComplete = $("#nombre").val() && $("#apellido").val() && $("#numeroDocumento").val() &&
            $("#fechaVuelo").val() && $("#horaVuelo").val() && $("#origen").val() && $("#destino").val() &&
            ($("#equipajeMano").is(':checked') || $("#maleta").is(':checked') || $("#equipajeExtra").is(':checked'));

        if (!isComplete) {
            Swal.fire('Error', 'Por favor complete todos los campos y seleccione al menos una opción de equipaje.', 'error');
        } else {
            $("#emailModal").modal('show');
        }
    });

    $("#emailForm").submit(function(event) {
        event.preventDefault();
        var email = $("#emailInput").val();
        if (email) {
            $.ajax({
                url: 'http://localhost/Aerolinea-Web-Segura/backend/actualizarCheckin.php',
                type: 'POST',
                data: {
                    email: email,
                    carnet: $("#carnet").val(),
                    numeroVuelo: $("#numeroVuelo").val(),
                    equipajeMano: $("#equipajeMano").is(':checked'),
                    maleta: $("#maleta").is(':checked'),
                    equipajeExtra: $("#equipajeExtra").is(':checked')
                },
                success: function(response) {
                    if (response.success) {
                        enviarCorreo(email, $("#nombre").val(), $("#apellido").val(), $("#numeroDocumento").val(), $("#fechaVuelo").val(), $("#horaVuelo").val(), $("#origen").val(), $("#destino").val());
                        Swal.fire('Check-in Confirmado', 'Su check-in ha sido realizado con éxito.', 'success');
                        $("#emailModal").modal('hide');
                    } else {
                        Swal.fire('Error', response.message, 'error');
                    }
                },
                error: function() {
                    Swal.fire('Error', 'Hubo un problema al realizar el check-in.', 'error');
                }
            });
        }
    });

    emailjs.init("XhWMaSqNfASzICac5"); // Reemplaza con tu User ID real

function enviarCorreo(email, nombre, apellido, numeroDocumento, fechaVuelo, horaVuelo, origen, destino) {
    var templateParams = {
        to_email: email,
        from_name: 'Vuela Bo',
        subject: 'Detalles del Check-in',
        message: `Nombre: ${nombre}\nApellido: ${apellido}\nNúmero de Documento: ${numeroDocumento}\nFecha de Vuelo: ${fechaVuelo}\nHora del Vuelo: ${horaVuelo}\nOrigen: ${origen}\nDestino: ${destino}`
    };

    emailjs.send('service_0ems5rg', 'template_guvck1n', templateParams) // Asegúrate de que estos ID sean correctos
        .then(function(response) {
            console.log('Correo enviado exitosamente', response.status, response.text);
        }, function(error) {
            console.log('Fallo el envío de correo', error);
        });
}
});