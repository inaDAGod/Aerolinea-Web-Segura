<?php
include_once(__DIR__ . '/config/cors.php');
session_start();

$creservanum = isset($_SESSION['creservanum']) ? $_SESSION['creservanum'] : 0;

// Parámetros de conexión
$host = 'localhost';
$dbname = 'aerolinea';
$username = 'postgres';
$password = 'admin';

try {
    $conn = new PDO("pgsql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT 
                p.tipo_persona,
                p.nombres AS nombre,
                p.apellidos AS apellido,
                p.ci_persona AS ci_persona,  -- Nota: no se necesita alias
                p.fecha_nacimiento,
                rp.casiento AS asiento
            FROM 
                personas p
            JOIN 
                reservas_personas rp ON p.ci_persona = rp.ci_persona
            JOIN 
                reservas r ON rp.creserva = r.creserva
            WHERE 
                r.creserva = :creserva";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':creserva', $creservanum, PDO::PARAM_INT);
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($result);
} catch (PDOException $e) {
    echo json_encode(["error" => $e->getMessage()]);
}
?>
