<?php
include_once(__DIR__ . '/config/cors.php');
session_start(); 
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$carnet = $_POST['carnet'] ?? '';
$cvuelo = $_POST['cvuelo'] ?? '';

// Consulta para verificar si ya existe el boleto
$correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$query = "SELECT * FROM boletos WHERE ci_persona = $1 AND cvuelo = $2";
$result = pg_prepare($conexion, "verificar_boleto", $query);
$result = pg_execute($conexion, "verificar_boleto", array($carnet, $cvuelo));

if ($result && pg_num_rows($result) > 0) {
    $mensaje = "Se verificó la existencia de un boleto para el pasajero con CI $carnet en el vuelo $cvuelo";
    echo json_encode(['existe' => true]); // El boleto ya existe
} else {
    $mensaje = "NO existe un boleto para el pasajero con CI $carnet en el vuelo $cvuelo.";
    echo json_encode(['existe' => false]); // El boleto no existe
}
// Registrar en log_app si hay sesión iniciada
if (isset($_SESSION['correo_usuario'])) {
    $correo = $_SESSION['correo_usuario'];
    $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
    pg_query_params($conexion, $sqlLog, [$correo, $mensaje]);
}

pg_close($conexion);
?>
