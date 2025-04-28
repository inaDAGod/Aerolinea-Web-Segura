document.addEventListener('DOMContentLoaded', () => {
  // Obtener el rol de la URL (parametro "rol")
  const urlParams = new URLSearchParams(window.location.search);
  const rol = urlParams.get('rol');

  // Fetch de permisos y del rol a editar
  fetch('http://localhost/Aerolinea-Web-Segura/backend/getPermisos.php')
    .then(response => response.json())
    .then(permisos => {
      const permisosContainer = document.getElementById('permisosContainer');
      permisos.forEach(acceso => {
        permisosContainer.innerHTML += `
          <label>
            <input type="checkbox" value="${acceso}"> ${acceso}
          </label><br>
        `;
      });

      // Fetch del rol para editar
      fetch(`http://localhost/Aerolinea-Web-Segura/backend/getRoles.php?rol=${rol}`)
        .then(response => response.json())
        .then(data => {
          const roleData = data[0]; // Suponiendo que el rol existe y es un arreglo de un solo objeto
          
          // Rellenar los campos con los datos del rol
          document.getElementById('nombreRol').value = roleData.rol;
          
          // Marcar los checkboxes correspondientes
          const checkboxes = document.querySelectorAll('#permisosContainer input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
            if (roleData.accesos[checkbox.value]) {
              checkbox.checked = true;
            }
          });
        });
    });

  // Guardar cambios
  document.getElementById('formEditarRol').addEventListener('submit', function(e) {
    e.preventDefault();

    const rolNuevo = document.getElementById('nombreRol').value.trim();
    
    const permisos = document.querySelectorAll('#permisosContainer input[type="checkbox"]');
    const accesosSeleccionados = {};
    
    permisos.forEach(checkbox => {
      accesosSeleccionados[checkbox.value] = checkbox.checked;
    });

    // Enviar los cambios al backend
    fetch('http://localhost/Aerolinea-Web-Segura/backend/updateRole.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rol: rol, rolNuevo: rolNuevo, accesos: accesosSeleccionados })
    })
    .then(response => response.text())
    .then(result => {
      alert(result);
      window.location.href = 'roles.html'; // Redirigir después de guardar cambios
    });
  });
});
