<?php
include_once(__DIR__ . '/config/cors.php');
session_start();

function eliminarReservas() {
    // Verificar si el número de reserva está en la sesión
    if (!isset($_SESSION['creservanum']) || $_SESSION['creservanum'] == 0) {
        echo json_encode(["error" => "No se encontró el número de reserva en la sesión o es inválido."]);
        return;
    }

    // Restar 1 al número de reserva
    $_SESSION['creservanum'];

    // Obtener el número de reserva actualizado
    $creservanum = $_SESSION['creservanum'];

    // Parámetros de conexión
    $host = 'localhost';
    $dbname = 'aerolinea';
    $username = 'postgres';
    $password = 'admin';

    try {
        // Conectar a la base de datos
        $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Iniciar una transacción
        $conn->beginTransaction();

        // Eliminar todas las filas de reservas_personas con el mismo creserva
        $sqlDeleteReservasPersonas = "DELETE FROM reservas_personas WHERE creserva = :creserva";
        $stmtDeleteReservasPersonas = $conn->prepare($sqlDeleteReservasPersonas);
        $stmtDeleteReservasPersonas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
        $stmtDeleteReservasPersonas->execute();

        // Verificar que se eliminaron filas en reservas_personas
        if ($stmtDeleteReservasPersonas->rowCount() == 0) {
            throw new Exception("No se encontraron registros en reservas_personas con creserva = $creservanum.");
        }

        // Eliminar la reserva en la tabla reservas
        $sqlDeleteReservas = "DELETE FROM reservas WHERE creserva = :creserva";
        $stmtDeleteReservas = $conn->prepare($sqlDeleteReservas);
        $stmtDeleteReservas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
        $stmtDeleteReservas->execute();

        // Verificar que se eliminó la fila en reservas
        if ($stmtDeleteReservas->rowCount() == 0) {
            throw new Exception("No se encontró un registro en reservas con creserva = $creservanum.");
        }

        // Confirmar la transacción
        $conn->commit();

        // Preparar el mensaje de notificación
        $notificationMessage = "Reserva y registros relacionados eliminados exitosamente.";

        // Devolver una respuesta con el mensaje de notificación
        echo json_encode(["message" => $notificationMessage]);
    } catch (Exception $e) {
        // En caso de error, revertir la transacción
        $conn->rollBack();
        echo json_encode(["error" => $e->getMessage()]);
    }
}

eliminarReservas();
?>
