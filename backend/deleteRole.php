<?php
include_once(__DIR__ . '/config/cors.php');
session_start();
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
    die('Error de conexión.');
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);

$sql = "DELETE FROM roles WHERE rol = '$rol'";

$result = @pg_query($conexion, $sql); // el @ oculta warnings, controlamos nosotros el error abajo

if ($result) {
    // Insertar log solo si hay sesión activa
    if (isset($_SESSION['correo_usuario'])) {
        $correo_usuario = $_SESSION['correo_usuario'];
        $mensaje = "Rol eliminado: $rol";

        // Usamos consulta preparada para seguridad
        $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
        $resultLog = pg_query_params($conexion, $sqlLog, [$correo_usuario, $mensaje]);

        if (!$resultLog) {
            error_log("No se pudo insertar el log del rol eliminado: " . pg_last_error($conexion));
        }
    }
    echo json_encode(['status' => 'success', 'message' => 'Rol eliminado exitosamente.']);
} else {
    $error = pg_last_error($conexion);

    if (strpos($error, 'violates foreign key constraint') !== false) {
        echo json_encode(['status' => 'error', 'message' => 'No se puede eliminar el rol porque está en uso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se puede eliminar el rol porque está en uso.']);
    }
}
?>
