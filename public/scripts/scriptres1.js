
    document.getElementById('eliminar-reserva-btn').addEventListener('click', function() {
        fetch('http://localhost/Aerolinea-Web-Segura/backend/eliminar_reserva.php', {
            method: 'POST'
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert("Error: " + data.error);
            } else {
                alert(data.message);
                window.location.href = 'indexCliente.html';
            }
        })
        .catch(error => {
            console.error('Error eliminando reserva:', error);
        });
    });

