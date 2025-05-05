<?php
include_once(__DIR__ . '/../config/db_connection.php');
include_once(__DIR__ . '/../config/cors.php');
include_once(__DIR__ . '/../helpers/generate_user_id.php');

// Obtener los datos del cliente
$json = file_get_contents('php://input');
$data = json_decode($json);

$nombres = $data->nombres;
$apellidos = $data->apellidos;
$username = $data->username;
$contraseña = $data->contraseña;
$rol = $data->rol;

$tipo_usuario = 'cliente';
$millas = 0;
$activo = 1;
$password_last_date = date('Y-m-d');

try {
    // Generar nuevo user_id
    $user_id = generarUserIdPDO($conexion); // ahora usamos PDO

    // Insertar los datos con consulta preparada
    $sql = "INSERT INTO usuarios (user_id, correo_usuario, contraseña, nombres_usuario, apellidos_usuario, tipo_usuario, millas, rol, activo, password_last_date) 
            VALUES (:user_id, :correo, :clave, :nombres, :apellidos, :tipo, :millas, :rol, :activo, :fecha)";

    $stmt = $conexion->prepare($sql);
    $stmt->execute([
        ':user_id' => $user_id,
        ':correo' => $username,
        ':clave' => $contraseña,
        ':nombres' => $nombres,
        ':apellidos' => $apellidos,
        ':tipo' => $tipo_usuario,
        ':millas' => $millas,
        ':rol' => $rol,
        ':activo' => $activo,
        ':fecha' => $password_last_date
    ]);

    echo json_encode(['estado' => 'registro_exitoso', 'user_id' => $user_id]);
} catch (PDOException $e) {
    echo json_encode(['estado' => 'error_registro', 'detalle' => $e->getMessage()]);
}
?>
