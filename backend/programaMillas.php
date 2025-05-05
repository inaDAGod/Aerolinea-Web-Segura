<?php
include_once(__DIR__ . '/config/cors.php');
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

$correo = $data->correo;

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

$sql = "SELECT aumentar_millas('$correo');";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    $response = array('estado' => 'llamado_exitoso');
    echo json_encode($response);
} else {
    $response = array('estado' => 'error_llamado');

    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>