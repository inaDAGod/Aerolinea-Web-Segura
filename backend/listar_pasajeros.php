<?php
include_once(__DIR__ . '/config/cors.php');

header('Content-Type: application/json');

// Habilitar la visualización de errores (para desarrollo, deshabilitar en producción)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Establecer la conexión con la base de datos
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos: ' . pg_last_error()]);
    exit;
}

// Obtener el valor del documento, nombre y apellido del POST si están presentes
$documento = $_POST['documento'] ?? '';
$nombre = $_POST['nombre'] ?? '';
$apellido = $_POST['apellido'] ?? '';

// Consulta SQL base para obtener la lista de todas las personas
$query = "SELECT p.tipo_persona as tipo_pasajero, rp.casiento as asiento, a.tipo_asiento, p.nombres, p.apellidos, p.ci_persona as documento, ci.estado_checkin
            FROM personas p
            JOIN reservas_personas rp ON p.ci_persona = rp.ci_persona
            JOIN asientos_vuelo av ON rp.cvuelo = av.cvuelo AND rp.casiento = av.casiento
            JOIN asientos a ON av.cavion = a.cavion AND av.casiento = a.casiento
            JOIN check_in ci ON p.ci_persona = ci.numero_documento
            WHERE 1=1"; // Comenzamos con una condición siempre verdadera

$params = array();
$paramIndex = 1;

// Si se proporciona un número de documento, agregamos una cláusula WHERE para filtrar por ese documento
if ($documento) {
    $query .= " AND p.ci_persona = $" . $paramIndex;
    $params[] = $documento;
    $paramIndex++;
}

// Si se proporciona un nombre, agregamos una cláusula WHERE para filtrar por ese nombre
if ($nombre) {
    $query .= " AND p.nombres ILIKE $" . $paramIndex;
    $params[] = '%' . $nombre . '%'; // Utilizamos ILIKE para hacer una búsqueda insensible a mayúsculas y minúsculas
    $paramIndex++;
}

// Si se proporciona un apellido, agregamos una cláusula WHERE para filtrar por ese apellido
if ($apellido) {
    $query .= " AND p.apellidos ILIKE $" . $paramIndex;
    $params[] = '%' . $apellido . '%'; // Utilizamos ILIKE para hacer una búsqueda insensible a mayúsculas y minúsculas
    $paramIndex++;
}

// Preparamos la consulta
$result = pg_prepare($conexion, "my_query", $query);
if (!$result) {
    echo json_encode(['error' => 'Error en la preparación de la consulta: ' . pg_last_error()]);
    exit;
}

// Ejecutamos la consulta con los valores proporcionados
$result = pg_execute($conexion, "my_query", $params);

if (!$result) {
    echo json_encode(['error' => 'Error en la ejecución de la consulta: ' . pg_last_error()]);
    exit;
}

// Procesamos los resultados
$data = pg_fetch_all($result);
if ($data) {
    echo json_encode($data);
} else {
    echo json_encode([]);
}

// Cerramos la conexión con la base de datos
pg_close($conexion);
?>
