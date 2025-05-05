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

// Consulta SQL para obtener la cantidad de vuelos por ciudad
$query1 = "SELECT destino AS ciudad, COUNT(*) AS cantidad_vuelos FROM vuelos GROUP BY destino";

// Ejecuta la primera consulta
$result1 = pg_query($conexion, $query1);

if (!$result1) {
    echo json_encode(['error' => 'Error en la ejecución de la primera consulta: ' . pg_last_error()]);
    exit;
}

// Procesa los resultados de la primera consulta y los agrega al array
$data1 = pg_fetch_all($result1);

// Consulta SQL para obtener las personas con más millas acumuladas
$query2 = "SELECT correo_usuario, nombres_usuario, apellidos_usuario, millas FROM usuarios ORDER BY millas DESC LIMIT 10";

// Ejecuta la segunda consulta
$result2 = pg_query($conexion, $query2);

if (!$result2) {
    echo json_encode(['error' => 'Error en la ejecución de la segunda consulta: ' . pg_last_error()]);
    exit;
}

// Procesa los resultados de la segunda consulta y los agrega al array
$data2 = pg_fetch_all($result2);

// Consulta SQL para obtener la cantidad de reservas por estado
$query3 = "SELECT estado_reserva, COUNT(*) AS cantidad_reservas FROM reservas_personas GROUP BY estado_reserva";

// Ejecuta la tercera consulta
$result3 = pg_query($conexion, $query3);

if (!$result3) {
    echo json_encode(['error' => 'Error en la ejecución de la tercera consulta: ' . pg_last_error()]);
    exit;
}

// Procesa los resultados de la tercera consulta y los agrega al array
$data3 = pg_fetch_all($result3);

// Consulta SQL para obtener la distribución de personas por sexo
$query4 = "SELECT sexo, COUNT(*) AS cantidad FROM personas GROUP BY sexo";

// Ejecuta la consulta
$result4 = pg_query($conexion, $query4);

if (!$result4) {
    echo json_encode(['error' => 'Error en la ejecución de la consulta 4: ' . pg_last_error()]);
    exit;
}

// Procesa los resultados y los agrega al array
$data4 = pg_fetch_all($result4);
//while ($row = pg_fetch_assoc($result)) {
  //  $data[$row['sexo']] = $row['cantidad'];
//}

// Cierra la conexión con la base de datos
pg_close($conexion);

// Devuelve los datos en formato JSON
echo json_encode(['vuelos_por_ciudad' => $data1, 'personas_con_mas_millas' => $data2, 'reservas_por_estado' => $data3, 'distribucion_por_sexo' => $data4]);
?>
