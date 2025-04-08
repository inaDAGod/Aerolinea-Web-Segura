<?php
session_start();

// Check if the session variable 'correo_usuario' is set
if (isset($_SESSION['correo_usuario'])) {
    // Return the 'correo_usuario' session variable
    echo json_encode(["correo_usuario" => $_SESSION['correo_usuario']]);
} else {
    // Return an error if 'correo_usuario' is not set
    echo json_encode(["error" => "El correo del usuario no está definido en la sesión."]);
}
?>
