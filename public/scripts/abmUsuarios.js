document.addEventListener("DOMContentLoaded", function () {
  obtenerUsuarios();
});

function obtenerUsuarios() {
  fetch("backend/users_management/obtenerUsuarios.php")
    .then(response => response.json())
    .then(data => {
      const tabla = document.querySelector("#tablaUsuarios tbody");
      tabla.innerHTML = ""; // Limpiar tabla
      data.forEach(usuario => {
        const fila = `
          <tr>
            <td>${usuario.correo_usuario}</td>
            <td>${usuario.nombres_usuario}</td>
            <td>${usuario.apellidos_usuario}</td>
            <td>${usuario.rol}</td>
            <td>
              <button onclick="editarUsuario('${usuario.correo_usuario}')">Editar</button>
              <button onclick="eliminarUsuario('${usuario.correo_usuario}')">Eliminar</button>
            </td>
          </tr>
        `;
        tabla.innerHTML += fila;
      });
    })
    .catch(err => console.error("Error cargando usuarios:", err));
}

function eliminarUsuario(correo) {
  if (confirm("¿Eliminar este usuario?")) {
    fetch(`backend/users_management/eliminarUsuarioLogico.php?correo_usuario=${correo}`)
      .then(response => response.json())
      .then(data => {
        alert(data.mensaje || data.error);
        obtenerUsuarios(); // Recargar lista
      });
  }
}

function editarUsuario(correo) {
  // Aquí puedes abrir un modal o cargar los datos al formulario
  alert("Editar función pendiente para: " + correo);
}
