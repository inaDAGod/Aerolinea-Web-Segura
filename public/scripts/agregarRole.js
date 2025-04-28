document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost/Aerolinea-Web-Segura/backend/getPermisos.php')
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
      
      const permisos = document.querySelectorAll('#permissionsContainer input[type="checkbox"]');
      const accesosSeleccionados = {};
    
      permisos.forEach(checkbox => {
        accesosSeleccionados[checkbox.value] = checkbox.checked;
      });
    
      fetch('http://localhost/Aerolinea-Web-Segura/backend/addRole.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rol, accesos: accesosSeleccionados })
      })
      .then(response => response.text())
      .then(result => {
        alert(result);
        window.location.href = 'roles.html';
      });
    });
    
});
