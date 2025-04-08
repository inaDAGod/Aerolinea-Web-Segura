<?php 

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
// Initialize reservation counter to 0 if not already set
if (!isset($_SESSION['reservation_counter'])) {
    $_SESSION['reservation_counter'] = 0;
}

// Check if form submitted from registro.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Process data from registro.php and store in database
    // Redirect to the index page after all registrations are complete
    header("Location: index.php");
    exit;
}

// Store total number of people in session
$adum = 1;
$adu = 1;
$nin = 0;

$totalg = $adum + $adu + $nin;

$_SESSION['adum'] = $adum;
$_SESSION['adu'] = $adu;
$_SESSION['nin'] = $nin;
$_SESSION['total_people'] = $totalg;
?>
