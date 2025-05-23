<?php
require_once(__DIR__ . '/../config/db_connection.php');
require_once(__DIR__ . '/../config/cors.php');

header("Content-Type: application/json; charset=UTF-8");

// Verificar conexión a la base de datos
if (!isset($conexion)) {
    http_response_code(500);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error de configuración: conexión a BD no disponible'
    ]);
    exit;
}

// Obtener datos JSON
$json = file_get_contents('php://input');
$data = json_decode($json);

if (!$data) {
    http_response_code(400);
    echo json_encode(['estado' => 'error', 'mensaje' => 'Datos JSON inválidos o vacíos']);
    exit;
}

try {
    // Validar campos requeridos
    $camposRequeridos = ['tipo_evento', 'descripcion', 'severidad'];
    foreach ($camposRequeridos as $campo) {
        if (empty($data->$campo)) {
            http_response_code(400);
            echo json_encode(['estado' => 'error', 'mensaje' => "Campo requerido faltante: $campo"]);
            exit;
        }
    }

    // Preparar consulta SQL
    $sql = "INSERT INTO log_seguridad (
        fecha_hora,
        tipo_evento,
        descripcion,
        correo_usuario,
        ip_origen,
        user_agent,
        detalles_adicionales,
        severidad
    ) VALUES (
        NOW(),
        :tipo_evento,
        :descripcion,
        :correo_usuario,
        :ip_origen,
        :user_agent,
        :detalles_adicionales,
        :severidad
    )";

    $stmt = $conexion->prepare($sql);
    
    // Bind parameters
    $stmt->bindValue(':tipo_evento', $data->tipo_evento);
    $stmt->bindValue(':descripcion', $data->descripcion);
    $stmt->bindValue(':correo_usuario', $data->correo_usuario ?? null, PDO::PARAM_STR);
    $stmt->bindValue(':ip_origen', $data->ip_origen ?? 'IP_NO_DISPONIBLE');
    $stmt->bindValue(':user_agent', $data->user_agent ?? 'AGENTE_NO_DISPONIBLE');
    $stmt->bindValue(':severidad', $data->severidad);
    $stmt->bindValue(':detalles_adicionales', json_encode($data->detalles_adicionales ?? []));

    // Ejecutar consulta
    if ($stmt->execute()) {
        echo json_encode(['estado' => 'exito', 'mensaje' => 'Registro de seguridad guardado']);
    } else {
        throw new Exception('Error al ejecutar la consulta');
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error en la base de datos',
        'error' => $e->getMessage()
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error general',
        'error' => $e->getMessage()
    ]);
}