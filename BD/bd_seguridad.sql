-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2025-04-27 18:55:22.575

-- tables
-- Table: asientos
CREATE TABLE asientos (
    casiento varchar(100)  NOT NULL,
    cavion varchar(100)  NOT NULL,
    tipo_asiento varchar(100)  NOT NULL,
    CONSTRAINT asientos_pk PRIMARY KEY (casiento,cavion)
);

-- Table: asientos_vuelo
CREATE TABLE asientos_vuelo (
    cvuelo varchar(100)  NOT NULL,
    casiento varchar(100)  NOT NULL,
    cavion varchar(100)  NOT NULL,
    CONSTRAINT asientos_vuelo_pk PRIMARY KEY (cvuelo,casiento)
);

-- Table: aviones
CREATE TABLE aviones (
    cavion varchar(100)  NOT NULL,
    capacidad int  NOT NULL,
    CONSTRAINT avion_pk PRIMARY KEY (cavion)
);

-- Table: boletos
CREATE TABLE boletos (
    cboleto varchar(100)  NOT NULL,
    ci_persona varchar(100)  NOT NULL,
    cvuelo varchar(100)  NOT NULL,
    casiento varchar(100)  NOT NULL,
    ccheck_in varchar(100)  NOT NULL,
    total money  NOT NULL,
    CONSTRAINT boletos_pk PRIMARY KEY (cboleto)
);

-- Table: check_in
CREATE TABLE check_in (
    ccheck_in varchar(100)  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    fecha_check_in date  NOT NULL,
    numero_documento varchar(100)  NOT NULL,
    tipodoc varchar(100)  NOT NULL,
    equipaje_mano boolean  NOT NULL,
    maleta boolean  NOT NULL,
    equipaje_extra boolean  NOT NULL,
    estado_checkin varchar(20)  NOT NULL,
    CONSTRAINT check-in_pk PRIMARY KEY (ccheck_in)
);

-- Table: ciudad
CREATE TABLE ciudad (
    ciudad varchar(100)  NOT NULL,
    CONSTRAINT ciudad_pk PRIMARY KEY (ciudad)
);

-- Table: estados_reserva
CREATE TABLE estados_reserva (
    estado_reserva varchar(100)  NOT NULL,
    CONSTRAINT estados_reserva_pk PRIMARY KEY (estado_reserva)
);

-- Table: historial_passwords
CREATE TABLE historial_passwords (
    cpassword int  NOT NULL,
    password varchar(100)  NOT NULL,
    fecha_uso date  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    CONSTRAINT historial_passwords_pk PRIMARY KEY (cpassword)
);

-- Table: pais_proce
CREATE TABLE pais_proce (
    pais_origen varchar(100)  NOT NULL,
    CONSTRAINT pais_proce_pk PRIMARY KEY (pais_origen)
);

-- Table: personas
CREATE TABLE personas (
    ci_persona varchar(100)  NOT NULL,
    nombres varchar(100)  NOT NULL,
    apellidos varchar(100)  NOT NULL,
    fecha_nacimiento date  NOT NULL,
    sexo varchar(100)  NOT NULL,
    tipo_persona varchar(100)  NOT NULL,
    pais_origen varchar(100)  NOT NULL,
    CONSTRAINT personas_pk PRIMARY KEY (ci_persona)
);

-- Table: premios_millas
CREATE TABLE premios_millas (
    premio varchar(100)  NOT NULL,
    tipo_premio varchar(100)  NOT NULL,
    producto_destacado boolean  NOT NULL,
    millas int  NOT NULL,
    CONSTRAINT premios_millas_pk PRIMARY KEY (premio)
);

-- Table: premios_usuarios
CREATE TABLE premios_usuarios (
    premio varchar(100)  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    CONSTRAINT premios_usuarios_pk PRIMARY KEY (premio,correo_usuario)
);

-- Table: reservas
CREATE TABLE reservas (
    creserva varchar(100)  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    fecha_reserva date  NOT NULL,
    fecha_lmite date  NOT NULL,
    CONSTRAINT reserva_vuelos_pk PRIMARY KEY (creserva)
);

