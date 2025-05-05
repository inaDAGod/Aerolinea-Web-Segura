<?php
include_once(__DIR__ . '/config/cors.php');
// Lee el archivo permisos.json que está en /BD/
$permisosJson = file_get_contents(__DIR__ . '/../BD/permisos.json');

// Devuelve el contenido como JSON al navegador
header('Content-Type: application/json');
echo $permisosJson;
?>
