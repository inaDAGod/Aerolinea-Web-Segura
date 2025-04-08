<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET");
header("Access-Control-Allow-Headers: Content-Type");

$conexion = pg_connect("host=localhost dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$documento = $_POST['documento'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$apellido = $_POST['apellido'] ?? '';

$query = "SELECT p.tipo_persona AS tipo_pasajero, rp.casiento AS asiento, a.tipo_asiento, p.nombres, p.apellidos, p.ci_persona as documento, rp.estado_reserva
          FROM reservas_personas rp
          JOIN personas p ON p.ci_persona = rp.ci_persona
          JOIN asientos_vuelo av ON av.casiento = rp.casiento AND av.cvuelo = rp.cvuelo
          JOIN asientos a ON a.casiento = av.casiento AND a.cavion = av.cavion
          WHERE 1=1";

$params = array();
$paramIndex = 1;

if (!empty($documento)) {
    $query .= " AND p.ci_persona = $".$paramIndex;
    $params[] = $documento;
    $paramIndex++;
}

if (!empty($nombre)) {
    $query .= " AND p.nombres ILIKE $".$paramIndex;
    $params[] = '%'.$nombre.'%';
    $paramIndex++;
}

if (!empty($apellido)) {
    $query .= " AND p.apellidos ILIKE $".$paramIndex;
    $params[] = '%'.$apellido.'%';
    $paramIndex++;
}

$result = pg_prepare($conexion, "my_query", $query);
$result = pg_execute($conexion, "my_query", $params);

if ($result) {
    $data = pg_fetch_all($result);
    if ($data) {
        echo json_encode($data);
    } else {
        echo json_encode(['error' => 'No hay registros disponibles']);
    }
} else {
    echo json_encode(['error' => 'Error en la consulta de la base de datos']);
}

pg_close($conexion);
?>
