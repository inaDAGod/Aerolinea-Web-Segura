<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

$nombres = $data->nombres;
$apellidos = $data->apellidos;
$username = $data->username;
$password = $data->password;


$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

$sql = "INSERT INTO usuarios (correo_usuario, contraseña, nombres_usuario, apellidos_usuario, tipo_usuario, millas) VALUES ('$username', '$password', '$nombres', '$apellidos', 'cliente', 0)";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
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