<?php
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  die('Error de conexión.');
}

$data = json_decode(file_get_contents('php://input'), true);

$rolActual = pg_escape_string($data['rolActual']);
$rolNuevo = pg_escape_string($data['rolNuevo']);
$accesos = pg_escape_string($data['accesos']);

$sql = "UPDATE roles SET rol = '$rolNuevo', accesos = '$accesos' WHERE rol = '$rolActual'";

if (pg_query($conexion, $sql)) {
  echo "Rol actualizado exitosamente.";
} else {
  echo "Error al actualizar rol.";
}
?>
