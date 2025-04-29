<?php
include "conexion.php";
//include "../conexion.php";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

// Espera recibir un JSON en el body de la petición
$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    try {
        $query = "UPDATE usuarios SET
                    nombres_usuario = :nombres,
                    apellidos_usuario = :apellidos,
                    tipo_usuario = :tipo_usuario,
                    millas = :millas,
                    rol = :rol,
                    activo = :activo,
                    password_last_date = :password_last_date
                  WHERE correo_usuario = :correo";

        $stmt = $conexion->prepare($query);

        $stmt->bindParam(':nombres', $data['nombres_usuario']);
        $stmt->bindParam(':apellidos', $data['apellidos_usuario']);
        $stmt->bindParam(':tipo_usuario', $data['tipo_usuario']);
        $stmt->bindParam(':millas', $data['millas']);
        $stmt->bindParam(':rol', $data['rol']);
        $stmt->bindParam(':activo', $data['activo']);
        $stmt->bindParam(':password_last_date', $data['password_last_date']);
        $stmt->bindParam(':correo', $data['correo_usuario']);

        $stmt->execute();
        echo json_encode(["mensaje" => "Usuario actualizado correctamente"]);
    } catch (PDOException $e) {
        echo json_encode(["error" => $e->getMessage()]);
    }
} else {
    echo json_encode(["error" => "Datos no recibidos correctamente"]);
}
?>
