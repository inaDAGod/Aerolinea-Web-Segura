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
$currentPassword = isset($data->currentPassword) ? $data->currentPassword : null;

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al conectar a la base de datos']);
    exit;
}

// Solo validar la contraseña actual si se proporciona (cambio normal, no restauración)
if ($currentPassword !== null) {
    $sql_check_current = "SELECT contraseña FROM usuarios WHERE correo_usuario = '$username'";
    $result_check_current = pg_query($conexion, $sql_check_current);

    if (pg_num_rows($result_check_current) === 0) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'Usuario no encontrado']);
        pg_close($conexion);
        exit;
    }

    $row = pg_fetch_assoc($result_check_current);
    if ($row['contraseña'] !== $currentPassword) {
        echo json_encode(['estado' => 'error', 'mensaje' => 'La contraseña actual es incorrecta']);
        pg_close($conexion);
        exit;
    }

    // Guardar contraseña actual en historial
    $sql_save_current = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                         VALUES ('$currentPassword', NOW(), '$username')";
    pg_query($conexion, $sql_save_current);
}

// Verificar si la nueva contraseña ya fue usada recientemente
$sql_check_history = "SELECT 1 FROM historial_passwords 
                      WHERE correo_usuario = '$username' 
                      AND password = '$newPassword'
                      AND fecha_uso >= (NOW() - INTERVAL '3 months')
                      LIMIT 1";
$result_check_history = pg_query($conexion, $sql_check_history);

if (pg_num_rows($result_check_history) > 0) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'No puedes reutilizar una contraseña usada en los últimos 3 meses']);
    pg_close($conexion);
    exit;
}

// Actualizar contraseña
$sql_update = "UPDATE usuarios SET contraseña = '$newPassword', password_last_date = NOW() 
               WHERE correo_usuario = '$username'";
$result_update = pg_query($conexion, $sql_update);

if ($result_update) {
    // Guardar nueva contraseña en historial
    $sql_save_new = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                     VALUES ('$newPassword', NOW(), '$username')";
    pg_query($conexion, $sql_save_new);

    echo json_encode(['estado' => 'contraseña_cambiada', 'mensaje' => 'Contraseña cambiada con éxito']);
} else {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al actualizar la contraseña']);
}

pg_close($conexion);
?>
