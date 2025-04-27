<?php
// Verificar si se han enviado archivos y el resto de los datos necesarios
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['foto'])) {
    // Obtener los datos del formulario
    $premioOriginal = $_POST['premioOriginal']; // Este es el nombre original del premio antes de la edición
    $premio = $_POST['premio'];
    $millas = $_POST['millas'];
    $destacado = $_POST['producto_destacado'];
    $tipoProducto = $_POST['tipo_premio'];

    // Procesar el archivo de imagen
    if ($_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $nombre_archivo = $_FILES['foto']['name'];
        $ruta_temporal = $_FILES['foto']['tmp_name'];
        $ruta_destino = "../public/assets/" . $nombre_archivo;
        $src_foto = "/Aerolinea-Web-Segura/public/assets/".$nombre_archivo;
        
        // Mover el archivo a su ubicación final
        if (move_uploaded_file($ruta_temporal, $ruta_destino)) {
            // Conectar a la base de datos
            $conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
            if (!$conexion) {
                die("Error al conectar a la base de datos: " . pg_last_error());
            }

            // Actualizar los datos en la base de datos
            $sql = "UPDATE premios_millas SET premio = '$premio', tipo_premio = '$tipoProducto', producto_destacado = '$destacado', millas = $millas, src_foto = '$src_foto' WHERE premio = '$premioOriginal'";
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
