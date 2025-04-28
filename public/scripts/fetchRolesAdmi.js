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
