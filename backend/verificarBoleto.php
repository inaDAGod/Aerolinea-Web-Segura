<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
$conexion = pg_connect("host=localhost dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$carnet = $_POST['carnet'] ?? '';
$cvuelo = $_POST['cvuelo'] ?? '';

// Consulta para verificar si ya existe el boleto
$query = "SELECT * FROM boletos WHERE ci_persona = $1 AND cvuelo = $2";
$result = pg_prepare($conexion, "verificar_boleto", $query);
$result = pg_execute($conexion, "verificar_boleto", array($carnet, $cvuelo));

if ($result && pg_num_rows($result) > 0) {
    echo json_encode(['existe' => true]); // El boleto ya existe
} else {
    echo json_encode(['existe' => false]); // El boleto no existe
}

pg_close($conexion);
?>
