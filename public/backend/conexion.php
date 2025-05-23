<?php
$db_host = getenv('postgres.railway.internal');
$db_port = getenv('5432');
$db_name = getenv('railway');
$db_user = getenv('postgres');
$db_pass = getenv('llDPtkaaNdFDGwTyHBQIlQDQSENHgCOH');

$conn_string = "host=$db_host port=$db_port dbname=$db_name user=$db_user password=$db_pass";
$conexion = pg_connect($conn_string);

if (!$conexion) {
    die("No se pudo conectar a la base de datos");
}