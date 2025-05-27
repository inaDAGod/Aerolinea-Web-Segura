<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');

session_start();

$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data || !isset($data->username) || !isset($data->newPassword)) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Datos incompletos']);
    exit;
}

$username = $data->username;
$newPassword = $data->newPassword;

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al conectar a la base de datos']);
    exit;
}

// Verificar que la nueva no haya sido usada recientemente
$sql_check_history = "SELECT password FROM historial_passwords 
                      WHERE correo_usuario = $1 
                      AND fecha_uso >= (NOW() - INTERVAL '3 months')";
$result_check_history = pg_query_params($conexion, $sql_check_history, [$username]);

while ($row = pg_fetch_assoc($result_check_history)) {
    if (password_verify($newPassword, $row['password'])) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'No puedes reutilizar una contraseña usada en los últimos 3 meses']);
        pg_close($conexion);
        exit;
    }
}

// Hashear nueva contraseña
$hash_nueva = password_hash($newPassword, PASSWORD_BCRYPT);

// Actualizar usuario
$sql_update = "UPDATE usuarios SET contraseña = $1, password_last_date = NOW() WHERE correo_usuario = $2";
$result_update = pg_query_params($conexion, $sql_update, [$hash_nueva, $username]);

if ($result_update) {
    // Guardar en historial
    $sql_save_new = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                     VALUES ($1, NOW(), $2)";
    pg_query_params($conexion, $sql_save_new, [$hash_nueva, $username]);

    echo json_encode(['estado' => 'contraseña_cambiada', 'mensaje' => 'Contraseña cambiada con éxito']);
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al actualizar la contraseña']);
}

pg_close($conexion);
?>
