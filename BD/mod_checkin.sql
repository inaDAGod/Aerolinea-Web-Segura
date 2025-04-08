
--Datos que ingresé en mi base de datos para pruebitas
INSERT INTO ciudad (ciudad) VALUES
('La Paz'),
('Cochabamba'),
('Santa Cruz'),
('Sucre'),
('Potosí');

INSERT INTO pais_proce (pais_origen) VALUES
('Bolivia'),
('Perú'),
('Brasil'),
('Argentina'),
('Chile');

INSERT INTO tipo_doc (tipodoc) VALUES
('DNI'),
('Pasaporte'),
('Carnet de Identidad');

INSERT INTO aviones (capacidad) VALUES
(DEFAULT, 150),
(DEFAULT, 90),
(DEFAULT, 80),
(DEFAULT, 120),
(DEFAULT, 100);

INSERT INTO personas (ci_persona, nombres, apellidos, fecha_nacimiento, sexo, tipo_persona, pais_origen) VALUES
('1234567', 'Juan', 'Perez', '1990-05-15', 'Masculino', 'Adulto mayor', 'Bolivia'),
('2345678', 'Maria', 'Gomez', '1985-08-20', 'Femenino', 'Adulto', 'Bolivia'),
('3456789', 'Carlos', 'Lopez', '1978-03-10', 'Masculino', 'Niño', 'Bolivia'),
('4567890', 'Laura', 'Rodriguez', '1995-11-25', 'Femenino', 'Adulto', 'Bolivia'),
('5678901', 'Pedro', 'Martinez', '1980-07-03', 'Masculino', 'Adulto mayor', 'Bolivia');

INSERT INTO estados_reserva (estado_reserva) VALUES
('Confirmada'),
('Pendiente'),
('Cancelada');

INSERT INTO check_in (correo_usuario, fecha_check_in, numero_documento, tipodoc, equipaje_mano, maleta, equipaje_extra) VALUES
('juan@gmail.com', '2024-06-09', '1234567', 'DNI', true, false, true),
('maria@gmail.com', '2024-06-11', '2345678', 'Pasaporte', true, true, false),
('carlos@gmail.com', '2024-06-14', '3456789', 'Carnet de Identidad', false, true, false),
('laura@gmail.com', '2024-06-17', '4567890', 'DNI', true, false, false),
('pedro@gmail.com', '2024-06-19', '5678901', 'Pasaporte', true, true, true);

INSERT INTO vuelos (fecha_vuelo, costo, origen, destino) VALUES
('2024-06-10 08:00:00', 500.00, 'La Paz', 'Santa Cruz'),
('2024-06-12 10:30:00', 400.00, 'Cochabamba', 'Sucre'),
('2024-06-15 12:45:00', 600.00, 'Santa Cruz', 'La Paz'),
('2024-06-18 14:20:00', 350.00, 'Sucre', 'Cochabamba'),
('2024-06-20 16:10:00', 700.00, 'La Paz', 'Cochabamba');

INSERT INTO asientos (casiento, cavion, tipo_asiento) VALUES
('A1', 1, 'Ventana'),
('A2', 1, 'Pasillo'),
('B1', 2, 'Ventana'),
('B2', 2, 'Pasillo'),
('C1', 3, 'Ventana');

INSERT INTO asientos_vuelo (cvuelo, casiento, cavion) VALUES
(1, 'A1', 1),
(1, 'A2', 1),
(2, 'B1', 2),
(2, 'B2', 2),
(3, 'C1', 3);

INSERT INTO reservas (correo_usuario, fecha_reserva, fecha_lmite) VALUES
('juan@gmail.com', '2024-06-05', '2024-06-08'),
('maria@gmail.com', '2024-06-07', '2024-06-10'),
('carlos@gmail.com', '2024-06-10', '2024-06-13'),
('laura@gmail.com', '2024-06-13', '2024-06-16'),
('pedro@gmail.com', '2024-06-15', '2024-06-18');

INSERT INTO reservas_personas (creserva, ci_persona, estado_reserva, cvuelo, casiento) VALUES
(1, '1234567', 'Confirmada', 1, 'A1'),
(2, '2345678', 'Pendiente', 2, 'B1'),
(3, '3456789', 'Cancelada', 3, 'C1'),
(4, '4567890', 'Confirmada', 1, 'A2'),
(5, '5678901', 'Pendiente', 2, 'B2');

--okay como después me d cuenta de añadir el estado a check_in usé
--añadir una coluna a la tabla check_in sobre el estado del mismo

--está con varchar pero los datos que debe tener son solo PENDIENTE Y REALIZADO
alter table check_in
add column estado_checkin varchar (20);


--si tienen datos previos en sus bds y quieren añadir el estado del check-in para probarlo
--pueden usar

UPDATE check_in
SET estado_checkin = 'pendiente'
WHERE fecha_check_in BETWEEN '2024-06-015' AND '2024-06-20';

-- Marcar el check-in como "Realizado" para los pasajeros que han completado el check-in dentro del rango de fechas
UPDATE check_in
SET estado_checkin = 'Realizado'
WHERE fecha_check_in BETWEEN '2024-06-01' AND '2024-06-14';


