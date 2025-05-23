<?php
include_once(__DIR__ . '/config/cors.php');
// Establecer la conexión con la base de datos
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}
// Consulta SQL para obtener la lista de personas
$sql = "SELECT * FROM audi"; // Cambio de "usuarios" a "personas"
$resultado = pg_query($conexion, $sql);

if ($resultado) {
    // Verificar si se encontraron resultados
    if (pg_num_rows($resultado) > 0) {
        // Convertir el resultado a un array asociativo
        $personas = array(); // Cambio de $usuarios a $personas
        while ($fila = pg_fetch_assoc($resultado)) {
            $personas[] = $fila;
        }
        
        // Devolver la lista de personas en formato JSON
        header('Content-Type: application/json');
        echo json_encode($personas); // Cambio de $usuarios a $personas
    } else {
        // No se encontraron personas
        echo json_encode(["estado" => "no_encontrado"]);
    }
} else {
    // Error en la consulta SQL
    echo json_encode(["estado" => "error_consulta"]);
}

// Cerrar la conexión con la base de datos
pg_close($conexion);
?>