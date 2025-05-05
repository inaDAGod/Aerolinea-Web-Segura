<?php
include_once(__DIR__ . '/config/cors.php');
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
  echo json_encode(["status" => "error", "message" => "Error de conexión."]);
  exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);
$accesos = pg_escape_string(json_encode($data['accesos'], JSON_UNESCAPED_UNICODE));

$sql = "INSERT INTO roles (rol, accesos) VALUES ('$rol', '$accesos')";

$resultado = @pg_query($conexion, $sql); // el @ oculta warnings

if ($resultado) {
  echo json_encode(["status" => "success", "message" => "Rol agregado exitosamente."]);
} else {
  // Aquí verificamos si el error es por clave duplicada
  $error = pg_last_error($conexion);
  if (strpos($error, 'duplicate key value') !== false) {
    echo json_encode(["status" => "error", "message" => "El rol ya existe."]);
  } else {
    echo json_encode(["status" => "error", "message" => "Error al agregar rol."]);
  }
}
?>
