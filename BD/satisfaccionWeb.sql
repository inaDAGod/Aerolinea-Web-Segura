CREATE TABLE opiniones (
    copinion SERIAL PRIMARY KEY,
    fecha_opinion timestamp  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    nombres_usuario varchar(100)  NOT NULL,
    apellidos_usuario varchar(100)  NOT NULL,
    comentario varchar(500)  NOT NULL,
    estrellas integer  NOT NULL
);

INSERT INTO opiniones (fecha_opinion, correo_usuario, nombres_usuario, apellidos_usuario, comentario, estrellas) VALUES
('2024-05-01 10:15:00', 'jose.perez@example.com', 'Jose', 'Perez', 'Excelente servicio, el vuelo salió a tiempo y la tripulación fue muy amable.', 5),
('2024-05-02 14:30:00', 'maria.lopez@example.com', 'Maria', 'Lopez', 'Muy buena experiencia, volvería a volar con ustedes.', 4),
('2024-05-03 09:45:00', 'juan.garcia@example.com', 'Juan', 'Garcia', 'El vuelo fue cómodo y llegamos antes de lo esperado.', 5),
('2024-05-04 18:20:00', 'ana.martinez@example.com', 'Ana', 'Martinez', 'Todo bien, pero podrían mejorar la comida a bordo.', 3),
('2024-05-05 11:10:00', 'luis.rodriguez@example.com', 'Luis', 'Rodriguez', 'El personal fue muy atento y el vuelo tranquilo.', 4),
('2024-05-06 15:50:00', 'carla.gomez@example.com', 'Carla', 'Gomez', 'Excelente atención y puntualidad, muy recomendable.', 5),
('2024-05-07 08:30:00', 'fernando.fernandez@example.com', 'Fernando', 'Fernandez', 'Buen servicio, aunque hubo un pequeño retraso.', 4),
('2024-05-08 17:00:00', 'laura.morales@example.com', 'Laura', 'Morales', 'Viaje cómodo y seguro, lo recomiendo.', 5),
('2024-05-09 12:25:00', 'oscar.ramos@example.com', 'Oscar', 'Ramos', 'La atención a bordo fue excelente.', 5),
('2024-05-10 19:40:00', 'lucia.torres@example.com', 'Lucia', 'Torres', 'Todo bien, aunque el entretenimiento a bordo es limitado.', 3),
('2024-05-11 13:05:00', 'pablo.mendoza@example.com', 'Pablo', 'Mendoza', 'El vuelo fue placentero y el personal muy amable.', 4),
('2024-05-12 16:15:00', 'sofia.flores@example.com', 'Sofia', 'Flores', 'Muy buena experiencia, repetiré en el futuro.', 5),
('2024-05-13 07:50:00', 'diego.sanchez@example.com', 'Diego', 'Sanchez', 'Hubo un retraso, pero el personal fue muy profesional.', 3),
('2024-05-14 14:00:00', 'camila.diaz@example.com', 'Camila', 'Diaz', 'Excelente servicio y puntualidad.', 5),
('2024-05-15 10:20:00', 'gabriel.romero@example.com', 'Gabriel', 'Romero', 'Todo estuvo bien, pero podrían mejorar el check-in.', 4),
('2024-05-16 18:35:00', 'javier.ortiz@example.com', 'Javier', 'Ortiz', 'El vuelo fue agradable y sin contratiempos.', 5),
('2024-05-17 11:55:00', 'alicia.rivera@example.com', 'Alicia', 'Rivera', 'Muy buena atención y vuelo cómodo.', 4),
('2024-05-18 09:30:00', 'rafael.gutierrez@example.com', 'Rafael', 'Gutierrez', 'Todo excelente, muy recomendable.', 5),
('2024-05-19 17:45:00', 'veronica.ruiz@example.com', 'Veronica', 'Ruiz', 'El personal fue muy atento, aunque el vuelo se retrasó un poco.', 4),
('2024-05-20 12:10:00', 'eduardo.herrera@example.com', 'Eduardo', 'Herrera', 'Excelente experiencia, volveré a volar con Vuela Bo.', 5);
