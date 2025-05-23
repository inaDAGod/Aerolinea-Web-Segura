document.addEventListener('DOMContentLoaded', () => {
  fetch('/backend/getPermisos.php')
    .then(response => response.json())
    .then(accesos => {
      const container = document.getElementById('permissionsContainer');
      accesos.forEach(acceso => {
        container.innerHTML += `
          <label>
            <input type="checkbox" value="${acceso}"> ${acceso}
          </label><br>
        `;
      });
    });

  document.getElementById('addRoleForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const rol = document.getElementById('roleName').value.trim();

    if (!rol) {
      Swal.fire('Error', 'Por favor ingrese un nombre de rol.', 'error');
      return;
    }

    const permisos = document.querySelectorAll('#permissionsContainer input[type="checkbox"]');
    const accesosSeleccionados = {};

    permisos.forEach(checkbox => {
      accesosSeleccionados[checkbox.value] = checkbox.checked;
    });

    fetch('/backend/addRole.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rol, accesos: accesosSeleccionados })
    })
    .then(response => response.json())
    .then(result => {
      Swal.fire({
        title: result.status === 'success' ? 'Éxito' : 'Error',
        text: result.message,
        icon: result.status === 'success' ? 'success' : 'error'
      }).then(() => {
        if (result.status === 'success') {
          window.location.href = 'roles.html';
        }
      });
    })
    .catch(error => {
      console.error('Error al agregar rol:', error);
      Swal.fire('Error', 'Ocurrió un error inesperado.', 'error');
    });
  });
});
