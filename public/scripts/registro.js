function toggleForm() {
  var registroForm = document.getElementById('registro');
  var inicioSesionForm = document.getElementById('inicio-sesion');

  // Verificar si el formulario de registro está visible
  if (registroForm.style.display === 'block') {
    // Si está visible, ocultarlo y mostrar el formulario de inicio de sesión
    registroForm.style.display = 'none';
    inicioSesionForm.style.display = 'block';
  } else {
    // Si no está visible, mostrar el formulario de registro y ocultar el formulario de inicio de sesión
    registroForm.style.display = 'block';
    inicioSesionForm.style.display = 'none';
  }
}

function toggleFormVeri() {
      var registroForm = document.getElementById('registro');
      var veriForm = document.getElementById('verificacion');
      registroForm.style.display = 'none';
      veriForm.style.display= 'block';
}
function toggleFormRes(){
  var inicioSesionForm = document.getElementById('inicio-sesion');
  var resForm = document.getElementById('restauracion');
  resForm.style.display= 'block';
  inicioSesionForm.style.display = 'none';
 
}
function toggleFormRes2(){
  var resForm = document.getElementById('restauracion2');
  var resForm2 = document.getElementById('restaurarContra');
  resForm2.style.display= 'block';
  resForm.style.display = 'none';
 
}
function toggleFormRes3(){
  var resForm = document.getElementById('restauracion');
  var resForm2 = document.getElementById('restauracion2');
  resForm2.style.display= 'block';
  resForm.style.display = 'none';
 
}

function togglePassword(inputId, iconId) {
  const input = document.getElementById(inputId);
  const icon = document.getElementById(iconId);

  if (input.type === 'password') {
    input.type = 'text';
    icon.classList.remove('bx-hide');
    icon.classList.add('bx-show');
  } else {
    input.type = 'password';
    icon.classList.remove('bx-show');
    icon.classList.add('bx-hide');
  }
}
