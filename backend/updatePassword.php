<?php
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);
$username = $data->username;
$newPassword = $data->newPassword;

// Conexión a la base de datos
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

$sql_check = "SELECT 1 FROM historial_passwords 
              WHERE correo_usuario = '$username' 
              AND password = '$newPassword'
              AND fecha_uso >= (NOW() - INTERVAL '3 months')
              LIMIT 1";
$result_check = pg_query($conexion, $sql_check);

if (pg_num_rows($result_check) > 0) {
    echo json_encode(['estado' => 'error', 'mensaje' => 'No puedes reutilizar una contraseña usada en los últimos 3 meses']);
    pg_close($conexion);
    exit;
}

$sql_historial = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                 SELECT contraseña, NOW(), correo_usuario FROM usuarios WHERE correo_usuario = '$username'";
pg_query($conexion, $sql_historial);

// Actualizar la contraseña del usuario
$sql = "UPDATE usuarios SET contraseña = '$newPassword', password_last_date = NOW() WHERE correo_usuario = '$username'";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    // Si se actualiza correctamente, enviar una respuesta indicando que la contraseña ha sido cambiada
    $sql_new_history = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                       VALUES ('$newPassword', NOW(), '$username')";
    pg_query($conexion, $sql_new_history);
    $response = array('estado' => 'contraseña_cambiada');
    echo json_encode($response);
} else {
    // Si hay algún error al actualizar, enviar una respuesta de error
    $response = array('estado' => 'error_actualizacion');
    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>
