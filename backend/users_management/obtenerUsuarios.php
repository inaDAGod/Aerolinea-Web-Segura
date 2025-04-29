<?php
include "conexion.php";
//include "../conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
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
