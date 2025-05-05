<?php
include_once(__DIR__ . '/config/cors.php');
$dbname = "aerolinea";
$user = "postgres";
$password = "admin";

$conn = pg_connect("dbname=$dbname user=$user password=$password");

if (!$conn) {
    die("Conexión fallida: " . pg_last_error());
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = $data['rol'];
$rolNuevo = $data['rolNuevo'];
$accesos = json_encode($data['accesos']);

$sql = "UPDATE roles SET rol = $1, accesos = $2 WHERE rol = $3";
$result = pg_query_params($conn, $sql, array($rolNuevo, $accesos, $rol));

if (!$result) {
    die("Error en la consulta: " . pg_last_error());
}

pg_close($conn);

echo "Rol actualizado con éxito.";
?>
