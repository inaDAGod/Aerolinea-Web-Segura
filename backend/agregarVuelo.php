<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    echo json_encode(['success' => false, 'error' => 'No se pudo conectar a la base de datos']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'];

if ($method == 'GET') {
    $sql = "SELECT ciudad FROM ciudad";
    $resultado = pg_query($conexion, $sql);
    $ciudades = [];
    while ($fila = pg_fetch_assoc($resultado)) {
        array_push($ciudades, $fila['ciudad']);
    }
    echo json_encode($ciudades);
} elseif ($method == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['origen']) || empty($data['destino']) || empty($data['avion']) ||
        empty($data['fecha_vuelo']) || empty($data['hora']) ||
        !is_numeric($data['costo_vip']) || !is_numeric($data['costo_business']) || !is_numeric($data['costo_economico'])) {
        echo json_encode(['success' => false, 'error' => 'Todos los campos deben estar llenos y los costos deben ser números']);
        exit;
    }

    if ($data['origen'] === $data['destino']) {
        echo json_encode(['success' => false, 'error' => 'El origen y el destino no pueden ser el mismo']);
        exit;
    }

    if ($data['costo_vip'] < 100 || $data['costo_vip'] > 3500 ||
        $data['costo_business'] < 100 || $data['costo_business'] > 3500 ||
        $data['costo_economico'] < 100 || $data['costo_economico'] > 3500) {
        echo json_encode(['success' => false, 'error' => 'Los costos deben estar entre 100 y 3500']);
        exit;
    }

    // Concatenar la fecha y la hora correctamente
    $fechaVuelo = $data['fecha_vuelo'] . ' ' . $data['hora'];

    $sql = "INSERT INTO vuelos (fecha_vuelo, costovip, origen, destino, costobusiness, costoeco) 
            VALUES ('$fechaVuelo', '{$data['costo_vip']}', '{$data['origen']}', '{$data['destino']}', '{$data['costo_business']}', '{$data['costo_economico']}') RETURNING cvuelo";
    $resultado = pg_query($conexion, $sql);

    if ($resultado) {
        $row = pg_fetch_assoc($resultado);
        $cvuelo = $row['cvuelo'];
        
        for ($i = 1; $i <= 80; $i++) {
            $casiento = 'Asiento ' . $i;
            $sql = "INSERT INTO asientos_vuelo (cvuelo, casiento, cavion)
                    VALUES ('$cvuelo', '$casiento', '{$data['avion']}')
                    ON CONFLICT (cvuelo, casiento) DO NOTHING;";
            pg_query($conexion, $sql);
        }
        
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Error al insertar el vuelo']);
    }
}

pg_close($conexion);
?>
