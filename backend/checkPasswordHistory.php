<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data || !isset($data->username) || !isset($data->password)) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Datos incompletos']);
    exit;
}

$username = $data->username;
$password = $data->password;

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error de conexión a BD']);
    exit;
}

// Traer todas las contraseñas hasheadas del usuario en los últimos 3 meses
$sql = "SELECT password, fecha_uso FROM historial_passwords 
        WHERE correo_usuario = $1 
        AND fecha_uso >= (NOW() - INTERVAL '3 months')";

$result = pg_query_params($conexion, $sql, [$username]);

if (!$result) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error en consulta']);
    pg_close($conexion);
    exit;
}

// Verificar cada hash
$password_ya_usada = false;
$fecha_uso = null;

while ($row = pg_fetch_assoc($result)) {
    if (password_verify($password, $row['password'])) {
        $password_ya_usada = true;
        $fecha_uso = $row['fecha_uso'];
        break;
    }
}

if ($password_ya_usada) {
    echo json_encode([
        'estado' => 'password_recently_used',
        'mensaje' => 'Esta contraseña fue usada en los últimos 3 meses',
        'ultimo_uso' => $fecha_uso
    ]);
} else {
    echo json_encode([
        'estado' => 'password_allowed',
        'mensaje' => 'Contraseña permitida'
    ]);
}

pg_close($conexion);
?>
