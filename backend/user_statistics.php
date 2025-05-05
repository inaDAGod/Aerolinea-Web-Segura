<?php
include_once(__DIR__ . '/config/cors.php');
session_start();
$host = 'localhost';
$port = '5432';
$dbname = 'aerolinea';
$user = 'postgres';
$password = 'admin';

// Establecer conexión con la base de datos
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo json_encode(["error" => "Error: No se pudo conectar a la base de datos."]);
    exit;
}

// Calcular el total de días de viaje
$query_total_days_travelled = "SELECT COUNT(DISTINCT fecha_vuelo) AS total_days_travelled 
                               FROM boletos b 
                               JOIN vuelos v ON b.cvuelo = v.cvuelo";
$result_total_days_travelled = pg_query($conn, $query_total_days_travelled);
$row_total_days_travelled = pg_fetch_assoc($result_total_days_travelled);
$total_days_travelled = $row_total_days_travelled['total_days_travelled'];

// Calcular el total de ciudades visitadas
$query_total_cities_visited = "SELECT COUNT(DISTINCT destino) AS total_cities_visited 
                               FROM boletos b 
                               JOIN vuelos v ON b.cvuelo = v.cvuelo";
$result_total_cities_visited = pg_query($conn, $query_total_cities_visited);
$row_total_cities_visited = pg_fetch_assoc($result_total_cities_visited);
$total_cities_visited = $row_total_cities_visited['total_cities_visited'];

// Obtener las millas totales ganadas
$email = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$query_total_miles_earned = "SELECT millas FROM usuarios WHERE correo_usuario = '$email'";
$result_total_miles_earned = pg_query($conn, $query_total_miles_earned);

if (!$result_total_miles_earned) {
    echo json_encode(["error" => "Error al obtener las millas ganadas."]);
    exit;
}

$row_total_miles_earned = pg_fetch_assoc($result_total_miles_earned);
$total_miles_earned = $row_total_miles_earned['millas'];

// Preparar los datos estadísticos
$statistics_data = [
    "total_days_travelled" => $total_days_travelled,
    "total_cities_visited" => $total_cities_visited,
    "total_miles_earned" => $total_miles_earned
];

// Salida de los datos estadísticos como JSON
echo json_encode($statistics_data);

// Cerrar la conexión con la base de datos
pg_close($conn);
?>
