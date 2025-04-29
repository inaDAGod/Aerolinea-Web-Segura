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

function crearUsuario() {
  const nombres = document.getElementById("nombre").value;
  const apellidos = document.getElementById("apellido").value;
  const correo = document.getElementById("email").value;
  const password = document.getElementById("contra").value;
  const rol = document.getElementById("selectRol").value;

  const data = {
    correo_usuario: correo,
    contraseña: password,
    nombres_usuario: nombres,
    apellidos_usuario: apellidos,
    tipo_usuario: "normal",
    millas: 0,
    rol: rol,
    activo: 1,
    password_last_date: new Date().toISOString().split('T')[0]
  };

  fetch(`${URL_API}crearUsuario.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
    .then(res => res.json())
    .then(resp => {
      Swal.fire("Éxito", resp.mensaje || "Usuario registrado", "success");
      cargarUsuarios();
      limpiarFormulario();
    })
    .catch(() => Swal.fire("Error", "No se pudo registrar", "error"));
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
          <input id="swal-contra" type="password" class="swal2-input" placeholder="Contraseña" value="${data.contraseña}">
          <select id="swal-rol" class="swal2-input">
            <option value="admin" ${data.rol === 'admin' ? 'selected' : ''}>Administrador</option>
            <option value="usuario" ${data.rol === 'usuario' ? 'selected' : ''}>Usuario</option>
          </select>
        `,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: "Guardar cambios",
        preConfirm: () => {
          const updateData = {
            correo_usuario: correo, // original
            nuevo_correo: document.getElementById("swal-correo").value,
            nombres_usuario: document.getElementById("swal-nombre").value,
            apellidos_usuario: document.getElementById("swal-apellido").value,
            contraseña: document.getElementById("swal-contra").value,
            rol: document.getElementById("swal-rol").value,
            tipo_usuario: data.tipo_usuario,
            millas: data.millas,
            activo: data.activo,
            password_last_date: new Date().toISOString().split('T')[0]
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