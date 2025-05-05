<?php
// CORS y conexión
include_once(__DIR__ . '/../config/cors.php');
include_once(__DIR__ . '/../config/db_connection.php');

// Recibir los datos JSON
$datos = json_decode(file_get_contents("php://input"), true);

if (
    isset($datos['correo_usuario']) &&
    isset($datos['contraseña']) &&
    isset($datos['nombres_usuario']) &&
    isset($datos['apellidos_usuario']) &&
    isset($datos['tipo_usuario']) &&
    isset($datos['millas']) &&
    isset($datos['rol']) &&
    isset($datos['activo']) &&
    isset($datos['password_last_date'])
) {
    try {
        $query = "INSERT INTO usuarios (
            correo_usuario, contraseña, nombres_usuario, apellidos_usuario,
            tipo_usuario, millas, rol, activo, password_last_date
        ) VALUES (
            :correo_usuario, :password, :nombres_usuario, :apellidos_usuario,
            :tipo_usuario, :millas, :rol, :activo, :password_last_date
        )";

        $stmt = $conexion->prepare($query);
        $stmt->bindParam(':correo_usuario', $datos['correo_usuario']);
        $stmt->bindParam(':password', $datos['contraseña']);
        $stmt->bindParam(':nombres_usuario', $datos['nombres_usuario']);
        $stmt->bindParam(':apellidos_usuario', $datos['apellidos_usuario']);
        $stmt->bindParam(':tipo_usuario', $datos['tipo_usuario']);
        $stmt->bindParam(':millas', $datos['millas']);
        $stmt->bindParam(':rol', $datos['rol']);
        $stmt->bindParam(':activo', $datos['activo']);
        $stmt->bindParam(':password_last_date', $datos['password_last_date']);

        $stmt->execute();

        echo json_encode(["mensaje" => "Usuario creado correctamente"]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Error al crear usuario: " . $e->getMessage()]);
    }
} else {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos para crear el usuario"]);
}
?>
