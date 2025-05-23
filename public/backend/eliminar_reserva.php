<?php
include_once(__DIR__ . '/config/cors.php');
session_start();

function eliminarReservas() {
    // Verificar si el número de reserva está en la sesión
    if (!isset($_SESSION['creservanum']) || $_SESSION['creservanum'] == 0) {
        echo json_encode(["error" => "No se encontró el número de reserva en la sesión o es inválido."]);
        return;
    }
    
    $creservanum = $_SESSION['creservanum'];
    $correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';

    include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

    try {
       

        // Eliminar todas las filas de reservas_personas con el mismo creserva
        $sqlDeleteReservasPersonas = "DELETE FROM reservas_personas WHERE creserva = :creserva";
        $stmtDeleteReservasPersonas = $conn->prepare($sqlDeleteReservasPersonas);
        $stmtDeleteReservasPersonas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
        $stmtDeleteReservasPersonas->execute();

        // Eliminar la reserva en la tabla reservas sin verificar si hay registros en reservas_personas
        $sqlDeleteReservas = "DELETE FROM reservas WHERE creserva = :creserva";
        $stmtDeleteReservas = $conn->prepare($sqlDeleteReservas);
        $stmtDeleteReservas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
        $stmtDeleteReservas->execute();
        // Confirmar la transacción
        $conn->commit();
        // Insertar en log_app
        $sqlLog = "INSERT INTO log_app (correo_usuario, mensaje) VALUES (:correo, :mensaje)";
        $stmtLog = $conn->prepare($sqlLog);
        $stmtLog->bindParam(':correo', $correo_usuario);
        $mensaje = "Reserva Eliminada"; 
        $stmtLog->bindParam(':mensaje', $mensaje);
        $stmtLog->execute();
        
        echo json_encode(["message" => "Reserva y registros relacionados eliminados exitosamente."]);
    } catch (Exception $e) {
        // En caso de error, revertir la transacción
        $conn->rollBack();
        echo json_encode(["error" => $e->getMessage()]);
    }
}

eliminarReservas();
?>
