<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);
$accesos = pg_escape_string(json_encode($data['accesos'], JSON_UNESCAPED_UNICODE));

$sql = "INSERT INTO roles (rol, accesos) VALUES ('$rol', '$accesos')";

$resultado = @pg_query($conexion, $sql); // el @ oculta warnings

if ($resultado) {
  // Insertar log solo si hay sesión activa
    if (isset($_SESSION['correo_usuario'])) {
        $correo_usuario = $_SESSION['correo_usuario'];
        $mensaje = "Nuevo rol creado: $rol";

        // Usamos consulta preparada para seguridad
        $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
        $resultLog = pg_query_params($conexion, $sqlLog, [$correo_usuario, $mensaje]);

        if (!$resultLog) {
            error_log("No se pudo insertar el log del nuevo rol: " . pg_last_error($conexion));
        }
    }
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
