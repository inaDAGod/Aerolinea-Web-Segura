<?php
require_once(__DIR__ . '/../config/db_connection.php');
require_once(__DIR__ . '/../config/cors.php');
require_once(__DIR__ . '/helpers/generate_user_id.php');

// Obtener los datos enviados desde JavaScript
$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data) {
    http_response_code(400);
    echo json_encode(['estado' => 'error_registro', 'detalle' => 'JSON inválido o vacío']);
    exit;
}

$nombres = $data->nombres ?? '';
$apellidos = $data->apellidos ?? '';
$username = $data->username ?? '';
$contraseña = $data->contraseña ?? '';
$rol = $data->rol ?? '';

$tipo_usuario = 'administrador';
$millas = 0;
$activo = 1;
$password_last_date = date('Y-m-d');

try {
    // Validación de campos importantes
    if (!$username || !$contraseña || !$nombres || !$apellidos || !$rol) {
        throw new Exception("Faltan campos obligatorios");
    }

    // Generar nuevo user_id robustamente
    $user_id = generarUserIdPDO($conexion);
    if (!$user_id) {
        throw new Exception("Fallo al generar user_id");
    }

    // Insertar con consulta preparada
    $sql = "INSERT INTO usuarios (
                user_id, correo_usuario, contraseña, nombres_usuario, apellidos_usuario, 
                tipo_usuario, millas, rol, activo, password_last_date
            ) 
            VALUES (
                :user_id, :correo, :clave, :nombres, :apellidos, 
                :tipo, :millas, :rol, :activo, :fecha
            )";

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

    error_log("✅ Usuario insertado con user_id: $user_id");
    echo json_encode(['estado' => 'registro_exitoso', 'user_id' => $user_id]);

} catch (PDOException $e) {
    error_log("❌ Error PDO: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(['estado' => 'error_registro', 'detalle' => $e->getMessage()]);
} catch (Exception $e) {
    error_log("⚠️ Error general: " . $e->getMessage());
    http_response_code(400);
    echo json_encode(['estado' => 'error_registro', 'detalle' => $e->getMessage()]);
}
