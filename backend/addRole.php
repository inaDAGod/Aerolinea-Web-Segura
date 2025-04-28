<?php
header('Content-Type: application/json'); // 👈 Aseguramos que responde JSON

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos.']);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);
$accesos = pg_escape_string(json_encode($data['accesos'], JSON_UNESCAPED_UNICODE)); // encode properly

$sql = "INSERT INTO roles (rol, accesos) VALUES ('$rol', '$accesos')";

if (pg_query($conexion, $sql)) {
  echo json_encode(['status' => 'success', 'message' => 'Rol agregado exitosamente.']);
} else {
  // Obtenemos el error de PostgreSQL
  $error = pg_last_error($conexion);
  echo json_encode(['status' => 'error', 'message' => 'Error al agregar rol: ' . ($error ?: 'Error desconocido.')]);
}
?>
