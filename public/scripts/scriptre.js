$(document).ready(function() {
    $.ajax({
        url: 'http://localhost/Aerolinea-Web-Segura/backend/cargar_vuelo.php', // Reemplaza 'ruta_al_archivo_php.php' con la ruta correcta a tu archivo PHP
        type: 'GET', // Puedes usar 'GET' o 'POST' según la configuración de tu servidor
        success: function(response) {
            // Inserta el contenido recibido en el elemento con id 'contenido'
            $('#contenido').html(response);
        },
        error: function() {
            // Maneja el caso de error
            $('#contenido').html('<p>Error al cargar el contenido.</p>');
        }
    });
});

