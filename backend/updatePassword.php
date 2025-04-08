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

// Actualizar la contraseña del usuario
$sql = "UPDATE usuarios SET contraseña = '$newPassword' WHERE correo_usuario = '$username'";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    // Si se actualiza correctamente, enviar una respuesta indicando que la contraseña ha sido cambiada
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
