
function cargarRoles() {
    fetch('http://localhost/Aerolinea-Web-Segura/backend/fetch_roles.php')
        .then(response => response.json())
        .then(data => {
            const selectRol = document.getElementById('selectRol');

            data.forEach(rol => {
                const option = document.createElement('option');
                option.value = rol.rol;
                option.textContent = rol.rol;
                selectRol.appendChild(option);
            });
        })
        .catch(error => console.error('Error al cargar roles:', error));
}

async function registrarAdministrador() {
    let nombres = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellido").value.trim();
    let correo = document.getElementById("email").value.trim();
    let contrasenia = document.getElementById("contra").value.trim();
    let rol = document.getElementById("selectRol").value;

    console.log("registrarAdministrador", nombres, apellidos, correo, contrasenia, rol);

    if (nombres && apellidos && correo && contrasenia && rol) {

        fetch("http://localhost/Aerolinea-Web-Segura/backend/users_management/crearUsuarioEmpleado.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nombres: nombres, 
                apellidos: apellidos, 
                username: correo, 
                contraseña: contrasenia,  
                rol: rol 
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(async data => {

            if (data.estado === "registro_exitoso") {
                registrarEventoSeguridad(
                    'CREACIÓN_DE_USUARIO',
                    'Se creo un usuario exitosamente',
                    correo,
                    'INFO'
                );

                Swal.fire('Éxito', 'Usuario registrado exitosamente', 'success')
                    .then(() => {
                        window.location.href = window.location.origin + '/Aerolinea-Web-Segura/public/index.html';
                    });
            } else if (data.estado === "error_registro") {

                Swal.fire('Error', 'Ya existe un usuario con ese correo electrónico', 'error');
            }
        })
        .catch(async error => {
            console.error('Error en la solicitud:', error);

            Swal.fire('Error', 'Ya existe un usuario con ese correo electrónico. Intenta agregar más datos en los campos de nombre y apellido para generar un correo único.', 'error');
        });
    } else {
        Swal.fire('Error', 'Por favor, llene todos los campos', 'error');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    cargarRoles();
    
    // Agregar event listeners a los campos de nombre y apellido
    document.getElementById('nombre').addEventListener('input', generarEmail);
    document.getElementById('apellido').addEventListener('input', generarEmail);
});

function generarEmail() {
    const nombres = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellido').value.trim();
    
    if (nombres && apellidos) {
        const partesNombre = nombres.split(' ');
        const primeraLetraPrimerNombre = partesNombre[0].charAt(0).toLowerCase();
        const segundoNombre = partesNombre[1] ? partesNombre[1].toLowerCase() : '';

        const partesApellido = apellidos.split(' ');
        let primerApellido = partesApellido[0].toLowerCase();
        let inicialSegundoApellido = partesApellido[1] ? partesApellido[1].charAt(0).toLowerCase() : '';

        // Construir el email
        const email = `${primeraLetraPrimerNombre}${segundoNombre}.${primerApellido}${inicialSegundoApellido}.flybo@gmail.com`;
        document.getElementById('email').value = email;
    } else {
        document.getElementById('email').value = '';
    }
}
