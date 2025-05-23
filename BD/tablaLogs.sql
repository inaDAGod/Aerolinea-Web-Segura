-- nueva tabla para los logs de aplicación
CREATE TABLE log_app (
    id SERIAL PRIMARY KEY,
    correo_usuario VARCHAR(100) NOT NULL,
    mensaje CHAR(255),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

select * from log_app