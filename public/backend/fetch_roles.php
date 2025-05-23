<?php
include_once(__DIR__ . '/config/cors.php');
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
$sql = "SELECT rol, accesos FROM roles";
$result = pg_query($conn, $sql);

if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}

$roles = array();

while ($row = pg_fetch_assoc($result)) {
    $row['accesos'] = json_decode($row['accesos'], true);
    $roles[] = $row;
}

pg_free_result($result);
pg_close($conn);

echo json_encode($roles);
?>
