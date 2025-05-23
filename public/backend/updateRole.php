<?php
include_once(__DIR__ . '/config/cors.php');
session_start(); 
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
$data = json_decode(file_get_contents('php://input'), true);

$rol = $data['rol'];
$rolNuevo = $data['rolNuevo'];
$accesos = json_encode($data['accesos']);

$sql = "UPDATE roles SET rol = $1, accesos = $2 WHERE rol = $3";
$result = pg_query_params($conn, $sql, array($rolNuevo, $accesos, $rol));

if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}
// Registrar log si hay sesión activa
if (isset($_SESSION['correo_usuario'])) {
    $correo_usuario = $_SESSION['correo_usuario'];
    $mensaje = "Edición de roles realizada con éxito.";

    $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
    $resultLog = pg_query_params($conn, $sqlLog, [$correo_usuario, $mensaje]);

    if (!$resultLog) {
        error_log("Error al insertar log de consulta de roles: " . pg_last_error($conn));
    }
}
pg_close($conn);

echo "Rol actualizado con éxito.";
?>
