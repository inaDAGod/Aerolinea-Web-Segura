<?php
function obtener_cvuelo_del_asiento($conn, $casiento_seleccionado) {
    try {
        $query = "SELECT cvuelo FROM asientos_vuelo WHERE casiento = :casiento";
        $stmt = $conn->prepare($query);
        $stmt->bindParam(':casiento', $casiento_seleccionado);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result ? $result['cvuelo'] : false;
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
        return false;
    }
}

// En functions.php

// En functions.php

function determinarTipoPersona(&$adum, &$adu, &$nin) {
    if ($adum > 0) {
        $tipo_persona = 'Adulto mayor';
        $adum--; // Decrement adum here
    } elseif ($adu > 0) {
        $tipo_persona = 'Adulto';
        $adu--; // Decrement adu here
    } elseif ($nin > 0) {
        $tipo_persona = 'Niño';
        $nin--; // Decrement nin here
    } else {
        $tipo_persona = 'No especificado';
    }
    return $tipo_persona;
}

?>
