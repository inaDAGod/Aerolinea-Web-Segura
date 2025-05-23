<?php


include_once(__DIR__ . '/config/cors.php');
session_start();
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
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
