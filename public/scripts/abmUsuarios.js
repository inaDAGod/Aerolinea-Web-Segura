const URL_API = "http://localhost/Aerolinea-Web-Segura/backend/users_management/";

document.addEventListener("DOMContentLoaded", () => {
  cargarUsuarios();
});

function cargarUsuarios() {
  fetch(`${URL_API}obtenerUsuarios.php`)
    .then(res => res.json())
    .then(data => {
      const tabla = document.getElementById("tablaUsuarios");
      tabla.innerHTML = "";
      data.forEach(user => {
        const fila = `
          <tr>
            <td>${user.user_id}</td>
            <td>${user.correo_usuario}</td>
            <td>${user.nombres_usuario}</td>
            <td>${user.apellidos_usuario}</td>
            <td>${user.rol}</td>
            <td>${user.activo ? 'Sí' : 'No'}</td>
            <td>
              <button class="btn btn-sm btn-warning" onclick="editarUsuario('${user.correo_usuario}')">Editar</button>
              <button class="btn btn-sm btn-danger" onclick="eliminarUsuario('${user.correo_usuario}')">Eliminar</button>
            </td>
          </tr>`;
        tabla.innerHTML += fila;
      });
    });
}

function editarUsuario(correo) {
  fetch(`${URL_API}obtenerUsuario.php?correo_usuario=${correo}`)
    .then(res => res.json())
    .then(data => {
      Swal.fire({
        title: "Editar Usuario",
        html: `
          <input id="swal-nombre" class="swal2-input" placeholder="Nombres" value="${data.nombres_usuario}">
          <input id="swal-apellido" class="swal2-input" placeholder="Apellidos" value="${data.apellidos_usuario}">
          <input id="swal-correo" class="swal2-input" placeholder="Correo" value="${data.correo_usuario}">
          <select id="swal-rol" class="swal2-input"></select>
        `,
        didOpen: () => {
          // Cargar roles una vez que el modal esté abierto
          fetch('http://localhost/Aerolinea-Web-Segura/backend/fetch_roles.php')
            .then(response => response.json())
            .then(roles => {
              const selectRol = document.getElementById('swal-rol');
              roles.forEach(rol => {
                const option = document.createElement('option');
                option.value = rol.rol;
                option.textContent = rol.rol;
                if (rol.rol === data.rol) {
                  option.selected = true;
                }
                selectRol.appendChild(option);
              });
            })
            .catch(error => console.error('Error al cargar roles:', error));
        },
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        preConfirm: () => {
          const updateData = {
            correo_usuario: correo,
            nuevo_correo: document.getElementById("swal-correo").value,
            nombres_usuario: document.getElementById("swal-nombre").value,
            apellidos_usuario: document.getElementById("swal-apellido").value,
            rol: document.getElementById("swal-rol").value,
            tipo_usuario: data.tipo_usuario,
            millas: data.millas,
            activo: data.activo,
            password_last_date: data.password_last_date
          };

          return fetch(`${URL_API}editarUsuario.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
          })
            .then(res => res.json())
            .catch(err => {
              Swal.showValidationMessage("Error al actualizar el usuario");
              console.error(err);
            });
        }
      }).then(result => {
        if (result.isConfirmed) {
          Swal.fire("¡Actualizado!", "Usuario modificado correctamente", "success");
          cargarUsuarios();
        }
      });
    });
}

function eliminarUsuario(correo) {
  Swal.fire({
    title: "¿Eliminar usuario?",
    text: "Esto marcará al usuario como inactivo",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar"
  }).then(result => {
    if (result.isConfirmed) {
      fetch(`${URL_API}eliminarUsuarioLogico.php?correo_usuario=${correo}`)
        .then(res => res.json())
        .then(resp => {
          Swal.fire("Hecho", resp.mensaje || "Usuario eliminado", "success");
          cargarUsuarios();
        });
    }
  });
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("apellido").value = "";
  document.getElementById("email").value = "";
  document.getElementById("contra").value = "";
  document.getElementById("selectRol").value = "";
  document.getElementById("correoOriginal").value = "";
}