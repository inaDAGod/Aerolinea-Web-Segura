<?php
function generarUserIdPDO($conexion) {
    $sql = "SELECT user_id 
            FROM usuarios 
            WHERE user_id IS NOT NULL AND user_id ~ '^U[0-9]+$'
            ORDER BY LENGTH(user_id) DESC, user_id DESC 
            LIMIT 1";
    $stmt = $conexion->query($sql);

    if ($stmt) {
        $ultimoId = $stmt->fetchColumn();
        error_log("Último user_id encontrado: " . ($ultimoId ?? 'Ninguno'));
        $numero = $ultimoId ? intval(substr($ultimoId, 1)) + 1 : 1;
        return "U" . $numero;
    } else {
        throw new Exception("Error al obtener el último user_id.");
    }
}
?>
