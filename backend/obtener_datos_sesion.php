

<?php
session_start();

// Retrieve session variables
$response = array(
    'adum' => isset($_SESSION['adum']) ? $_SESSION['adum'] : 0,
    'adu' => isset($_SESSION['adu']) ? $_SESSION['adu'] : 0,
    'nin' => isset($_SESSION['nin']) ? $_SESSION['nin'] : 0,
    'total_people' => isset($_SESSION['total_people']) ? $_SESSION['total_people'] : 0,
);

// Return response as JSON
echo json_encode($response);
?>
