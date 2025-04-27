INSERT INTO roles (rol, accesos) VALUES
('admin', '{
    "crear_usuario": true,
    "editar_usuario": true,
    "eliminar_usuario": true,
    "ver_reportes": true
}'),
('usuario', '{
    "crear_usuario": false,
    "editar_usuario": false,
    "eliminar_usuario": false,
    "ver_reportes": true
}');
