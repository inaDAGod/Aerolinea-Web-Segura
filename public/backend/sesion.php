<?php
include_once(__DIR__ . '/config/cors.php');
//include 'registrores.php';
//include 'generar_reserva.php';
//include 'login.php';
// Inicia la sesión solo si no ha sido iniciada previamente
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$correo_usuario = isset($_SESSION['correo_usuario']) ? $_SESSION['correo_usuario'] : '';
$tipo_usuario = isset($_SESSION['tipo_usuario']) ? $_SESSION['tipo_usuario'] : '';
$nombres_usuario = isset($_SESSION['nombres_usuario']) ? $_SESSION['nombres_usuario'] : '';
$apellidos_usuario = isset($_SESSION['apellidos_usuario']) ? $_SESSION['apellidos_usuario'] : '';
$millas = isset($_SESSION['millas']) ? $_SESSION['millas'] : 0;
$adum = isset($_SESSION['adum']) ? $_SESSION['adum'] : 0;
$adu = isset($_SESSION['adu']) ? $_SESSION['adu'] : 0;
$nin = isset($_SESSION['nin']) ? $_SESSION['nin'] : 0;
$totalg = isset($_SESSION['total_people']) ? $_SESSION['total_people'] : 0;
$reservation_counter = isset($_SESSION['reservation_counter']) ? $_SESSION['reservation_counter'] : 0;
$cvuelosnum = isset($_SESSION['cvuelosnum']) ? $_SESSION['cvuelosnum'] : 0;
$creservanum = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : 0;

// Update or set the session variables
$_SESSION['correo_usuario'] = $correo_usuario;
$_SESSION['tipo_usuario'] = $tipo_usuario;
$_SESSION['nombres_usuario'] = $nombres_usuario;
$_SESSION['apellidos_usuario'] = $apellidos_usuario;
$_SESSION['millas'] = $millas;
$_SESSION['adum'] = $adum;
$_SESSION['adu'] = $adu;
$_SESSION['nin'] = $nin;
$_SESSION['total_people'] = $totalg;
$_SESSION['reservation_counter'] = $reservation_counter;
$_SESSION['cvuelosnum'] = $cvuelosnum;
$_SESSION['creservanum'] = $creservanum;

?>