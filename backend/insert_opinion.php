<?php
include_once(__DIR__ . '/config/cors.php');
session_start();
header('Content-Type: application/json');

$host = 'localhost';
$port = '5432';
$dbname = 'aerolinea';
$user = 'postgres';
$password = 'admin';

// Realizar la conexión a la base de datos
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo json_encode(["success" => false, "error" => "Error: No se pudo conectar a la base de datos."]);
    exit;
}

// Verificar si existe una sesión y obtener el correo del usuario
if (!isset($_SESSION['correo_usuario'])) {
    echo json_encode(["success" => false, "error" => "No hay una sesión iniciada."]);
    exit;
}

$correo_usuario = $_SESSION['correo_usuario'];
$nombres_usuario = $_SESSION['nombres_usuario'] ;
$apellidos_usuario = $_SESSION['apellidos_usuario'] ;

// Obtener el JSON de la solicitud
$data = json_decode(file_get_contents('php://input'), true);
$comentario = $data['comentario'];
$estrellas = $data['estrellas'];

if (empty($comentario) || empty($estrellas)) {
    echo json_encode(["success" => false, "error" => "Datos incompletos."]);
    exit;
}




// Insertar la opinión en la base de datos
$query_insert = "INSERT INTO opiniones (correo_usuario,nombres_usuario,apellidos_usuario, comentario, estrellas, fecha_opinion) VALUES ('$correo_usuario','$nombres_usuario','$apellidos_usuario', '$comentario', $estrellas, NOW())";
$result_insert = pg_query($conn, $query_insert);

if (!$result_insert) {
    echo json_encode(["success" => false, "error" => "Error al insertar la opinión."]);
    exit;
}

echo json_encode(["success" => true]);

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
