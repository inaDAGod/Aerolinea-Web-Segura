<?php
include_once(__DIR__ . '/config/cors.php');
if (isset($_GET['origen']) || isset($_GET['destino']) || isset($_GET['fecha_vuelo'])) {
    $origen = $_GET['origen'] ?? '';
    $destino = $_GET['destino'] ?? '';
    $fecha_vuelo = $_GET['fecha_vuelo'] ?? '';

    include_once(__DIR__ . '/config/cors.php');
header('Content-Type: application/json');
include_once(__DIR__ . '/config/db_connection.php'); // <-- Usa la conexión centralizada

if (!$conexion) {
    echo json_encode(['error' => 'Error al conectar a la base de datos']);
    exit;
}

    try {
        // Conexión a la base de datos
        $dsn = "pgsql:host=$host;dbname=$dbname";
        $pdo = new PDO($dsn, $user, $password, [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

        // Filtrado de vuelos según los criterios especificados
        $sql = "SELECT cvuelo, fecha_vuelo, origen, destino, costovip, costobusiness, costoeco FROM vuelos WHERE 1=1";

        if (!empty($origen)) {
            $sql .= " AND origen = :origen";
        }
        if (!empty($destino)) {
            $sql .= " AND destino = :destino";
        }
        if (!empty($fecha_vuelo)) {
            $sql .= " AND DATE(fecha_vuelo) = :fecha_vuelo";
        }

        $sql .= " ORDER BY fecha_vuelo ASC";

        $stmt = $pdo->prepare($sql);
        $params = [];

        if (!empty($origen)) {
            $params['origen'] = $origen;
        }
        if (!empty($destino)) {
            $params['destino'] = $destino;
        }
        if (!empty($fecha_vuelo)) {
            $params['fecha_vuelo'] = $fecha_vuelo;
        }

        $stmt->execute($params);

        $vuelos = $stmt->fetchAll(PDO::FETCH_ASSOC);

        if ($vuelos) {
            echo "<table border='1'>
                    <tr>
                        <th>Vuelo</th>
                        <th>Fecha</th>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>VIP</th>
                        <th>Business</th>
                        <th>Económica</th>
                        <th>Reservar</th>
                    </tr>";
            foreach ($vuelos as $vuelo) {
                echo "<tr>
                        <td>{$vuelo['cvuelo']}</td>
                        <td>{$vuelo['fecha_vuelo']}</td>
                        <td>{$vuelo['origen']}</td>
                        <td>{$vuelo['destino']}</td>
                        <td>{$vuelo['costovip']}</td>
                        <td>{$vuelo['costobusiness']}</td>
                        <td>{$vuelo['costoeco']}</td>
                        <td><a href='reserva.php?codigo_vuelo={$vuelo['cvuelo']}'>Reservar</a></td>


                    </tr>";
            }
            echo "</table>";
        } else {
            echo "No se encontraron vuelos.";
        }

    } catch (PDOException $e) {
        // Manejo de errores de la conexión
        echo 'Error: ' . $e->getMessage();
    }
} else {
    echo "Por favor complete todos los campos del formulario.";
}
?>
