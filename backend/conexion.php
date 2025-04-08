<?php
// Define las variables de conexión a la base de datos
$host = 'localhost';
$dbname = 'aerolinea';
$username = 'postgres';
$password = 'admin';

try {
    // Crea la conexión PDO a la base de datos
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
    exit();
}
?>
