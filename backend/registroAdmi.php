<?php
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

$nombres = $data->nombres;
$apellidos = $data->apellidos;
$username = $data->username;
$contraseña = $data->contraseña;
$rol = $data->rol;

// Nuevos campos
$tipo_usuario = 'administrador';
$millas = 0;

$activo = 1;    // 1 = activo, 0 = inactivo
$password_last_date = date('Y-m-d'); // fecha actual (formato YYYY-MM-DD)

// Conectar a la base de datos
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

// Insertar todos los datos
$sql = "INSERT INTO usuarios (correo_usuario, contraseña, nombres_usuario, apellidos_usuario, tipo_usuario, millas, rol, activo, password_last_date) 
        VALUES ('$username', '$contraseña', '$nombres', '$apellidos','administrador', 0, '$rol', $activo, '$password_last_date')";

$resultado = pg_query($conexion, $sql);

if ($resultado) {
    $response = array('estado' => 'registro_exitoso');
    echo json_encode($response);
} else {
    $response = array('estado' => 'error_registro');
    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>
