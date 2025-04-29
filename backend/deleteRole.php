<?php
header("Access-Control-Allow-Origin: *"); //si subimos a un servidor, cambiar el * por la url de la app
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
    die('Error de conexión.');
}

$data = json_decode(file_get_contents('php://input'), true);

$rol = pg_escape_string($data['rol']);

$sql = "DELETE FROM roles WHERE rol = '$rol'";

$result = @pg_query($conexion, $sql); // el @ oculta warnings, controlamos nosotros el error abajo

if ($result) {
    echo json_encode(['status' => 'success', 'message' => 'Rol eliminado exitosamente.']);
} else {
    $error = pg_last_error($conexion);

    if (strpos($error, 'violates foreign key constraint') !== false) {
        echo json_encode(['status' => 'error', 'message' => 'No se puede eliminar el rol porque está en uso.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se puede eliminar el rol porque está en uso.']);
    }
}
?>
