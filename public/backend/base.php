<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

// Consulta para obtener los datos del usuario
$email = 'example@example.com'; // El correo del usuario que quieres mostrar
$query_user = "SELECT nombres_usuario, apellidos_usuario, correo_usuario, millas FROM usuarios WHERE correo_usuario='$email'";
$result_user = pg_query($conn, $query_user);

if (!$result_user) {
    echo "Error en la consulta de datos del usuario.\n";
    exit;
}

$row_user = pg_fetch_assoc($result_user);
echo "<pre>";
print_r($row_user);
echo "</pre>";

// Consulta para obtener los vuelos de la semana
$current_date = date('Y-m-d');
$end_of_week = date('Y-m-d', strtotime('+7 days'));
$query_week_flights = "SELECT * FROM vuelos WHERE fecha_vuelo BETWEEN '$current_date' AND '$end_of_week'";
$result_week_flights = pg_query($conn, $query_week_flights);

if (!$result_week_flights) {
    echo "Error en la consulta de vuelos de la semana.\n";
    exit;
}

$row_week_flights = pg_fetch_assoc($result_week_flights);
echo "<pre>";
print_r($row_week_flights);
echo "</pre>";

// Consulta para obtener las reservas
$query_reservations = "SELECT * FROM reservas WHERE correo_usuario='$email'";
$result_reservations = pg_query($conn, $query_reservations);

if (!$result_reservations) {
    echo "Error en la consulta de reservas.\n";
    exit;
}

$row_reservations = pg_fetch_assoc($result_reservations);
echo "<pre>";
print_r($row_reservations);
echo "</pre>";

// Consulta para obtener los vuelos pasados del usuario
$query_past_flights = "SELECT * FROM vuelos WHERE fecha_vuelo < '$current_date' AND correo_usuario='$email'";
$result_past_flights = pg_query($conn, $query_past_flights);

if (!$result_past_flights) {
    echo "Error en la consulta de vuelos pasados.\n";
    exit;
}

$row_past_flights = pg_fetch_assoc($result_past_flights);
echo "<pre>";
print_r($row_past_flights);
echo "</pre>";

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
