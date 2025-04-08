<?php
session_start();

// Retrieve the creservanum from the session and subtract 1
$creservanum = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : 0;

$correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';

// Connection parameters
$host = 'localhost';
$dbname = 'aerolinea';
$username = 'postgres';
$password = 'admin';

try {
    // Connect to the database
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Begin a transaction
    $conn->beginTransaction();

    // Check if there are reservas_personas associated with the new creserva value
    $sqlCheckReservasPersonas = "SELECT COUNT(*) FROM reservas_personas WHERE creserva = :creserva";
    $stmtCheckReservasPersonas = $conn->prepare($sqlCheckReservasPersonas);
    $stmtCheckReservasPersonas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
    $stmtCheckReservasPersonas->execute();
    $reservas_personas_count = $stmtCheckReservasPersonas->fetchColumn();

    if ($reservas_personas_count == 0) {
        echo json_encode(["error" => "No se encontraron reservas_personas asociadas con la reserva."]);
        exit;
    }

    // Update the estado_reserva to 'Pagado' in reservas_personas
    $sqlUpdate = "UPDATE reservas_personas SET estado_reserva = 'Pendiente' WHERE creserva = :creserva";
    $stmtUpdate = $conn->prepare($sqlUpdate);
    $stmtUpdate->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
    $stmtUpdate->execute();

    // Fetch reservas_personas data for the updated creserva
    $sqlSelectReservasPersonas = "SELECT * FROM reservas_personas WHERE creserva = :creserva";
    $stmtSelectReservasPersonas = $conn->prepare($sqlSelectReservasPersonas);
    $stmtSelectReservasPersonas->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
    $stmtSelectReservasPersonas->execute();
    $reservas_personas = $stmtSelectReservasPersonas->fetchAll(PDO::FETCH_ASSOC);

    // Commit the transaction
    $conn->commit();

    // Assuming creservanum is the primary key and you want to return it after updating
    echo json_encode(["message" => "Reserva confirmada exitosamente.", "creserva" => $creservanum, "correo_usuario" => $correo_usuario, "reservas_personas" => $reservas_personas]);

} catch (PDOException $e) {
    // Roll back the transaction in case of error
    $conn->rollBack();
    echo json_encode(["error" => $e->getMessage()]);
}

?>
