<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
$sql = "DELETE FROM premios_millas WHERE premio = '$premio'";
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    if (pg_affected_rows($resultado) > 0) {
        echo json_encode(["estado" => "borrado_exitoso"]);
    } else {
        echo json_encode(["estado" => "premio_no_encontrado"]);
    }
} else {

    echo json_encode(["estado" => "error_consulta"]);
}

pg_close($conexion);
?>