--Para probar que de correctamente en el PGADMIN inserté


SELECT p.tipo_persona as tipo_pasajero, rp.casiento as asiento, a.tipo_asiento, p.nombres, p.apellidos, p.ci_persona as documento, ci.estado_checkin
FROM personas p
JOIN reservas_personas rp ON p.ci_persona = rp.ci_persona
JOIN asientos_vuelo av ON rp.cvuelo = av.cvuelo AND rp.casiento = av.casiento
JOIN asientos a ON av.cavion = a.cavion AND av.casiento = a.casiento
JOIN check_in ci ON p.ci_persona = ci.numero_documento
WHERE p.ci_persona = '5678901';

--------------
--lo que yo inserte para que de Att Daniela:
INSERT INTO ciudad (ciudad) VALUES
('La Paz'),
('Cochabamba'),
('Santa Cruz'),
('Sucre'),
('Potosí');

INSERT INTO pais_proce (pais_origen) VALUES
('Bolivia'),
('Perú'),
('Brasil'),
('Argentina'),
('Chile');

INSERT INTO tipo_doc (tipodoc) VALUES
('DNI'),
('Pasaporte'),
('Carnet de Identidad');

INSERT INTO aviones (capacidad) VALUES
( 150),
( 90),
( 80),
( 120),
( 100);

INSERT INTO personas (ci_persona, nombres, apellidos, fecha_nacimiento, sexo, tipo_persona, pais_origen) VALUES
('1234567', 'Juan', 'Perez', '1990-05-15', 'Masculino', 'Adulto mayor', 'Bolivia'),
('2345678', 'Maria', 'Gomez', '1985-08-20', 'Femenino', 'Adulto', 'Bolivia'),
('3456789', 'Carlos', 'Lopez', '1978-03-10', 'Masculino', 'Niño', 'Bolivia'),
('4567890', 'Laura', 'Rodriguez', '1995-11-25', 'Femenino', 'Adulto', 'Bolivia'),
('5678901', 'Pedro', 'Martinez', '1980-07-03', 'Masculino', 'Adulto mayor', 'Bolivia');

INSERT INTO estados_reserva (estado_reserva) VALUES
('Confirmada'),
('Cancelada');

INSERT INTO check_in (correo_usuario, fecha_check_in, numero_documento, tipodoc, equipaje_mano, maleta, equipaje_extra) VALUES
('andrea.fernandez.l@ucb.edu.bo', '2024-06-09', '1234567', 'DNI', true, false, true),
('dadguzman.b@ucb.edu.bo', '2024-06-11', '2345678', 'Pasaporte', true, true, false),
('danialee14@gmail.com', '2024-06-14', '3456789', 'Carnet de Identidad', false, true, false),
('daniela.gen.b@ucb.edu.bo', '2024-06-17', '4567890', 'DNI', true, false, false),
('danielaegwkjghwkzman.b@ucb.edu.bo', '2024-06-19', '5678901', 'Pasaporte', true, true, true);
--use esto para el filtrado
INSERT INTO vuelos (fecha_vuelo, costoVip,costobusiness,costoeco, origen, destino) VALUES
('2024-06-10 08:00:00', 500.00,400,300, 'La Paz', 'Santa Cruz'),
('2024-06-12 10:30:00', 400.00, 400,300,'Cochabamba', 'Sucre'),
('2024-06-15 12:45:00', 600.00,400,300, 'Santa Cruz', 'La Paz'),
('2024-06-18 14:20:00', 350.00,400,300, 'Sucre', 'Cochabamba'),
('2024-06-20 16:10:00', 700.00,400,300, 'La Paz', 'Cochabamba');

INSERT INTO asientos (casiento, cavion, tipo_asiento) VALUES
('A1', 1, 'Ventana'),
('A2', 1, 'Pasillo'),
('B1', 2, 'Ventana'),
('B2', 2, 'Pasillo'),
('C1', 1, 'Ventana');

INSERT INTO asientos_vuelo (cvuelo, casiento, cavion) VALUES
(1, 'A1', 1),
(1, 'A2', 1),
(2, 'B1', 2),
(2, 'B2', 2),
(3, 'C1', 1);

INSERT INTO reservas (correo_usuario, fecha_reserva, fecha_lmite) VALUES
('andrea.fernandez.l@ucb.edu.bo', '2024-06-05', '2024-06-08'),
('dadguzman.b@ucb.edu.bo', '2024-06-07', '2024-06-10'),
('danialee14@gmail.com', '2024-06-10', '2024-06-13'),
('daniela.gen.b@ucb.edu.bo', '2024-06-13', '2024-06-16'),
('danielaegwkjghwkzman.b@ucb.edu.bo', '2024-06-15', '2024-06-18');

INSERT INTO reservas_personas (creserva, ci_persona, estado_reserva, cvuelo, casiento) VALUES
(11, '1234567', 'Confirmada', 1, 'A1'),
(12, '2345678', 'Pendiente', 2, 'B1'),
(13, '3456789', 'Cancelada', 3, 'C1'),
(14, '4567890', 'Confirmada', 1, 'A2'),
(15, '5678901', 'Pendiente', 2, 'B2');

alter table check_in
add column estado_checkin varchar (20);