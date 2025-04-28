<?php
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  die('Error de conexión.');
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);

$sql = "DELETE FROM roles WHERE rol = '$rol'";

if (pg_query($conexion, $sql)) {
  echo "Rol eliminado exitosamente.";
} else {
  echo "Error al eliminar rol.";
}
?>
