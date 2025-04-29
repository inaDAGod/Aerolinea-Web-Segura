<?php
session_start();

// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

// Validar datos de entrada
if (!$data || !isset($data->username) || !isset($data->newPassword) || !isset($data->currentPassword)) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Datos incompletos']);
    exit;
}

$username = $data->username;
$currentPassword = $data->currentPassword;
$newPassword = $data->newPassword;

// Conexión a la base de datos
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al conectar a la base de datos']);
    exit;
}

// 1. Verificar contraseña actual
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

// 2. Verificar si la nueva contraseña ha sido usada recientemente
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

// 3. Guardar la contraseña actual en el historial antes de cambiarla
$sql_save_history = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                    VALUES ('$currentPassword', NOW(), '$username')";
if (!pg_query($conexion, $sql_save_history)) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'Error al guardar el historial de contraseña']);
    pg_close($conexion);
    exit;
}

// 4. Actualizar la contraseña
$sql_update = "UPDATE usuarios SET contraseña = '$newPassword', password_last_date = NOW() 
              WHERE correo_usuario = '$username'";
$result_update = pg_query($conexion, $sql_update);

if ($result_update) {
    // 5. Guardar la nueva contraseña en el historial
    $sql_save_new = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                    VALUES ('$newPassword', NOW(), '$username')";
    pg_query($conexion, $sql_save_new);
    
    echo json_encode([
        'estado' => 'contraseña_cambiada', 
        'mensaje' => 'Contraseña cambiada con éxito'
    ]);
} else {
    echo json_encode([
        'estado' => 'error', 
        'mensaje' => 'Error al actualizar la contraseña en la base de datos'
    ]);
}

// Cerrar la conexión
pg_close($conexion);
?>