-- Table: reservas_personas
CREATE TABLE reservas_personas (
    creserva varchar(100)  NOT NULL,
    ci_persona varchar(100)  NOT NULL,
    estado_reserva varchar(100)  NOT NULL,
    cvuelo varchar(100)  NOT NULL,
    casiento varchar(100)  NOT NULL,
    CONSTRAINT reservas_personas_pk PRIMARY KEY (creserva,ci_persona)
);

-- Table: roles
CREATE TABLE roles (
    rol varchar(50)  NOT NULL,
    accesos json  NOT NULL,
    CONSTRAINT roles_pk PRIMARY KEY (rol)
);

-- Table: tipo_doc
CREATE TABLE tipo_doc (
    tipodoc varchar(100)  NOT NULL,
    CONSTRAINT tipo_doc_pk PRIMARY KEY (tipodoc)
);

-- Table: usuarios
CREATE TABLE usuarios (
    correo_usuario varchar(100)  NOT NULL,
    contraseña varchar(100)  NOT NULL,
    nombres_usuario varchar(100)  NOT NULL,
    apellidos_usuario varchar(100)  NOT NULL,
    tipo_usuario varchar(100)  NOT NULL,
    millas int  NOT NULL,
    rol varchar(50),
    activo int ,
    password_last_date date,
    CONSTRAINT usuario_pk PRIMARY KEY (correo_usuario)
);

-- Table: vuelos
CREATE TABLE vuelos (
    cvuelo varchar(100)  NOT NULL,
    fecha_vuelo timestamp  NOT NULL,
    costo money  NOT NULL,
    origen varchar(100)  NOT NULL,
    destino varchar(100)  NOT NULL,
    costoVip money  NOT NULL,
    costoBusiness money  NOT NULL,
    costoEco money  NOT NULL,
    CONSTRAINT vuelos_pk PRIMARY KEY (cvuelo)
);


CREATE TABLE opiniones (
    copinion SERIAL PRIMARY KEY,
    fecha_opinion timestamp  NOT NULL,
    correo_usuario varchar(100)  NOT NULL,
    nombres_usuario varchar(100)  NOT NULL,
    apellidos_usuario varchar(100)  NOT NULL,
    comentario varchar(500)  NOT NULL,
    estrellas integer  NOT NULL
);



-- foreign keys
-- Reference: Boletos_check_in (table: boletos)
ALTER TABLE boletos ADD CONSTRAINT Boletos_check_in
    FOREIGN KEY (ccheck_in)
    REFERENCES check_in (ccheck_in)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: asientos_aviones (table: asientos)
