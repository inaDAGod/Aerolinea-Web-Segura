document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const roleName = urlParams.get('rol');
  
    document.getElementById('currentRoleName').value = roleName;
  
    fetch('http://localhost/Aerolinea-Web-Segura/backend/getPermisos.php')
      .then(response => response.json())
      .then(permisosDisponibles => {
        fetch('http://localhost/Aerolinea-Web-Segura/backend/getRoleById.php?nombre=' + encodeURIComponent(roleName))
          .then(response => response.json())
          .then(roleData => {
            const container = document.getElementById('editPermissionsContainer');
            const permisosActuales = roleData.permisos.split(',').map(p => p.trim());
  
            permisosDisponibles.forEach(permiso => {
              container.innerHTML += `
                <label>
                  <input type="checkbox" value="${permiso}" ${permisosActuales.includes(permiso) ? 'checked' : ''}> ${permiso}
                </label><br>
              `;
            });
  
            document.getElementById('newRoleName').value = roleData.nombre;
          });
      });
  
    document.getElementById('editRoleForm').addEventListener('submit', function(e) {
      e.preventDefault();
  
      const nombreActual = document.getElementById('currentRoleName').value;
      const nombreNuevo = document.getElementById('newRoleName').value.trim();
      const permisosSeleccionados = Array.from(document.querySelectorAll('#editPermissionsContainer input:checked'))
        .map(checkbox => checkbox.value)
        .join(', ');
  
      fetch('http://localhost/Aerolinea-Web-Segura/backend/updateRole.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombreActual, nombreNuevo, permisos: permisosSeleccionados })
      })
      .then(response => response.text())
      .then(result => {
        alert(result);
        window.location.href = 'admmain.html';
      });
    });
  });
  