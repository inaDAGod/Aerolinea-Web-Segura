<?php
include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
$conexion = pg_connect("host=localhost dbname=aerolinea user=postgres password=admin");

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

$carnet = $_POST['carnet'] ?? '';
$cvuelo = $_POST['cvuelo'] ?? '';

// Recuperar el último ccheck_in creado
$queryLatestCheckIn = "SELECT MAX(ccheck_in) as last_check_in FROM check_in";
$resultLatestCheckIn = pg_query($conexion, $queryLatestCheckIn);
if ($resultLatestCheckIn && pg_num_rows($resultLatestCheckIn) > 0) {
    $ccheckIn = pg_fetch_result($resultLatestCheckIn, 0, 'last_check_in');

    // Obtener el asiento basado en ci_persona y cvuelo
    $queryGetSeat = "SELECT casiento FROM reservas_personas WHERE ci_persona = $1 AND cvuelo = $2";
    $resultGetSeat = pg_prepare($conexion, "get_seat", $queryGetSeat);
    $resultGetSeat = pg_execute($conexion, "get_seat", array($carnet, $cvuelo));
    if ($resultGetSeat && pg_num_rows($resultGetSeat) > 0) {
        $casiento = pg_fetch_result($resultGetSeat, 0, 'casiento');

        // Determinar el tipo de asiento y el costo correspondiente
        $queryGetTypeAndCost = "SELECT a.tipo_asiento,
                                       CASE a.tipo_asiento
                                           WHEN 'VIP' THEN v.costovip
                                           WHEN 'Business' THEN v.costobusiness
                                           WHEN 'Económico' THEN v.costoeco
                                       END as costo
                                FROM asientos a
                                JOIN vuelos v ON v.cvuelo = $2
                                WHERE a.casiento = $1";
        $resultGetTypeAndCost = pg_prepare($conexion, "get_type_cost", $queryGetTypeAndCost);
        $resultGetTypeAndCost = pg_execute($conexion, "get_type_cost", array($casiento, $cvuelo));
        if ($resultGetTypeAndCost && pg_num_rows($resultGetTypeAndCost) > 0) {
            $row = pg_fetch_assoc($resultGetTypeAndCost);
            $total = $row['costo'];

            // Insertar nuevo boleto utilizando el último ccheck_in
            $queryInsertBoleto = "INSERT INTO boletos (ci_persona, ccheck_in, cvuelo, casiento, total)
                                  VALUES ($1, $2, $3, $4, $5) RETURNING cboleto";
            $resultInsertBoleto = pg_prepare($conexion, "insert_boleto", $queryInsertBoleto);
            $resultInsertBoleto = pg_execute($conexion, "insert_boleto", array($carnet, $ccheckIn, $cvuelo, $casiento, $total));
            if ($resultInsertBoleto && pg_num_rows($resultInsertBoleto) > 0) {
                $cboleto = pg_fetch_result($resultInsertBoleto, 0, 'cboleto');
                echo json_encode(['success' => true, 'cboleto' => $cboleto]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error al insertar el boleto. Compruebe los datos de inserción y las restricciones de la tabla.']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Error al obtener tipo de asiento y costo. Asegúrese de que los datos de casiento y cvuelo son correctos.']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No se pudo obtener el asiento. Verifique que el casiento exista para el cvuelo y ci_persona dados.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'No se pudo obtener el último check-in. Asegúrese de que la tabla check_in no esté vacía.']);
}

pg_close($conexion);
?>