ALTER TABLE asientos ADD CONSTRAINT asientos_aviones
    FOREIGN KEY (cavion)
    REFERENCES aviones (cavion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: asientos_vuelo_asientos (table: asientos_vuelo)
ALTER TABLE asientos_vuelo ADD CONSTRAINT asientos_vuelo_asientos
    FOREIGN KEY (casiento, cavion)
    REFERENCES asientos (casiento, cavion)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: asientos_vuelo_vuelos (table: asientos_vuelo)
ALTER TABLE asientos_vuelo ADD CONSTRAINT asientos_vuelo_vuelos
    FOREIGN KEY (cvuelo)
    REFERENCES vuelos (cvuelo)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: boletos_asientos_vuelo (table: boletos)
ALTER TABLE boletos ADD CONSTRAINT boletos_asientos_vuelo
    FOREIGN KEY (cvuelo, casiento)
    REFERENCES asientos_vuelo (cvuelo, casiento)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: boletos_personas (table: boletos)
ALTER TABLE boletos ADD CONSTRAINT boletos_personas
    FOREIGN KEY (ci_persona)
    REFERENCES personas (ci_persona)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: check_in_tipo_doc (table: check_in)
ALTER TABLE check_in ADD CONSTRAINT check_in_tipo_doc
    FOREIGN KEY (tipodoc)
    REFERENCES tipo_doc (tipodoc)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: check_in_usuarios (table: check_in)
ALTER TABLE check_in ADD CONSTRAINT check_in_usuarios
    FOREIGN KEY (correo_usuario)
    REFERENCES usuarios (correo_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: historial_passwords_usuarios (table: historial_passwords)
ALTER TABLE historial_passwords ADD CONSTRAINT historial_passwords_usuarios
    FOREIGN KEY (correo_usuario)
    REFERENCES usuarios (correo_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: personas_pais_proce (table: personas)
ALTER TABLE personas ADD CONSTRAINT personas_pais_proce
    FOREIGN KEY (pais_origen)
    REFERENCES pais_proce (pais_origen)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: premios_usuarios_premios_millas (table: premios_usuarios)
ALTER TABLE premios_usuarios ADD CONSTRAINT premios_usuarios_premios_millas
    FOREIGN KEY (premio)
    REFERENCES premios_millas (premio)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: premios_usuarios_usuarios (table: premios_usuarios)
ALTER TABLE premios_usuarios ADD CONSTRAINT premios_usuarios_usuarios
    FOREIGN KEY (correo_usuario)
    REFERENCES usuarios (correo_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reservas_detalle_personas (table: reservas_personas)
ALTER TABLE reservas_personas ADD CONSTRAINT reservas_detalle_personas
    FOREIGN KEY (ci_persona)
    REFERENCES personas (ci_persona)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reservas_detalle_reservas (table: reservas_personas)
ALTER TABLE reservas_personas ADD CONSTRAINT reservas_detalle_reservas
    FOREIGN KEY (creserva)
    REFERENCES reservas (creserva)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reservas_personas_asientos_vuelo (table: reservas_personas)
ALTER TABLE reservas_personas ADD CONSTRAINT reservas_personas_asientos_vuelo
    FOREIGN KEY (cvuelo, casiento)
    REFERENCES asientos_vuelo (cvuelo, casiento)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reservas_personas_estados_reserva (table: reservas_personas)
ALTER TABLE reservas_personas ADD CONSTRAINT reservas_personas_estados_reserva
    FOREIGN KEY (estado_reserva)
    REFERENCES estados_reserva (estado_reserva)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: reservas_usuarios (table: reservas)
ALTER TABLE reservas ADD CONSTRAINT reservas_usuarios
    FOREIGN KEY (correo_usuario)
    REFERENCES usuarios (correo_usuario)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: usuarios_roles (table: usuarios)
ALTER TABLE usuarios ADD CONSTRAINT usuarios_roles
    FOREIGN KEY (rol)
    REFERENCES roles (rol)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: vuelos_ciudad (table: vuelos)
ALTER TABLE vuelos ADD CONSTRAINT vuelos_ciudad
    FOREIGN KEY (destino)
    REFERENCES ciudad (ciudad)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: vuelos_origen (table: vuelos)
ALTER TABLE vuelos ADD CONSTRAINT vuelos_origen
    FOREIGN KEY (origen)
    REFERENCES ciudad (ciudad)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- sequences
-- Sequence: avion_seq
CREATE SEQUENCE avion_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: check_in_seq
CREATE SEQUENCE check_in_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: reserva_vuelos_seq
CREATE SEQUENCE reserva_vuelos_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: ubicaciones_seq
CREATE SEQUENCE ubicaciones_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- Sequence: vuelos_seq
CREATE SEQUENCE vuelos_seq
      INCREMENT BY 1
      NO MINVALUE
      NO MAXVALUE
      START WITH 1
      NO CYCLE
;

-- End of file.


ALTER TABLE usuarios 
ADD user_id varchar(20)


CREATE TABLE log_app (
    id SERIAL PRIMARY KEY,
    correo_usuario VARCHAR(100) NOT NULL,
    mensaje CHAR(255),
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP);

CREATE TABLE log_seguridad (
    id_log SERIAL PRIMARY KEY,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    tipo_evento VARCHAR(50) NOT NULL,
    descripcion TEXT NOT NULL,
    correo_usuario VARCHAR(100),
    ip_origen VARCHAR(45),
    user_agent TEXT,
    detalles_adicionales JSONB,
    severidad VARCHAR(20));


-- Sequence: ubicaciones_seq
CREATE SEQUENCE historial_passwords_seq
    INCREMENT BY 1
    START WITH 1
    NO MINVALUE
    NO MAXVALUE
    NO CYCLE;

ALTER TABLE historial_passwords
ALTER COLUMN cpassword SET DEFAULT nextval('historial_passwords_seq');

