<?php
include_once(__DIR__ . '/config/cors.php');
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$sql = "SELECT copinion, fecha_opinion, correo_usuario, nombres_usuario, apellidos_usuario, comentario, estrellas 
        FROM opiniones 
        ORDER BY fecha_opinion DESC"; // Ordenar por fecha en orden descendente
$result = pg_query($conn, $sql);

if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}

$opiniones = array();

while ($row = pg_fetch_assoc($result)) {
    $opiniones[] = $row;
}

pg_free_result($result);
pg_close($conn);

echo json_encode($opiniones);
?>
