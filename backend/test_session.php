<?php
include_once(__DIR__ . '/config/cors.php');
include 'conexion.php';

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Decode the JSON data from the input
$data = json_decode(file_get_contents('php://input'), true);

// Ensure data is received and properly set
$cvuelo = isset($data['cvuelo']) ? $data['cvuelo'] : null;
$adultos = isset($data['adultos']) ? intval($data['adultos']) : 0;
$adultoMayor = isset($data['adultoMayor']) ? intval($data['adultoMayor']) : 0;
$ninos = isset($data['ninos']) ? intval($data['ninos']) : 0;

$totalg = $adultos + $adultoMayor + $ninos;

$cvuelosnum = $cvuelo; // Assuming cvuelo corresponds to cvuelosnum
$correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$fecha_reserva = date('Y-m-d H:i:s');

// Function to retrieve the flight date from vuelos table
function obtener_fecha_lmite($conn, $cvuelo) {
    $query = "SELECT fecha_vuelo FROM vuelos WHERE cvuelo = :cvuelo";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':cvuelo', $cvuelo);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result ? $result['fecha_vuelo'] : null;
}

// Retrieve fecha_lmite from vuelos table
$fecha_lmite = obtener_fecha_lmite($conn, $cvuelosnum);

if ($fecha_lmite === null) {
    echo json_encode(['status' => 'error', 'message' => 'Invalid flight number or flight date not found.']);
    exit;
}

// Function to generate a reservation number
function generar_numero_reserva($conn, $correo_usuario, $fecha_reserva, $fecha_lmite) {
    $query = "INSERT INTO reservas (correo_usuario, fecha_reserva, fecha_lmite) VALUES (:correo_usuario, :fecha_reserva, :fecha_lmite)";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':correo_usuario', $correo_usuario);
    $stmt->bindParam(':fecha_reserva', $fecha_reserva);
    $stmt->bindParam(':fecha_lmite', $fecha_lmite);
    $stmt->execute();

    return $conn->lastInsertId();
}

$creservanum = generar_numero_reserva($conn, $correo_usuario, $fecha_reserva, $fecha_lmite);
$reservation_counter = 0;

$_SESSION['adum'] = $adultoMayor;
$_SESSION['adu'] = $adultos;
$_SESSION['nin'] = $ninos;
$_SESSION['total_people'] = $totalg;
$_SESSION['cvuelosnum'] = $cvuelosnum;
$_SESSION['creservanum'] = $creservanum;
$_SESSION['reservation_counter'] = $reservation_counter;
$_SESSION['correo_usuario'] = $correo_usuario;

echo json_encode(['status' => 'success', 'message' => 'Reservation data processed successfully.']);
?>
