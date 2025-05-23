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
$carnet = $_POST['carnet'] ?? '';
$fechaVuelo = $_POST['fechaVuelo'] ?? '';
$correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';

// Obtener el correo del usuario basado en el carnet y el creserva
$queryReserva = "SELECT r.correo_usuario FROM reservas r
                JOIN reservas_personas rp ON r.creserva = rp.creserva
                WHERE rp.ci_persona = $1";
$resultReserva = pg_prepare($conexion, "query_reserva", $queryReserva);
$resultReserva = pg_execute($conexion, "query_reserva", array($carnet));

if ($resultReserva && pg_num_rows($resultReserva) > 0) {
    $correoUsuario = pg_fetch_result($resultReserva, 0, 'correo_usuario');

    // Insertar en check_in
    $queryCheckIn = "INSERT INTO check_in (correo_usuario, fecha_check_in, numero_documento, tipodoc, equipaje_mano, maleta, equipaje_extra, estado_checkin)
                    VALUES ($1, $2, $3, 'Carnet de Identidad', false, false, false, 'Pendiente') RETURNING ccheck_in";
    $resultCheckIn = pg_prepare($conexion, "insert_checkin", $queryCheckIn);
    $resultCheckIn = pg_execute($conexion, "insert_checkin", array($correoUsuario, $fechaVuelo, $carnet));

    if ($resultCheckIn && pg_num_rows($resultCheckIn) > 0) {
        $ccheckIn = pg_fetch_result($resultCheckIn, 0, 'ccheck_in');
        if (!empty($correo_usuario)) {
            $mensaje = "se generó el check-in correctamente";
            $logQuery = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
            pg_prepare($conexion, "insert_log_success", $logQuery);
            pg_execute($conexion, "insert_log_success", array($correo_usuario, $mensaje));
        }
        echo json_encode(['success' => true, 'ccheck_in' => $ccheckIn]);
    } else {
        // Registrar intento fallido de check-in
        if (!empty($correo_usuario)) {
            $mensaje = "No se generó el check-in correctamente";
            $logQuery = "INSERT INTO log_app (correo_usuario, mensaje) VALUES ($1, $2)";
            pg_prepare($conexion, "insert_log_fail", $logQuery);
            pg_execute($conexion, "insert_log_fail", array($correo_usuario, $mensaje));
        }
        echo json_encode(['success' => false, 'message' => 'Error al insertar en check_in']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se encontró una reserva asociada']);
}

pg_close($conexion);
?>
