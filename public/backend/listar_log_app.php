<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
// Consulta SQL para obtener los registros del log
$sql = "SELECT correo_usuario, mensaje, fecha_hora FROM log_app";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    if (pg_num_rows($resultado) > 0) {
        $logs = array();
        while ($fila = pg_fetch_assoc($resultado)) {
            $logs[] = $fila;
        }
        echo json_encode($logs);
    } else {
        echo json_encode([]); // Sin registros
    }
} else {
    echo json_encode(["error" => "Error en la consulta"]);
}

pg_close($conexion);
?>
