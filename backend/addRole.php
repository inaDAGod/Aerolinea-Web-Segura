<?php
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  die('Error de conexión.');
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);
$accesos = pg_escape_string(json_encode($data['accesos'], JSON_UNESCAPED_UNICODE)); // encode properly

$sql = "INSERT INTO roles (rol, accesos) VALUES ('$rol', '$accesos')";

if (pg_query($conexion, $sql)) {
  echo "Rol agregado exitosamente.";
} else {
  echo "Error al agregar rol.";
}
?>
