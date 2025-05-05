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

// Verificar si se envió un ID válido para eliminar la opinión
if (isset($_GET['copinion'])) {
    $idOpinion = $_GET['copinion'];

    // Consulta para eliminar la opinión
    $query = "DELETE FROM opiniones WHERE  copinion = $idOpinion";
    $result = pg_query($conn, $query);

    if ($result) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Error al eliminar la opinión."]);
    }
} else {
    echo json_encode(["success" => false, "error" => "ID de opinión no proporcionado."]);
}

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
