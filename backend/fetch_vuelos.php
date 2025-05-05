<?php
include_once(__DIR__ . '/config/cors.php');
$dbname = "aerolinea";
$user = "postgres";
$password = "admin";

// Crear la conexión
$conn = pg_connect("dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Conexión fallida: " . pg_last_error());
}

$sql = "SELECT cvuelo, fecha_vuelo, origen, destino, costovip, costoeco, costobusiness FROM vuelos";
$result = pg_query($conn, $sql);

if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}

$vuelos = array();

while ($row = pg_fetch_assoc($result)) {
    $vuelos[] = $row;
}

pg_free_result($result);
pg_close($conn);

echo json_encode($vuelos);
?>