<?php
header('Content-Type: application/json');

$documento = $_POST['documento'] ?? '';
$estado = $_POST['estado'] ?? '';

if (empty($documento) || empty($estado)) {
    echo json_encode(['error' => 'Documento o estado no proporcionados']);
    exit;
}

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$query = "UPDATE reservas_personas SET estado_reserva = $1 WHERE ci_persona = $2";

$result = pg_prepare($conexion, "update_estado_reserva", $query);
if (!$result) {
    echo json_encode(['error' => 'Error en la preparación de la consulta']);
    exit;
}

$result = pg_execute($conexion, "update_estado_reserva", array($estado, $documento));
if ($result) {
    echo json_encode(['success' => 'Estado de reserva actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar el estado de reserva']);
}

pg_close($conexion);
?>