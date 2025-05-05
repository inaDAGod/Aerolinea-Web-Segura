let intentos = 0;

function loginEncript() {
    let correo = document.getElementById("username").value;
    let contrasenia = document.getElementById("password").value;
    var hash = CryptoJS.MD5(contrasenia);
    if (correo && contrasenia) {
        if (intentos < 4) {
            fetch("http://localhost/Aerolinea-Web-Segura/backend/login.php", {
                    method: "POST",
                    body: JSON.stringify({ username: correo, password: hash.toString() }),
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud de inicio de sesión');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.estado === 'contraseña_correcta') {
                        audi(correo);

                        // 🌟 Aquí guardas en localStorage:
                    localStorage.setItem('rol', data.rol); // Guardas el rol
                    localStorage.setItem('accesos', JSON.stringify(data.accesos)); // Guardas los accesos (convertido en string)
                    localStorage.setItem('tipo_usuario', data.tipo_usuario); // Guardas el tipo de usuario
                    console.log(data.tipo_usuario);
                        // Verificar si la contraseña ha expirado
                    if(data.password_expired) {
                        Swal.fire({
                            title: 'Contraseña expirada',
                            text: 'Tu contraseña tiene más de 60 días sin cambio. Por seguridad, debes actualizarla.',
                            icon: 'warning',
                            confirmButtonText: 'Cambiar ahora'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                toggleFormRes();
                            }
                        });
                        return;
                    }
                        //cambiarDirecto deberia ir a Index y el navvar seria los que cambia 
                        if(data.tipo_usuario === 'cliente'){
                            window.location.href = window.location.origin + '/Aerolinea-Web-Segura/public/indexCliente.html';
                        }
                        else if(data.tipo_usuario === 'administrador'){
                            window.location.href = window.location.origin + '/Aerolinea-Web-Segura/public/indexAdmi.html';;
                        }
                       
                    } else if (data.estado === 'contraseña_incorrecta') {
                        if (intentos === 3) {
                            Swal.fire('Error', 'Realizo muchos intentos. Por favor, inténtelo de nuevo más tarde.', 'error');
                            setTimeout(() => {
                                intentos = 0; 
                            }, 300000); //5 minutos
                        } else {
                            Swal.fire('Error', 'La contraseña ingresada es incorrecta.', 'error');
                        }
                        intentos++;
                    } else if (data.estado === 'usuario_no_encontrado') {
                        Swal.fire('Error', 'No se encontró ningún usuario con ese correo electrónico', 'error');
                    } else {
                        Swal.fire('Error', 'Ups algo salió mal. Inténtelo de nuevo más tarde.', 'error');
                    }
                })
                .catch(error => {
                    console.error('Error durante la solicitud de inicio de sesión:', error);
                    Swal.fire('Error', 'Ocurrió un error durante la solicitud de inicio de sesión. Inténtelo de nuevo más tarde.', 'error');
                });
        } else {
            Swal.fire('Error', 'Realizo muchos intentos. Por favor, inténtelo de nuevo más tarde.', 'error');
        }
    } else {
        Swal.fire('Error', 'Llena los campos', 'error');
    }
}



