<?php
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  die('Error de conexión.');
}

$rol = pg_escape_string($_GET['rol']);

$sql = "SELECT * FROM roles WHERE rol = '$rol'";
$result = pg_query($conexion, $sql);

if (pg_num_rows($result) > 0) {
  echo json_encode(pg_fetch_assoc($result));
} else {
  echo json_encode(['error' => 'Rol no encontrado']);
}
?>
