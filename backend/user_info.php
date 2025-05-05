<?php
include_once(__DIR__ . '/config/cors.php');
session_start();
$host = 'localhost';
$port = '5432';
$dbname = 'aerolinea';
$user = 'postgres';
$password = 'admin';

// Realizar la conexión a la base de datos
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo json_encode(["error" => "Error: No se pudo conectar a la base de datos."]);
    exit;
}

// Verificar si existe una sesión y obtener el correo del usuario
if (isset($_SESSION['correo_usuario'])) {
    $correo_usuario = $_SESSION['correo_usuario'];

    // Consulta para obtener los datos del usuario
    $query_user = "SELECT nombres_usuario, apellidos_usuario, correo_usuario, millas FROM usuarios WHERE correo_usuario='$correo_usuario'";
    $result_user = pg_query($conn, $query_user);

    if (!$result_user) {
        echo json_encode(["error" => "Error en la consulta de datos del usuario."]);
        exit;
    }

    $row_user = pg_fetch_assoc($result_user);
    echo json_encode($row_user);
} else {
    echo json_encode(["error" => "No hay una sesión iniciada."]);
}

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