function registrarUsuario() {
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("email").value;
    let contrasenia = document.getElementById("contra").value;
            var hash = CryptoJS.MD5(contrasenia);
            fetch("http://localhost/Aerolinea-Web-Segura/backend/registro.php", {
                method: "POST",
                body: JSON.stringify({ nombres: nombres, apellidos: apellidos, username: correo, password: hash.toString() }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en la solicitud');
            })
            .then(data => {
                if (data.estado === "registro_exitoso") {
                    localStorage.setItem('tipo_usuario', 'cliente'); // Guarda el tipo de usuario en el localStorage
                    window.location.href = window.location.origin + '/Aerolinea-Web-Segura/public/indexCliente.html';
                } else if (data.estado === "error_registro") {
                    Swal.fire('Error', 'Ya existe un usuario con ese correo electrónico', 'error');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                Swal.fire('Error', 'Estás seguro que no tienes una cuenta?', 'error');
            });
}

function generarCodigoVerificacion() {
    return Math.random().toString(36).substring(2, 8); // Generar un código alfanumérico de 6 caracteres
}

let codigo = null;
function mandarCorreoVerificacion() {
    toggleFormVeri(); 
    codigo = generarCodigoVerificacion();
    console.log("Código generado:", codigo);
    let correoDestinatario = document.getElementById("email").value;
    let correoEnviado = document.getElementById("correoEnviado");
    correoEnviado.textContent = correoDestinatario;

    let parametrosCorreo = {
        to_email: correoDestinatario,
        subject: "Verificación de correo electrónico",
        message: codigo
    };
    emailjs.init("zIi78GtT-tPurllpe");
    
    emailjs.send("service_pks7xqo", "template_kvr02gi", parametrosCorreo)
        .then(function(response) {
            console.log("Correo enviado exitosamente:", response);
        }, function(error) {
            console.error("Error al enviar correo:", error);
        });
}

function verificar(){
    let codIngresado = document.getElementById("codVeri").value;
    console.log(typeof codIngresado);
    console.log(typeof codigo);
    if(codIngresado == codigo){
        registrarUsuario();
    }
    else{
        Swal.fire('Error', 'Revisa el codigo no coincide con el que se mando a tu correo', 'error');
    }
}
function esContraseniaCompleja(contrasenia) {
    // Verificar longitud mínima
    if (contrasenia.length < 10) {
        return { valido: false, mensaje: 'La contraseña debe tener al menos 10 caracteres' };
    }
    
    // Verificar mayúsculas
    if (!/[A-Z]/.test(contrasenia)) {
        return { valido: false, mensaje: 'La contraseña debe contener al menos una letra mayúscula' };
    }
    
    // Verificar minúsculas
    if (!/[a-z]/.test(contrasenia)) {
        return { valido: false, mensaje: 'La contraseña debe contener al menos una letra minúscula' };
    }
    
    // Verificar números
    if (!/[0-9]/.test(contrasenia)) {
        return { valido: false, mensaje: 'La contraseña debe contener al menos un número' };
    }
    
    // Verificar caracteres especiales
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(contrasenia)) {
        return { valido: false, mensaje: 'La contraseña debe contener al menos un carácter especial' };
    }
    
    return { valido: true, mensaje: 'Contraseña válida' };
}
function verificarCampos(){
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("email").value;
    let contrasenia = document.getElementById("contra").value;

    if(nombres && apellidos && correo && contrasenia){
        fetch("http://localhost/Aerolinea-Web-Segura/backend/verificarExistencia.php", {
            method: "POST",
            body: JSON.stringify({username: correo }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            if (data.estado === "cuenta_nueva") {
                const resultado = esContraseniaCompleja(contrasenia);
                if(!resultado.valido){
                    //Swal.fire('Error', resultado.mensaje, 'error');
                    Swal.fire('Error', "Ingrese contraseña segura", 'error');
                }
                else{
                    mandarCorreoVerificacion();
                }
            } else if (data.estado === "cuenta_existente") {
                Swal.fire('Error', 'Ya existe una cuenta con ese correo', 'error');
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'Ya existe una cuenta con ese correo', 'error');
        });
    }
    else{
        Swal.fire('Error', 'Completa todos los campos', 'error');
    }
}
function mandarCorreoRestauracion() {
    let correoDestinatario = document.getElementById("correoRestaurar").value;
    if(correoDestinatario){
        fetch("http://localhost/Aerolinea-Web-Segura/backend/verificarCuenta.php", {
            method: "POST",
            body: JSON.stringify({username: correoDestinatario }),
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Error en la solicitud');
        })
        .then(data => {
            if (data.estado === "cuenta_inexistente") {
                alert('No hay una cuenta registrada a ese correo');
            } else if (data.estado === "cuenta_existente") {
                toggleFormRes3();
                let correoEnviado = document.getElementById("correoEnviado2");
                correoEnviado.textContent = correoDestinatario;
                codigo = generarCodigoVerificacion();
                console.log("Código generado:", codigo);
                let parametrosCorreo = {
                    to_email: correoDestinatario,
                    message: codigo
                };
                emailjs.init("zIi78GtT-tPurllpe");
                
                emailjs.send("service_pks7xqo", "template_cbqy3ke", parametrosCorreo)
                    .then(function(response) {
                        console.log("Correo enviado exitosamente:", response);
                    }, function(error) {
                        console.error("Error al enviar correo:", error);
                    });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
            Swal.fire('Error', 'No hay una cuenta registrada a ese correo', 'error');
        });
    }
    else{
        Swal.fire('Error', 'Llena el correo', 'error');
    }
}

function verificar2(){
    let codIngresado = document.getElementById("codRestauraciom").value;
    if(codIngresado == codigo){
        toggleFormRes2();
        let correoDestinatario = document.getElementById("correoRestaurar").value;
        let correoEnviado = document.getElementById("correoCambiar");
        correoEnviado.textContent = correoDestinatario;

    }
    else{
        Swal.fire('Error', 'Revisa el codigo no coincide con el que se mando a tu correo', 'error');
    }
}


function newContra(){
    let contra1 = document.getElementById("passwordRes").value;
    let contra2 = document.getElementById("passwordRes2").value;
    let correo = document.getElementById("correoRestaurar").value;
    
    if(contra1 && contra2){
        if(contra1 == contra2){
            // Verificar complejidad
            const resultado = esContraseniaCompleja(contra1);
            if(!resultado.valido) {
                Swal.fire('Error', "Modifica a una contraseña segura", 'error');
                return;
            }
            
            var hash = CryptoJS.MD5(contra1);
            
            // Primero verificar el historial
            fetch("http://localhost/Aerolinea-Web-Segura/backend/checkPasswordHistory.php", {
                method: "POST",
                body: JSON.stringify({username: correo, password: hash.toString()}),
            })
            .then(response => response.json())
            .then(data => {
                if(data.estado === 'password_recently_used') {
                    Swal.fire({
                        title: 'Contraseña reciente',
                        text: 'No puedes usar una contraseña que ya utilizaste en los últimos 3 meses.',
                        icon: 'error'
                    });
                } else {
                    // Si pasa la validación, proceder con el cambio
                    return fetch("http://localhost/Aerolinea-Web-Segura/backend/updatePassword.php", {
                        method: "POST",
                        body: JSON.stringify({username: correo, newPassword: hash.toString()}),
                    });
                }
            })
            .then(response => {
                if(response && response.ok) return response.json();
                return null;
            })
            .then(data => {
                if(data && data.estado === "contraseña_cambiada") {
                    Swal.fire({
                        title: 'Éxito',
                        text: 'Contraseña actualizada correctamente',
                        icon: 'success'
                    }).then(() => {
                        window.location.href = window.location.origin + '/Aerolinea-Web-Segura/public/registro.html';
                    });
                } else if(data && data.estado === "error_actualizacion") {
                    Swal.fire('Error', 'Hubo un problema al actualizar la contraseña', 'error');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                Swal.fire('Error', 'Ocurrió un error inesperado', 'error');
            });
        } else {
            Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        }
    } else {
        Swal.fire('Error', 'Llena ambos campos', 'error');
    }
}

function audi(correo){
    const ahora = new Date().toString();
    fetch("http://localhost/Aerolinea-Web-Segura/backend/audi.php", {
                method: "POST",
                body: JSON.stringify({ correo: correo, fecha:ahora}),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en la solicitud');
            })
            .then(data => {
                if (data.estado === "registro_exitoso") {
                } else if (data.estado === "error_registro") {
                    alert('Ya existe un usuario con ese correo electrónico');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                alert('Estás seguro que no tienes una cuenta?');
            });
}