<?php
session_start();
$host = 'localhost';
$port = '5432';
$dbname = 'aerolinea';
$user = 'postgres';
$password = 'admin';

// Realizar la conexión a la base de datos
$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

if (!$conn) {
    echo "Error: No se pudo conectar a la base de datos.\n";
    exit;
}

// Obtener la fecha actual
$current_date = date('Y-m-d');

// Obtener la fecha de finalización de los próximos 30 días
$end_of_month = date('Y-m-d', strtotime($current_date . ' + 30 days'));

// Consulta para obtener las reservas del usuario para vuelos de los próximos 30 días
$email = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$query_reservations = "SELECT r.fecha_reserva, r.fecha_lmite, r.creserva, rp.cvuelo, v.origen, v.destino, rp.estado_reserva,
                            SUM(
                                CASE WHEN a.tipo_asiento = 'VIP' THEN v.costovip
                                     WHEN a.tipo_asiento = 'Business' THEN v.costobusiness
                                     WHEN a.tipo_asiento = 'Económico' THEN v.costoeco
                                END
                            ) / 2 AS total_cost
                       FROM reservas r
                       JOIN reservas_personas rp ON r.creserva = rp.creserva
                       JOIN vuelos v ON rp.cvuelo = v.cvuelo
                       JOIN asientos_vuelo av ON rp.cvuelo = av.cvuelo AND rp.casiento = av.casiento
                       JOIN asientos a ON av.casiento = a.casiento
                       WHERE r.correo_usuario='$email' AND r.fecha_reserva BETWEEN '$current_date' AND '$end_of_month'
                       GROUP BY r.fecha_reserva, r.fecha_lmite, r.creserva, rp.cvuelo, v.origen, v.destino, rp.estado_reserva";
$result_reservations = pg_query($conn, $query_reservations);

if (!$result_reservations) {
    echo "Error en la consulta de reservas.\n";
    exit;
}

// Mostrar los resultados de la consulta
echo "<table class='table table-striped'>";
echo "<tr><th>Fecha de Reserva</th><th>Fecha Límite</th><th>Número de Reserva</th><th>Número de Vuelo</th><th>Origen</th><th>Destino</th><th>Estado de Reserva</th><th>Total Costo</th></tr>";
while ($row_reservations = pg_fetch_assoc($result_reservations)) {
    echo "<tr>";
    echo "<td>" . $row_reservations['fecha_reserva'] . "</td>";
    echo "<td>" . $row_reservations['fecha_lmite'] . "</td>";
    echo "<td>" . $row_reservations['creserva'] . "</td>";
    echo "<td>" . $row_reservations['cvuelo'] . "</td>";
    echo "<td>" . $row_reservations['origen'] . "</td>";
    echo "<td>" . $row_reservations['destino'] . "</td>";
    echo "<td>" . $row_reservations['estado_reserva'] . "</td>";
    echo "<td>" . $row_reservations['total_cost'] . "</td>";
    echo "</tr>";
}
echo "</table>";

// Cerrar la conexión a la base de datos
pg_close($conn);
?>
