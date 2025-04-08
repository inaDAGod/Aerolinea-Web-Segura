<?php include 'sesion.php';
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
include 'conexion.php';

try {
    // Prepare SQL query
    $query = "SELECT cvuelo, origen, destino FROM vuelos WHERE cvuelo = :cvuelo";
    $stmt = $conn->prepare($query);
    $stmt->bindParam(':cvuelo', $_SESSION['cvuelosnum']); 

    // Execute query
    $stmt->execute();

    // Fetch the first row as an associative array
    $row = $stmt->fetch(PDO::FETCH_ASSOC);

    // Display result
    if ($row) {
        echo "Vuelo: " . $row['cvuelo'] . "<br>";
        echo "Origen: " . $row['origen'] . "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
        echo "Destino: " . $row['destino'] . "<br>";
    } else {
        echo "No data found.";
    }
} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>
