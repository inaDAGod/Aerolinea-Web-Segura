<?php
include_once(__DIR__ . '/../config/db_connection.php');
include_once(__DIR__ . '/../config/cors.php');

try {
    $query = "SELECT * FROM usuarios WHERE activo = 1";  // Solo usuarios activos
    $stmt = $conexion->prepare($query);
    $stmt->execute();
    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($usuarios);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
