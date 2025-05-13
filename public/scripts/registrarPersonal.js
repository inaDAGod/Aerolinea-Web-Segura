document.addEventListener('DOMContentLoaded', function() {
    cargarRoles();
});

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

function registrarAdministrador() {
    let nombres = document.getElementById("nombre").value.trim();
    let apellidos = document.getElementById("apellido").value.trim();
    let correo = document.getElementById("email").value.trim();
    let contrasenia = document.getElementById("contra").value.trim();
    let rol = document.getElementById("selectRol").value;
    console.log("registrarAdministrador", nombres, apellidos, correo, contrasenia, rol);

    if (nombres && apellidos && correo && contrasenia && rol) {
        var hash = CryptoJS.MD5(contrasenia).toString();

        fetch("http://localhost/Aerolinea-Web-Segura/backend/users_management/crearUsuarioEmpleado.php", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                nombres: nombres, 
                apellidos: apellidos, 
                username: correo, 
                contraseña: hash,  
                rol: rol 
            }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            if (data.estado === "registro_exitoso") {
                Swal.fire('Éxito', 'Administrador registrado exitosamente', 'success')
                    .then(() => {
                        window.location.href = window.location.origin + '/public/index.html';
                        //window.location.href = window.location.origin + 'Aerolinea-web-segura/public/index.html';
                    });
            } else if (data.estado === "error_registro") {
                Swal.fire('Error', 'Ya existe un usuario con ese correo electrónico', 'error');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'Hubo un problema al registrar. ¿Ya tienes una cuenta?', 'error');
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
        // Obtener la primera letra del primer nombre
        const primeraLetraNombre = nombres.charAt(0).toLowerCase();
        
        // Obtener el primer apellido completo y la primera letra del segundo apellido (si existe)
        const partesApellido = apellidos.split(' ');
        let parteApellido = partesApellido[0].toLowerCase();
        
        if (partesApellido.length > 1) {
            parteApellido += partesApellido[1].charAt(0).toLowerCase();
        }
        
        // Construir el email
        const email = `${primeraLetraNombre}.${parteApellido}.flybo@gmail.com`;
        document.getElementById('email').value = email;
    } else {
        document.getElementById('email').value = '';
    }
}
