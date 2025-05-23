<?php
include_once(__DIR__ . '/config/cors.php');
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
$sql = "INSERT INTO usuarios (correo_usuario, contraseña, nombres_usuario, apellidos_usuario, tipo_usuario, millas, password_last_date) VALUES ('$username', '$password', '$nombres', '$apellidos', 'cliente', 0, NOW())";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    // Guardar en el historial de contraseñas
    $sql_historial = "INSERT INTO historial_passwords (password, fecha_uso, correo_usuario) 
                      VALUES ('$password', NOW(), '$username')";
    pg_query($conexion, $sql_historial);
    
    $response = array('estado' => 'registro_exitoso');
    $_SESSION['correo_usuario'] =$username;
    $_SESSION['tipo_usuario'] = 'cliente';
    $_SESSION['nombres_usuario'] =$nombres;
    $_SESSION['apellidos_usuario'] = $apellidos;
    $_SESSION['millas'] =0;
    echo json_encode($response);
} else {
    $response = array('estado' => 'error_registro');

    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>