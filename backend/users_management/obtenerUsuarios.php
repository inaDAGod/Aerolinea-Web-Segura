<?php
include "../conexion.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

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
