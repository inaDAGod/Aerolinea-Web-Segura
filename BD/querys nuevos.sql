--Modifico la tabla vuelos
--ALTER TABLE vuelos
--RENAME COLUMN costo TO costoVip;
--ALTER TABLE vuelos
--ADD COLUMN costoBusiness money,
--ADD COLUMN costoEco money;

-Agrego las ciudades
INSERT INTO ciudad (ciudad) VALUES ('La Paz');
INSERT INTO ciudad (ciudad) VALUES ('Cochabamba');
INSERT INTO ciudad (ciudad) VALUES ('Santa Cruz');
INSERT INTO ciudad (ciudad) VALUES ('Sucre');
INSERT INTO ciudad (ciudad) VALUES ('Tarija');
INSERT INTO ciudad (ciudad) VALUES ('Potosí');
INSERT INTO ciudad (ciudad) VALUES ('Oruro');
INSERT INTO ciudad (ciudad) VALUES ('Beni');
INSERT INTO ciudad (ciudad) VALUES ('Pando');

-- Agregando aviones
INSERT INTO aviones (capacidad) VALUES (80), (80);

-- Agregando asientos para cada avión
DO $$
DECLARE
    avion_id integer;
BEGIN
    FOR avion_id IN 1..2 LOOP
        FOR seat_number IN 1..80 LOOP
            INSERT INTO asientos (casiento, cavion, tipo_asiento)
            VALUES ('Asiento ' || seat_number, avion_id, (CASE WHEN seat_number <= 10 THEN 'VIP' ELSE (CASE WHEN seat_number <= 40 THEN 'Business' ELSE 'Económico' END) END));
        END LOOP;
    END LOOP;
END $$;

select * from asientos_vuelo
DO $$
DECLARE
    avion_id integer;
    seat_id varchar(100);
    vuelo_id integer;
BEGIN
    FOR vuelo_id IN 2..4 LOOP  -- Asumiendo que tienes tres vuelos con IDs 2, 3 y 4
        FOR avion_id IN 1..2 LOOP  -- Asumiendo que tienes dos aviones con IDs 1 y 2
            FOR seat_number IN 1..80 LOOP
                seat_id := 'Asiento ' || seat_number;
                INSERT INTO asientos_vuelo (cvuelo, casiento, cavion)
                VALUES (vuelo_id, seat_id, avion_id)
                ON CONFLICT (cvuelo, casiento) DO NOTHING; -- Ignora inserciones que causen conflictos
            END LOOP;
        END LOOP;
    END LOOP;
END $$;
-- Agregando países de procedencia
INSERT INTO pais_proce (pais_origen) VALUES
('Bolivia'), ('México'), ('Chile'), ('Perú'), ('Argentina');
-- Agregando estados de reserva
INSERT INTO estados_reserva (estado_reserva) VALUES
('Realizado'), ('Pendiente'), ('Pagado');

-- Agregando personas
INSERT INTO personas (ci_persona, nombres, apellidos, fecha_nacimiento, sexo, tipo_persona, pais_origen) VALUES
('8002000', 'Carlos', 'Mendez', '1980-02-15', 'Masculino', 'Adulto', 'Bolivia'),
('8002001', 'Maria', 'Perez', '1989-07-23', 'Femenino', 'Adulto', 'Chile'),
('8002003', 'Miles', 'Morales', '2024-01-23', 'Masculimo', 'Bebe', 'Bolivia');

-- Agregando reservas
INSERT INTO reservas (correo_usuario, fecha_reserva, fecha_lmite) VALUES
('joshnisth@gmail.com', '2024-05-10', '2024-05-12'),
('ellie13@gmail.com', '2024-05-18', '2024-05-20');

-- Agregando reservas_personas (suponiendo que la reserva ya está asociada a un vuelo y un asiento)
INSERT INTO reservas_personas (creserva, ci_persona, estado_reserva, cvuelo, casiento) VALUES
(1, '8002000', 'Pendiente', 2, 'Asiento 1'),
(1, '8002003', 'Pagado', 2, 'Asiento 2'),
(2, '8002001', 'Pendiente', 3, 'Asiento 2');

-- actualizo uno de prueba para verificar que funcione el tipo de asiento
UPDATE reservas_personas
SET casiento = 'Asiento 39'
WHERE ci_persona = '8002001' AND cvuelo = 3 AND casiento = 'Asiento 2';

select * from reservas_personas

--actualizo un estado de las reservas
UPDATE estados_reserva
SET estado_reserva = 'Cancelado'
WHERE estado_reserva = 'Realizado';

--UPDATE PARA CHECKIN AQUI DE JOSH
--AGREGO CHECKCIN
INSERT INTO check_in (correo_usuario, fecha_check_in, numero_documento, tipodoc, equipaje_mano, maleta, equipaje_extra) VALUES
('joshnisth@gmail.com', '2024-06-09', '8002000', 'DNI', true, false, true),
('joshnisth@gmail.com', '2024-06-11', '8002003', 'Pasaporte', true, true, false),
('ellie13@gmail.com', '2024-06-14', '8002001', 'Carnet de Identidad', false, true, false);
--Y ESTO MAS
--alter table check_in
--add column estado_checkin varchar (20);

--Agrego un boleto 
INSERT INTO boletos (ci_persona,cvuelo,casiento,total) VALUES
('8002001','2','Asiento 39','500');

--Aqui es para hacer las pruebas en checkin para verificar que si cambia a true, si quieren hacer prueba
--este es la serie de querys

select * from check_in

UPDATE check_in
SET estado_checkin = 'Pendiente'
WHERE estado_checkin = 'Realizado';


UPDATE check_in
SET equipaje_mano = false
WHERE equipaje_mano = true;

UPDATE check_in
SET maleta = false
WHERE maleta = true;

UPDATE check_in
SET equipaje_extra = false
WHERE equipaje_extra = true;