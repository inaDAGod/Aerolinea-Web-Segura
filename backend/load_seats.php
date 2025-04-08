<?php
session_start();

include 'conexion.php';
include 'functions.php';


$reservation_counter = isset($_SESSION['reservation_counter']) ? $_SESSION['reservation_counter'] : 0;
$cvuelosnum = isset($_SESSION['cvuelosnum']) ? $_SESSION['cvuelosnum'] : 0;
$creservanum = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : 0;


$_SESSION['cvuelosnum'] = $cvuelosnum;
$_SESSION['creservanum'] = $creservanum;

// Obtén el número de vuelo de la sesión
$cvuelosnum = isset($_SESSION['cvuelosnum']) ? $_SESSION['cvuelosnum'] : null;

if ($cvuelosnum) {
    // Consulta el avión para el vuelo dado
    $query_cavion = "SELECT cavion FROM asientos_vuelo WHERE cvuelo = :cvuelo LIMIT 1";
    $stmt_cavion = $conn->prepare($query_cavion);
    $stmt_cavion->bindParam(':cvuelo', $cvuelosnum);
    $stmt_cavion->execute();
    $cavion_result = $stmt_cavion->fetch(PDO::FETCH_ASSOC);

   

    if ($cavion_result) {
        $cavion = $cavion_result['cavion'];

        // Consulta los tipos de asientos disponibles para el avión seleccionado
        $query_tipos_asiento = "SELECT DISTINCT tipo_asiento FROM asientos WHERE cavion = :cavion ORDER BY tipo_asiento";
        $stmt_tipos_asiento = $conn->prepare($query_tipos_asiento);
        $stmt_tipos_asiento->bindParam(':cavion', $cavion);
        $stmt_tipos_asiento->execute();
        $tipos_asiento = $stmt_tipos_asiento->fetchAll(PDO::FETCH_COLUMN);

        // Consulta los asientos disponibles para el avión seleccionado, excluyendo los asientos reservados
        $query_asientos = "SELECT a.casiento, a.tipo_asiento FROM asientos a LEFT JOIN reservas_personas r ON a.casiento = r.casiento WHERE a.cavion = :cavion AND r.cvuelo IS NULL ORDER BY SUBSTRING(a.casiento, 1, 1), a.casiento";
        $stmt_asientos = $conn->prepare($query_asientos);
        $stmt_asientos->bindParam(':cavion', $cavion);
        $stmt_asientos->execute();
        $asientos_disponibles = $stmt_asientos->fetchAll(PDO::FETCH_ASSOC);

        // Inicializa la matriz para almacenar los asientos por fila
        $asientos_por_fila = array();
        foreach ($asientos_disponibles as $asiento) {
            $fila = substr($asiento['casiento'], 0, -1);
            $asientos_por_fila[$fila][$asiento['tipo_asiento']] = $asiento['casiento'];
        }

        // Genera la tabla de asientos
        echo '<table border="1" style="margin-left:30%" class="table table-striped">';
        echo '<tr>';
        foreach ($tipos_asiento as $tipo) {
            echo '<th>' . $tipo . '</th>';
        }
        echo '</tr>';

        foreach ($asientos_por_fila as $fila => $asientos) {
            echo '<tr>';
            foreach ($tipos_asiento as $tipo) {
                echo '<td>';
                if (isset($asientos[$tipo])) {
                    // Muestra el número de asiento junto con el botón de radio
                    echo '<label><input type="radio" name="casiento_seleccionado" value="' . $asientos[$tipo] . '"> ' . $asientos[$tipo] . '</label>';
                }
                echo '</td>';
            }
            echo '</tr>';
        }

        echo '</table>';
    } else {
        echo "No se encontró el avión para el vuelo dado.";
    }
} else {
    echo "No se ha especificado un número de vuelo.";
}
?>
