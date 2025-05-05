<?php
include_once(__DIR__ . '/../config/db_connection.php');
include_once(__DIR__ . '/../config/cors.php');

if (isset($_GET['correo_usuario'])) {
    $correo = $_GET['correo_usuario'];

    try {
        $query = "DELETE FROM usuarios WHERE correo_usuario = :correo";
        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();

        echo json_encode(["mensaje" => "Usuario eliminado físicamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Parámetro correo_usuario requerido"]);
}
?>
