<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
// Validar entrada
$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data || !isset($data->username) || !isset($data->password)) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Datos incompletos']);
    exit;
}

$username = $data->username;
$password = $data->password;



// Consulta para verificar contraseñas recientes (últimos 3 meses)
$sql = "SELECT fecha_uso FROM historial_passwords 
        WHERE correo_usuario = $1 
        AND password = $2
        AND fecha_uso >= (NOW() - INTERVAL '3 months')
        LIMIT 1";

$result = pg_prepare($conexion, "check_pass", $sql);
$result = pg_execute($conexion, "check_pass", array($username, $password));

if (!$result) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error en consulta']);
    pg_close($conexion);
    exit;
}

if (pg_num_rows($result) > 0) {
    $row = pg_fetch_assoc($result);
    echo json_encode([
        'estado' => 'password_recently_used',
        'mensaje' => 'Esta contraseña fue usada en los últimos 3 meses',
        'ultimo_uso' => $row['fecha_uso']
    ]);
} else {
    echo json_encode([
        'estado' => 'password_allowed',
        'mensaje' => 'Contraseña permitida'
    ]);
}

pg_close($conexion);
?>