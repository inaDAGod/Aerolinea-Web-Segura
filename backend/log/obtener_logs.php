<?php
require_once(__DIR__ . '/../config/db_connection.php');
require_once(__DIR__ . '/../config/cors.php');

header("Content-Type: application/json; charset=UTF-8");

// Verificar conexión a la base de datos
if (!isset($conexion)) {
    http_response_code(500);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error de configuración: conexión a BD no disponible'
    ]);
    exit;
}

try {
    // Parámetros de paginación (opcionales)
    $pagina = isset($_GET['pagina']) ? intval($_GET['pagina']) : 1;
    $registrosPorPagina = isset($_GET['por_pagina']) ? intval($_GET['por_pagina']) : 10;
    $offset = ($pagina - 1) * $registrosPorPagina;

    // Filtros (opcionales)
    $filtroSeveridad = isset($_GET['severidad']) ? $_GET['severidad'] : null;
    $filtroUsuario = isset($_GET['usuario']) ? $_GET['usuario'] : null;
    $filtroFechaInicio = isset($_GET['fecha_inicio']) ? $_GET['fecha_inicio'] : null;
    $filtroFechaFin = isset($_GET['fecha_fin']) ? $_GET['fecha_fin'] : null;

    // Construir la consulta base
    $sql = "SELECT * FROM log_seguridad WHERE 1=1";
    $params = [];

    // Aplicar filtros
    if ($filtroSeveridad) {
        $sql .= " AND severidad = :severidad";
        $params[':severidad'] = $filtroSeveridad;
    }

    if ($filtroUsuario) {
        $sql .= " AND correo_usuario LIKE :usuario";
        $params[':usuario'] = '%' . $filtroUsuario . '%';
    }

    if ($filtroFechaInicio && $filtroFechaFin) {
        $sql .= " AND fecha_hora BETWEEN :fecha_inicio AND :fecha_fin";
        $params[':fecha_inicio'] = $filtroFechaInicio;
        $params[':fecha_fin'] = $filtroFechaFin;
    }

    // Ordenación (por defecto: más recientes primero)
    $sql .= " ORDER BY fecha_hora DESC";

    // Consulta para obtener el total de registros (para paginación)
    $sqlTotal = "SELECT COUNT(*) as total FROM (" . $sql . ") AS subquery";
    $stmtTotal = $conexion->prepare($sqlTotal);
    foreach ($params as $key => $value) {
        $stmtTotal->bindValue($key, $value);
    }
    $stmtTotal->execute();
    $totalRegistros = $stmtTotal->fetch(PDO::FETCH_ASSOC)['total'];

    // Añadir paginación a la consulta principal
    $sql .= " LIMIT :limit OFFSET :offset";
    $params[':limit'] = $registrosPorPagina;
    $params[':offset'] = $offset;

    // Ejecutar consulta principal
    $stmt = $conexion->prepare($sql);
    foreach ($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $logs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Formatear respuesta
    $respuesta = [
        'estado' => 'exito',
        'pagina_actual' => $pagina,
        'total_paginas' => ceil($totalRegistros / $registrosPorPagina),
        'total_registros' => $totalRegistros,
        'registros_por_pagina' => $registrosPorPagina,
        'datos' => $logs
    ];

    echo json_encode($respuesta);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        'estado' => 'error',
        'mensaje' => 'Error en la base de datos',
        'error' => $e->getMessage()
    ]);
}