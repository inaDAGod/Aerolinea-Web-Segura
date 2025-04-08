<?php
// Verificar si se han enviado archivos
if ($_FILES['foto']) {
    // Obtener los datos del formulario
    $premio = $_POST['premio'];
    $millas = $_POST['millas'];
    $destacado = $_POST['destacado'];
    $tipoProducto = $_POST['tipoProducto'];

    // Procesar el archivo de imagen
    if ($_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $nombre_archivo = $_FILES['foto']['name'];
        $ruta_temporal = $_FILES['foto']['tmp_name'];
        $ruta_destino = "../public/assets/" . $nombre_archivo;
        $src_foto = "/SistemaWeb-Aerolinea/public/assets/".$nombre_archivo;
        // Mover el archivo a su ubicación final
        if (move_uploaded_file($ruta_temporal, $ruta_destino)) {
            // Conectar a la base de datos
            $conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
            if (!$conexion) {
                die("Error al conectar a la base de datos: " . pg_last_error());
            }

            // Insertar los datos en la base de datos
            $sql = "INSERT INTO premios_millas (premio, tipo_premio, producto_destacado, millas, src_foto) VALUES ('$premio', '$tipoProducto', $destacado, $millas, '$src_foto')";
            $resultado = pg_query($conexion, $sql);
            
            if ($resultado) {
                $response = array('estado' => 'registro_exitoso');
                echo json_encode($response);
            } else {
                $response = array('estado' => 'error_registro');
                echo json_encode($response);
            }

            // Cerrar la conexión
            pg_close($conexion);
        } else {
            // Error al mover el archivo
            $response = array('estado' => 'error_archivo');
            echo json_encode($response);
        }
    } else {
        // Error en la carga del archivo
        $response = array('estado' => 'error_carga_archivo');
        echo json_encode($response);
    }
} else {
    // Error: no se han enviado archivos
    $response = array('estado' => 'error_no_archivo');
    echo json_encode($response);
}
?>
