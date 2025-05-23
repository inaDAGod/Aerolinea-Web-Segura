<?php
include_once(__DIR__ . '/config/cors.php');
session_start();
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

// Consulta para obtener los vuelos pasados del usuario
$email = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$current_date = date('Y-m-d');
$query_past_flights = "
SELECT v.cvuelo, v.origen, v.destino, v.fecha_vuelo,
    SUM(
        CASE 
            WHEN a.tipo_asiento = 'VIP' THEN v.costovip
            WHEN a.tipo_asiento = 'Business' THEN v.costobusiness
            WHEN a.tipo_asiento = 'Económico' THEN v.costoeco
        END
    ) / 2 AS total_cost
FROM vuelos v
JOIN reservas_personas rp ON v.cvuelo = rp.cvuelo
JOIN boletos b ON rp.ci_persona = b.ci_persona AND rp.cvuelo = b.cvuelo
JOIN asientos_vuelo av ON b.cvuelo = av.cvuelo AND b.casiento = av.casiento
JOIN asientos a ON av.casiento = a.casiento
WHERE v.fecha_vuelo < CURRENT_DATE
GROUP BY v.cvuelo, v.origen, v.destino, v.fecha_vuelo;
";

$result_past_flights = pg_query($conn, $query_past_flights);

if (!$result_past_flights) {
    echo "Error en la consulta de vuelos pasados.\n";
    exit;
}

// Mostrar los resultados en una tabla
echo "<table class='table table-striped'>";
echo "<tr><th>cvuelo</th><th>origen</th><th>destino</th><th>fecha_vuelo</th><th>costo</th></tr>";
while ($row_past_flights = pg_fetch_assoc($result_past_flights)) {
    echo "<tr>";
    echo "<td>" . $row_past_flights['cvuelo'] . "</td>";
    echo "<td>" . $row_past_flights['origen'] . "</td>";
    echo "<td>" . $row_past_flights['destino'] . "</td>";
    echo "<td>" . $row_past_flights['fecha_vuelo'] . "</td>";
    echo "<td>" . $row_past_flights['total_cost'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
