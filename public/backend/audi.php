<?php
include_once(__DIR__ . '/config/cors.php');
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

$correo = $data->correo;
$fecha = $data->fecha;


header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
$sql = "INSERT INTO audi VALUES ('$correo', '$fecha')";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    $response = array('estado' => 'registro_exitoso');
    echo json_encode($response);
} else {
    $response = array('estado' => 'error_registro');

    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>