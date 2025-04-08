<?php

session_start();
include 'conexion.php';
include 'functions.php';

// Obtener valores de la sesión o inicializarlos en caso de que no existan
$adum = isset($_SESSION['adum']) ? $_SESSION['adum'] : 0;
$adu = isset($_SESSION['adu']) ? $_SESSION['adu'] : 0;
$nin = isset($_SESSION['nin']) ? $_SESSION['nin'] : 0;
$totalg = isset($_SESSION['total_people']) ? $_SESSION['total_people'] : 0;
$reservation_counter = isset($_SESSION['reservation_counter']) ? $_SESSION['reservation_counter'] : 0;
$cvuelosnum = isset($_SESSION['cvuelosnum']) ? $_SESSION['cvuelosnum'] : 0;
$creservanum = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : 0;

// Procesar datos del formulario si se ha enviado
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Resto del código...

    // Obtener datos del formulario
    $ci_persona = isset($_POST['ci_persona']) ? $_POST['ci_persona'] : null;
    $nombres = isset($_POST['nombres']) ? $_POST['nombres'] : null;
    $apellidos = isset($_POST['apellidos']) ? $_POST['apellidos'] : null;
    $fecha_nacimiento = isset($_POST['fecha_nacimiento']) ? $_POST['fecha_nacimiento'] : null;
    $sexo = isset($_POST['sexo']) ? $_POST['sexo'] : null;
    $casiento_seleccionado = isset($_POST['casiento_seleccionado']) ? $_POST['casiento_seleccionado'] : null;

    // Debugging: Registrar datos de entrada
    error_log("CI: $ci_persona, Nombres: $nombres, Apellidos: $apellidos, Fecha de Nacimiento: $fecha_nacimiento, Sexo: $sexo, Asiento: $casiento_seleccionado");

    // Establecer cvuelo igual a cvuelosnum de la sesión
    $cvuelo = $cvuelosnum;
    echo "Valor de cvuelo: $cvuelo";

    $stmt_check_person = $conn->prepare("SELECT COUNT(*) AS count FROM personas WHERE ci_persona = :ci_persona");
    $stmt_check_person->bindParam(':ci_persona', $ci_persona);
    $stmt_check_person->execute();
    $person_exists = $stmt_check_person->fetch(PDO::FETCH_ASSOC)['count'] > 0;

    if (!$person_exists) {
        // Si la persona no existe, insertarla en la tabla personas
        if (!empty($ci_persona)) {
            try {
                // Insertar datos en la tabla personas
                $stmt = $conn->prepare("INSERT INTO personas (ci_persona, nombres, apellidos, fecha_nacimiento, sexo, tipo_persona) 
                    VALUES (:ci_persona, :nombres, :apellidos, :fecha_nacimiento, :sexo, :tipo_persona)");

                // Determinar el tipo_persona basado en el número de cada tipo de persona
                if ($adum > 0) {
                    $tipo_persona = 'Adulto mayor';
                    $adum--; // Decrementar el conteo de Adulto mayor después de asignarlo
                } elseif ($adu > 0) {
                    $tipo_persona = 'Adulto';
                    $adu--; // Decrementar el conteo de Adulto después de asignarlo
                } elseif ($nin > 0) {
                    $tipo_persona = 'Niño';
                    $nin--; // Decrementar el conteo de Niño después de asignarlo
                } else {
                    $tipo_persona = 'No especificado';
                }

                // Vincular parámetros y ejecutar la declaración
                $stmt->bindParam(':ci_persona', $ci_persona);
                $stmt->bindParam(':nombres', $nombres);
                $stmt->bindParam(':apellidos', $apellidos);
                $stmt->bindParam(':fecha_nacimiento', $fecha_nacimiento);
                $stmt->bindParam(':sexo', $sexo);
                $stmt->bindParam(':tipo_persona', $tipo_persona);
                $stmt->execute();

            } catch(PDOException $e) {
                echo "Error: " . $e->getMessage();
                // Manejar el error según sea necesario
            }
        }
    }

    // Debugging: Mostrar los datos a insertar en la tabla reservas_personas
    
    if (!empty($ci_persona)) {
        $creserva = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : null;
        $estado_reserva = 'Pendiente';
        $stmt = $conn->prepare("INSERT INTO reservas_personas (creserva, ci_persona, estado_reserva, cvuelo, casiento) VALUES (:creserva, :ci_persona, :estado_reserva, :cvuelo, :casiento)");
        $stmt->bindParam(':creserva', $creserva);
        $stmt->bindParam(':ci_persona', $ci_persona);
        $stmt->bindParam(':estado_reserva', $estado_reserva);
        $stmt->bindParam(':cvuelo', $cvuelo);
        $stmt->bindParam(':casiento', $casiento_seleccionado);
        $stmt->execute();
        $_SESSION['reservation_counter']++;

        $_SESSION['adum'] = $adum; // Actualizar la variable de sesión adum
        $_SESSION['adu'] = $adu; // Actualizar la variable de sesión adu
        $_SESSION['nin'] = $nin; // Actualizar la variable de sesión nin

        echo '<div class="success-message">¡Reserva exitosa!</div>';

        // Redireccionar si se han completado todas las reservas
        if ($_SESSION['reservation_counter'] >= $totalg) {
            echo "REDIRECT";
            exit; // Asegurar que el script termine después de la respuesta
        } else {
            echo "SUCCESS";
            // Otros mensajes o acciones si es necesario
        }
    }
}

?>
