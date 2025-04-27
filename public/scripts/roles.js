function fetchRoles() {
    fetch('http://localhost/Aerolinea-Web-Segura/backend/fetch_roles.php')
        .then(response => response.json())
        .then(data => {
            renderRoles(data);
        })
        .catch(error => console.error('Error:', error));
}

function renderRoles(roles) {
    const container = document.getElementById('rolesContainer');
    container.innerHTML = '';

    if (roles.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay roles registrados.</div>';
        return;
    }

    const table = document.createElement('table');
    table.className = 'table table-striped';

    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Rol</th>
            <th>Accesos</th>
        </tr>
    `;
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    roles.forEach(role => {
        const accesosHtml = Object.entries(role.accesos).map(([permiso, valor]) => {
            const badgeClass = valor ? 'badge-success' : 'badge-danger';
            const badgeText = valor ? 'Permitido' : 'Denegado';
            return `<span class="badge ${badgeClass} mr-1">${permiso}: ${badgeText}</span>`;
        }).join(' ');

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${role.rol}</td>
            <td>${accesosHtml}</td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

function agregarRol() {
    // Aquí puedes abrir un modal o redirigir a un formulario de creación de roles
    alert('Función para agregar un nuevo rol (pendiente de implementar)');
}

// Ejecutamos fetchRoles apenas se cargue la página
window.onload = fetchRoles;
