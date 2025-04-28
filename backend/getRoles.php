<?php
$dbname = "aerolinea";
$user = "postgres";
$password = "admin";

$conn = pg_connect("dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Conexión fallida: " . pg_last_error());
}

$rol = $_GET['rol'];

$sql = "SELECT rol, accesos FROM roles WHERE rol = $1";
$result = pg_query_params($conn, $sql, array($rol));

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
