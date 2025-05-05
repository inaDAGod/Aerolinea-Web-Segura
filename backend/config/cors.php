<?php
// Permitir orígenes cruzados
header("Access-Control-Allow-Origin: *"); // Reemplaza * por tu dominio en producción
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Si es una solicitud preflight (OPTIONS), detener ejecución aquí
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}