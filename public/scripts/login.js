let intentos = 0;

function loginEncript() {
    let correo = document.getElementById("username").value;
    let contrasenia = document.getElementById("password").value;
    var hash = CryptoJS.MD5(contrasenia);
    if (correo && contrasenia) {
        if (intentos < 4) {
            fetch("http://localhost/SistemaWeb-Aerolinea/backend/login.php", {
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
                        if(data.tipo_usuario === 'cliente'){
                            window.location.href = 'http://localhost/SistemaWeb-Aerolinea/public/indexCliente.html';
                        }
                        else if(data.tipo_usuario === 'administrador'){
                            window.location.href = 'http://localhost/SistemaWeb-Aerolinea/public/indexAdmi.html';
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
            fetch("http://localhost/SistemaWeb-Aerolinea/backend/registro.php", {
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
                    window.location.href= 'http://localhost/SistemaWeb-Aerolinea/public/indexCliente.html';
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

function verificarCampos(){
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("email").value;
    let contrasenia = document.getElementById("contra").value;

    if(nombres && apellidos && correo && contrasenia){
        fetch("http://localhost/SistemaWeb-Aerolinea/backend/verificarExistencia.php", {
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
                if(contrasenia.length < 6){
                    alert('Contraseña muy corta, mínimo 6 caracteres');
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
        fetch("http://localhost/SistemaWeb-Aerolinea/backend/verificarCuenta.php", {
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
            var hash = CryptoJS.MD5(contra1);
            fetch("http://localhost/SistemaWeb-Aerolinea/backend/updatePassword.php", {
                method: "POST",
                body: JSON.stringify({username: correo, newPassword:  hash.toString() }),
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Error en la solicitud');
            })
            .then(data => {
                if (data.estado === "contraseña_cambiada") {
                    alert('Se restauro tu contraseña');
                    window.location.href= 'http://localhost/SistemaWeb-Aerolinea/public/registro.html';
                } else if (data.estado === "error_actualizacion") {
                    Swal.fire('Error', 'Parece que hubo un error', 'error');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                Swal.fire('Error', 'Parece que hubo un error', 'error');
            });
        }
        else{
            Swal.fire('Error', 'Las contraseña no coinciden', 'error');
        }
    }
    else{
        Swal.fire('Error', 'Llena los campos', 'error');
    }
}

function registrarAdministrador() {
    let nombres = document.getElementById("nombre").value;
    let apellidos = document.getElementById("apellido").value;
    let correo = document.getElementById("email").value;
    let contrasenia = document.getElementById("contra").value;
    if(nombres && apellidos && correo && contrasenia){
            var hash = CryptoJS.MD5(contrasenia);
            fetch("http://localhost/SistemaWeb-Aerolinea/backend/registroAdmi.php", {
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
                    window.location.href= 'http://localhost/SistemaWeb-Aerolinea/public/index.html';
                } else if (data.estado === "error_registro") {
                    Swal.fire('Error', 'Ya existe un usuario con ese correo electrónico', 'error');
                }
            })
            .catch(error => {
                console.error('Error en la solicitud:', error);
                Swal.fire('Error', 'Estás seguro que no tienes una cuenta?', 'error');
            });
        }
        else{
            Swal.fire('Error', 'Llene todos los campos', 'error');
        }
}



function audi(correo){
    const ahora = new Date().toString();
    fetch("http://localhost/SistemaWeb-Aerolinea/backend/audi.php", {
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