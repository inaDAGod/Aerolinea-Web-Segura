<?php
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  die('Error de conexión.');
}

$resultado = pg_query($conexion, "SELECT rol, accesos FROM roles");
$roles = [];

while ($row = pg_fetch_assoc($resultado)) {
  $roles[] = $row;
}

echo json_encode($roles);
?>
