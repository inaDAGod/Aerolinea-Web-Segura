<?php
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

    $json = file_get_contents('php://input');
    $data = json_decode($json);
    $username = $data->username;
    $password = $data->password;
    
    // Establecer la conexión con la base de datos
    $conexion = pg_connect("dbname=aerolinea user=postgres password=admin");
    if (!$conexion) {
        die("Error al conectar a la base de datos: " . pg_last_error());
    }
    
    // Consulta SQL para obtener la contraseña y el tipo de usuario del usuario
    $sql = "SELECT contraseña, tipo_usuario, nombres_usuario, apellidos_usuario, millas, 
        password_last_date, EXTRACT(DAY FROM (NOW() - password_last_date)) as dias_desde_cambio 
        FROM usuarios WHERE correo_usuario = '$username'";
    $resultado = pg_query($conexion, $sql);
    
    if ($resultado) {
        // Verificar si se encontró algún resultado
        if (pg_num_rows($resultado) > 0) {
            // Obtener la contraseña y el tipo de usuario almacenados en la base de datos
            $fila = pg_fetch_assoc($resultado);
            $contraseñaBD = $fila['contraseña'];
            $tipoUsuario = $fila['tipo_usuario'];
            $nombres_usuario = $fila['nombres_usuario'];
            $apellidos_usuario = $fila['apellidos_usuario'];
            $millas = $fila['millas'];
            $dias_desde_cambio = $fila['dias_desde_cambio'];
            
            // Verificar si la contraseña coincide
            if ($password === $contraseñaBD) {
                // La contraseña coincide, enviar el estado y el tipo de usuario
                echo json_encode(["estado" => "contraseña_correcta", "tipo_usuario" => $tipoUsuario, "password_expired" => ($dias_desde_cambio > 60)]);
                $_SESSION['correo_usuario'] =$username;
                $_SESSION['tipo_usuario'] = $tipoUsuario;
                $_SESSION['nombres_usuario'] =$nombres_usuario;
                $_SESSION['apellidos_usuario'] = $apellidos_usuario;
                $_SESSION['millas'] =$millas;
            } else {
                // La contraseña no coincide
                echo json_encode(["estado" => "contraseña_incorrecta"]);
            }
        } else {
            // No se encontró ningún usuario con el correo electrónico proporcionado
            echo json_encode(["estado" => "usuario_no_encontrado"]);
        }
    } else {
        // Error en la consulta SQL
        echo json_encode(["estado" => "error_consulta"]);
    }
    
    // Cerrar la conexión con la base de datos
    pg_close($conexion);
?>
