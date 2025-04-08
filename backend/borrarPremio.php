<?php

$json = file_get_contents('php://input');
$data = json_decode($json);
$premio = $data->premio;

$conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
if (!$conexion) {
    die("Error al conectar a la base de datos: " . pg_last_error());
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
