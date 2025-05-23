<?php
include_once(__DIR__ . '/config/cors.php');
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);
$username = $data->username;

// Escapar el valor de $username para evitar inyección SQL
$username = pg_escape_string($username);
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$sql = "SELECT * FROM usuarios WHERE correo_usuario = '$username'";
$resultado = pg_query($conexion, $sql);

if ($resultado && pg_num_rows($resultado) == 0) {
    $response = array('estado' => 'cuenta_nueva');
    echo json_encode($response);
} else {
    $response = array('estado' => 'cuenta_existente');
    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>
