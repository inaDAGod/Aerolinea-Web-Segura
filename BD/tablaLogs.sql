-- nueva tabla para los logs de aplicación
CREATE TABLE log_app (
    id SERIAL PRIMARY KEY,
    correo_usuario VARCHAR(100) NOT NULL,
    mensaje CHAR(255),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

select * from log_app

CREATE TABLE log_seguridad (
    id_log SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_evento VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    correo_usuario VARCHAR(100),
    ip_origen VARCHAR(45),
    user_agent TEXT,
    detalles_adicionales JSONB,
    severidad VARCHAR(20) CHECK (severidad IN ('INFO', 'ADVERTENCIA', 'ALTA', 'CRITICA')));