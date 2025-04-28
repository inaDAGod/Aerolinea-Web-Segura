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
            <th>Acciones</th> <!-- Nueva columna Acciones -->
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
            <td>
                <button class="btn btn-warning btn-sm mr-1" onclick="editarRol('${role.rol}')">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="borrarRol('${role.rol}')">Borrar</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    table.appendChild(tbody);
    container.appendChild(table);
}

function agregarRol() {
    alert('Función para agregar un nuevo rol (pendiente de implementar)');
}

// Aquí pones la lógica que quieras para editar y borrar
function editarRol(rol) {
    alert('Editar rol: ' + rol);
    // Aquí podrías abrir un modal de edición o redirigir a otra página
}

function borrarRol(rol) {
    if (confirm('¿Seguro que deseas borrar el rol "' + rol + '"?')) {
        // Aquí harías un fetch para borrar en el backend
        alert('Rol "' + rol + '" eliminado (simulación)');
    }
}

window.onload = fetchRoles;
