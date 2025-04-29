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
      document.getElementById("nombre").value = data.nombres_usuario;
      document.getElementById("apellido").value = data.apellidos_usuario;
      document.getElementById("email").value = data.correo_usuario;
      document.getElementById("selectRol").value = data.rol;
      document.getElementById("contra").value = data.contraseña;

      Swal.fire({
        title: "Editar Usuario",
        text: "Al guardar se actualizarán los datos.",
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Guardar cambios"
      }).then(result => {
        if (result.isConfirmed) {
          const updateData = {
            correo_usuario: data.correo_usuario,
            nombres_usuario: document.getElementById("nombre").value,
            apellidos_usuario: document.getElementById("apellido").value,
            contraseña: document.getElementById("contra").value,
            rol: document.getElementById("selectRol").value,
            tipo_usuario: data.tipo_usuario,
            activo: data.activo,
            password_last_date: new Date().toISOString().split('T')[0]
          };

          fetch(`${URL_API}editarUsuario.php`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updateData)
          })
          .then(res => res.json())
          .then(resp => {
            Swal.fire("Actualizado", resp.mensaje || "Usuario modificado", "success");
            cargarUsuarios();
          });
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
}

