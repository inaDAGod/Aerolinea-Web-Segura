<?php
include "conexion.php";
//include "../conexion.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if (isset($_GET['correo_usuario'])) {
    $correo = $_GET['correo_usuario'];

    try {
        $query = "UPDATE usuarios SET activo = 0 WHERE correo_usuario = :correo";
        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();

        echo json_encode(["mensaje" => "Usuario eliminado"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Parámetro correo_usuario requerido"]);
}
?>
