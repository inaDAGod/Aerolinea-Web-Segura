<?php
include_once(__DIR__ . '/../config/db_connection.php');
include_once(__DIR__ . '/../config/cors.php');

if (isset($_GET['correo_usuario'])) {
    $correo = $_GET['correo_usuario'];

    try {
        $query = "SELECT * FROM usuarios WHERE correo_usuario = :correo";
        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':correo', $correo);
        $stmt->execute();
        $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($usuario) {
            echo json_encode($usuario);
        } else {
            echo json_encode(["error" => "Usuario no encontrado"]);
        }
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Parámetro correo_usuario requerido"]);
}
?>
