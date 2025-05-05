<?php
$host = "localhost";
$dbname = "aerolinea";
$username = "postgres";
$password = "admin";

try {
    $conexion = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    // Lanza la excepción para que se maneje en el archivo principal
    throw new PDOException("Error de conexión: " . $e->getMessage());
}
?>
