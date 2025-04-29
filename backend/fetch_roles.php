<?php
header("Access-Control-Allow-Origin: *"); //si subimos a un servidor, cambiar el * por la url de la app
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$dbname = "aerolinea";
$user = "postgres";
$password = "admin";

$conn = pg_connect("dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Conexión fallida: " . pg_last_error());
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
