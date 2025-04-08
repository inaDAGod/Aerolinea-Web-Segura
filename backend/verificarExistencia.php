<?php
// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);
$username = $data->username;

// Escapar el valor de $username para evitar inyección SQL
$username = pg_escape_string($username);

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
}

$sql = "SELECT * FROM usuarios WHERE correo_usuario = '$username'";
$resultado = pg_query($conexion, $sql);

if ($resultado && pg_num_rows($resultado) == 0) {
    $response = array('estado' => 'cuenta_nueva');
    echo json_encode($response);
} else {
    $response = array('estado' => 'cuenta_existente');
    echo json_encode($response);
}

// Cerrar la conexión
pg_close($conexion);
?>
