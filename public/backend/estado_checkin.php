<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');

// Obtener los datos del POST
$documento = $_POST['documento'] ?? '';
$estado = $_POST['estado'] ?? '';

// Validar y sanitizar los datos
if (empty($documento) || empty($estado)) {
    echo json_encode(['error' => 'Documento o estado no proporcionados']);
    exit;
}

// Verificar si el estado enviado es "Pendiente" o "Realizado"
if ($estado !== "Pendiente" && $estado !== "Realizado") {
    echo json_encode(['error' => 'El estado enviado no es válido']);
    exit;
}

include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
// Consulta SQL para actualizar el estado de check-in
$query = "UPDATE check_in SET estado_checkin = $1 WHERE numero_documento = $2";

// Prepara la consulta
$result = pg_prepare($conexion, "update_query", $query);
if (!$result) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . pg_last_error()]);
    exit;
}

// Ejecutar la consulta para actualizar el estado de check-in
$result = pg_execute($conexion, "update_query", array($estado, $documento));
if (!$result) {
    echo json_encode(['error' => 'Error al actualizar el estado de check-in: ' . pg_last_error()]);
    exit;
}

// Cerrar la conexión con la base de datos
pg_close($conexion);

// Envía una respuesta JSON indicando el éxito
echo json_encode(['success' => 'Estado de check-in actualizado correctamente']);
?>
