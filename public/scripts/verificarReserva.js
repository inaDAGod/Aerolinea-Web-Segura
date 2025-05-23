$(document).ready(function() {
    $("#buscarReservaBtn").click(function() {
        var carnet = $("#carnet").val();
        var numeroVuelo = $("#inputNumeroVuelo").val(); // Asegúrate de usar el ID correcto
        if (!carnet || !numeroVuelo) {
            Swal.fire('Error', 'Debe ingresar tanto el carnet como el número de vuelo.', 'error');
            return;
        }
        $.ajax({
            url: '/backend/verificarReserva.php',
            type: 'POST',
            dataType: 'json',
            data: { carnet: carnet, numeroVuelo: numeroVuelo },
            success: function(response) {
                if (response.encontrado) {
                    $("#nombre").val(response.nombre);
                    $("#apellido").val(response.apellido);
                    $("#numeroDocumento").val(response.numeroDocumento);
                    $("#fechaVuelo").val(response.fechaVuelo);
                    $("#horaVuelo").val(response.horaVuelo);
                    $("#origen").val(response.origen);
                    $("#destino").val(response.destino);
                    $("#numeroVuelo").val(numeroVuelo);
                    Swal.fire('Reserva Encontrada', 'La reserva ha sido encontrada y está pagada.', 'success');
                } else {
                    resetFields();
                    Swal.fire('No encontrada', response.message, 'error');
                }
            },
            error: function() {
                Swal.fire('Error', 'Hubo un problema al conectar con el servidor.', 'error');
            }
        });
    });

    function resetFields() {
        $("#nombre, #apellido, #numeroDocumento, #fechaVuelo, #horaVuelo, #origen, #destino, #numeroVuelo").val('');
    }

    // Maneja el evento de submit para el botón "Generar Boletos"
    $("#formCheckin").submit(function(event) {
        event.preventDefault(); // Previene el envío automático del formulario

        // Verifica si todos los campos requeridos están llenos
        var isComplete = $("#nombre").val() && $("#apellido").val() && $("#numeroDocumento").val() &&
                         $("#fechaVuelo").val() && $("#horaVuelo").val() && $("#origen").val() && $("#destino").val() &&
                         $("#numeroVuelo").val();

        if (!isComplete) {
            Swal.fire('Error', 'Por favor complete todos los campos antes de generar los boletos.', 'error');
        } else {

            var carnet = $("#carnet").val();
            var numeroVuelo = $("#inputNumeroVuelo").val();

    // Llamada AJAX para verificar la existencia del boleto
    $.ajax({
        url: '/backend/verificarBoleto.php', // Asegúrate de que la ruta es correcta
        type: 'POST',
        dataType: 'json',
        data: { carnet: carnet, cvuelo: numeroVuelo },
        success: function(response) {
            if (!response.existe) {
                $("#emailModal").modal('show'); // Abre el modal si el boleto no existe
            } else {
                Swal.fire('Error', 'Ya se generó el boleto para este vuelo y carnet.', 'error');
            }
        },
        error: function() {
            Swal.fire('Error', 'Hubo un problema al conectar con el servidor.', 'error');
        }
    });
        }
    });

    // Maneja el envío del formulario dentro del modal
    // Maneja el envío del formulario dentro del modal
    $("#emailForm").submit(function(event) {
        event.preventDefault();
        var email = $("#emailInput").val();
        var carnet = $("#carnet").val();
        var numeroVuelo = $("#numeroVuelo").val();  // Asegúrate de tener un input con id="numeroVuelo" para obtener este valor
        var fechaVuelo = $("#fechaVuelo").val();
        var horaVuelo = $("#horaVuelo").val();
        var origen = $("#origen").val();
        var destino = $("#destino").val();
    
        if (email && carnet && numeroVuelo && fechaVuelo && horaVuelo && origen && destino) {
            // Primero crea el check-in
            $.ajax({
                url: '/backend/generarCheckin.php',
                type: 'POST',
                dataType: 'json',
                data: {
                    carnet: carnet,
                    fechaVuelo: fechaVuelo,
                    email: email
                },
                success: function(responseCheckin) {
                    if (responseCheckin.success) {
                        // Si el check-in se crea exitosamente, procede a crear el boleto
                        $.ajax({
                            url: '/backend/generarBoleto.php',
                            type: 'POST',
                            dataType: 'json',
                            data: {
                                carnet: carnet,
                                cvuelo: numeroVuelo,
                                ccheck_in: responseCheckin.ccheck_in
                            },
                            success: function(responseBoleto) {
                                if (responseBoleto.success) {
                                    // Enviar correo con los detalles de la reserva
                                    enviarCorreo(email, $("#nombre").val(), $("#apellido").val(), carnet, numeroVuelo, 
                                                fechaVuelo, horaVuelo, origen, destino);
                                    $("#emailModal").modal('hide'); // Cierra el modal
                                    Swal.fire('Confirmado', 'El correo ha sido enviado, el check-in y los boletos han sido generados.', 'success');
                                } else {
                                    Swal.fire('Error', responseBoleto.message, 'error');
                                }
                            },
                            error: function() {
                                Swal.fire('Error', 'Hubo un problema al generar el boleto.', 'error');
                            }
                        });
                    } else {
                        Swal.fire('Error', responseCheckin.message, 'error');
                    }
                },
                error: function() {
                    Swal.fire('Error', 'Hubo un problema al generar el check-in.', 'error');
                }
            });
        } else {
            Swal.fire('Error', 'Por favor complete todos los campos y el correo electrónico antes de enviar.', 'error');
        }
    });
    emailjs.init("XhWMaSqNfASzICac5"); // Reemplaza con tu User ID real
function enviarCorreo(email, nombre, apellido, numeroDocumento, numeroVuelo, fechaVuelo, horaVuelo, origen, destino) {
    var templateParams = {
        to_email: email,
        from_name: 'Aerolínea Info',
        subject: 'Boleto',
        message: `Nombre: ${nombre}\nApellido: ${apellido}\nNúmero de Documento: ${numeroDocumento}\nNúmero de Vuelo: ${numeroVuelo}\nFecha de Vuelo: ${fechaVuelo}\nHora del Vuelo: ${horaVuelo}\nOrigen: ${origen}\nDestino: ${destino}`
    };

    emailjs.send('service_0ems5rg', 'template_48zopgh', templateParams)
        .then(function(response) {
            console.log('Correo enviado exitosamente', response.status, response.text);
        }, function(error) {
            console.log('Fallo el envío de correo', error);
        });
}

});