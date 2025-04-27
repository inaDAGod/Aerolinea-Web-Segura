document.addEventListener('DOMContentLoaded', function() {
    const cvuelo = localStorage.getItem('cvuelo');
    const adultos = localStorage.getItem('adultos');
    const adultoMayor = localStorage.getItem('adultoMayor');
    const ninos = localStorage.getItem('ninos');
    const origen = localStorage.getItem('origen');
    const destino = localStorage.getItem('destino');

    console.log(localStorage);
    // Set the values of the elements
    document.getElementById('vueloSeleccionado').innerText = cvuelo;
    document.getElementById('adultosSeleccionados').innerText = adultos;
    document.getElementById('adultoMayorSeleccionados').innerText = adultoMayor;
    document.getElementById('ninosSeleccionados').innerText = ninos;

    // Set the origen and destino values
    document.getElementById('origenSeleccionado').innerText = origen;
    document.getElementById('destinoSeleccionado').innerText = destino;




 // Create the table using the retrieved data
 var tabla = '<table class="table table-striped">' +
 '<thead>' +
     '<tr>' +
         '<th>Tipo Persona</th>' +
         '<th>Cantidad</th>' +
         '<th>Total</th>' +
     '</tr>' +
 '</thead>' +
 '<tbody>' +
     '<tr>' +
         '<td>Adulto mayor</td>' +
         '<td>' + adultoMayor + '</td>' +
         '<td></td>' +
     '</tr>' +
     '<tr>' +
         '<td>Adultos</td>' +
         '<td>' + adultos + '</td>' +
         '<td></td>' +
     '</tr>' +
     '<tr>' +
         '<td>Niños</td>' +
         '<td>' + ninos + '</td>' +
         '<td></td>' +
     '</tr>' +
     '<tr>' +
         '<td></td>' +
         '<td></td>' +
         '<td>' + (parseInt(adultos) + parseInt(adultoMayor) + parseInt(ninos)) + '</td>' +
     '</tr>' +
 '</tbody>' +
'</table>';

// Insert the table into the HTML
document.getElementById('resumenVuelo').innerHTML = tabla;

    // Enviar datos a PHP
    const data = {
        cvuelo: cvuelo,
        adultos: adultos,
        adultoMayor: adultoMayor,
        ninos: ninos
    };

    fetch('http://localhost/Aerolinea-Web-Segura/backend/test_session.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});



