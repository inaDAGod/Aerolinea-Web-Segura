<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
$conexion = pg_connect("host=localhost dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$carnet = $_POST['carnet'] ?? '';
$numeroVuelo = $_POST['numeroVuelo'] ?? '';

if (!$carnet || !$numeroVuelo) {
    echo json_encode(['error' => 'Faltan datos necesarios']);
    exit;
}

$carnet = pg_escape_string($conexion, trim($carnet));
$numeroVuelo = intval($numeroVuelo);

$query = "SELECT rp.*, p.nombres, p.apellidos, v.fecha_vuelo, v.origen, v.destino 
          FROM reservas_personas rp
          JOIN personas p ON p.ci_persona = rp.ci_persona
          JOIN vuelos v ON v.cvuelo = rp.cvuelo
          WHERE rp.ci_persona = $1 AND rp.cvuelo = $2 AND rp.estado_reserva = 'Pagado'";
$result = pg_prepare($conexion, "my_query", $query);
if ($result) {
    $result = pg_execute($conexion, "my_query", array($carnet, $numeroVuelo));
    if ($result && pg_num_rows($result) > 0) {
        $row = pg_fetch_assoc($result);
        $response = [
            'encontrado' => true,
            'creserva' => $row['creserva'],
            'nombre' => $row['nombres'],
            'apellido' => $row['apellidos'],
            'numeroDocumento' => $carnet,
            'fechaVuelo' => date('Y-m-d', strtotime($row['fecha_vuelo'])),
            'horaVuelo' => date('H:i', strtotime($row['fecha_vuelo'])),
            'origen' => $row['origen'],
            'destino' => $row['destino']
        ];
        echo json_encode($response);
    } else {
        echo json_encode(['encontrado' => false, 'message' => 'No se encontró una reserva pagada con esos datos.']);
    }
} else {
    echo json_encode(['error' => 'Error al preparar la consulta: ' . pg_last_error($conexion)]);
}
pg_close($conexion);
?>
