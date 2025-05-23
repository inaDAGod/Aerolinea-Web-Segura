<?php
include_once(__DIR__ . '/config/cors.php');
session_start(); // Necesario para obtener el correo del usuario
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

// Obtener datos actuales de la reserva
$queryDatos = "SELECT rp.estado_reserva, rp.casiento, rp.cvuelo FROM reservas_personas rp WHERE rp.ci_persona = $1";
$resDatos = pg_query_params($conexion, $queryDatos, [$documento]);

if (!$resDatos || pg_num_rows($resDatos) === 0) {
    echo json_encode(['error' => 'Reserva no encontrada para ese documento']);
    exit;
}

$reserva = pg_fetch_assoc($resDatos);
$estadoActual = $reserva['estado_reserva'];
$casiento = $reserva['casiento'] ?? 'desconocido';
$cvuelo = $reserva['cvuelo'] ?? 'desconocido';

// Actualizar el estado
$query = "UPDATE reservas_personas SET estado_reserva = $1 WHERE ci_persona = $2";
$result = pg_prepare($conexion, "update_estado_reserva", $query);
if (!$result) {
    echo json_encode(['error' => 'Error en la preparación de la consulta']);
    exit;
}

$result = pg_execute($conexion, "update_estado_reserva", [$estado, $documento]);
if ($result) {
    // Insertar en log_app
    if (isset($_SESSION['correo_usuario'])) {
        $correo = $_SESSION['correo_usuario'];
        $mensaje = "Se cambió el estado de la reserva del pasajero de '$estadoActual' a '$estado'";
        $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
        pg_query_params($conexion, $sqlLog, [$correo, $mensaje]);
    }

    echo json_encode(['success' => 'Estado de reserva actualizado correctamente']);
} else {
    echo json_encode(['error' => 'Error al actualizar el estado de reserva']);
}

pg_close($conexion);
?>
