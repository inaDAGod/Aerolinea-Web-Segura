-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2024-04-14 15:24:21.054

-- tables
-- Table: asientos
CREATE TABLE verificaciones_correo (
    id SERIAL PRIMARY KEY,
    correo VARCHAR(255) NOT NULL,
    codigo_verificacion VARCHAR(100) NOT NULL,
    fecha_expiracion TIMESTAMP NOT NULL
);

CREATE TABLE asientos (
    casiento varchar(100)  NOT NULL,
    cavion int  NOT NULL,
    tipo_asiento varchar(100)  NOT NULL,
    CONSTRAINT asientos_pk PRIMARY KEY (casiento,cavion)
);

-- Table: asientos_vueloAAS
CREATE TABLE asientos_vuelo (
    cvuelo int  NOT NULL,
    casiento varchar(100)  NOT NULL,
    cavion int  NOT NULL,
    CONSTRAINT asientos_vuelo_pk PRIMARY KEY (cvuelo,casiento)
);

-- Table: aviones
CREATE TABLE aviones (
    cavion SERIAL PRIMARY KEY,
    capacidad int  NOT NULL
);

-- Table: boletos
CREATE TABLE boletos (
    cboleto SERIAL PRIMARY KEY,
    ci_persona varchar(100)  NOT NULL,
    ccheck_in integer ,
    cvuelo int  NOT NULL,
    casiento varchar(100)  NOT NULL,
    total money  NOT NULL
);

-- Table: check_in
CREATE TABLE check_in (
    ccheck_in SERIAL PRIMARY KEY,
    correo_usuario varchar(100),
    fecha_check_in date  NOT NULL,
    numero_documento varchar(100)  NOT NULL,
    tipodoc varchar(100)  NOT NULL,
    equipaje_mano boolean  NOT NULL,
    maleta boolean  NOT NULL,
    equipaje_extra boolean  NOT NULL
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

-- Table: pais_proce
CREATE TABLE pais_proce (
    pais_origen varchar(100)  NOT NULL,
    CONSTRAINT pais_proce_pk PRIMARY KEY (pais_origen)
);

-- Table: personas
CREATE TABLE personas (
    ci_persona varchar(100)  NOT NULL,
    nombres varchar(100)  ,
    apellidos varchar(100)  ,
    fecha_nacimiento date  ,
    sexo varchar(100) ,
    tipo_persona varchar(100) ,
    pais_origen varchar(100)  ,
    CONSTRAINT personas_pk PRIMARY KEY (ci_persona)
);

-- Table: premios_millas
CREATE TABLE premios_millas (
    premio varchar(100)  NOT NULL,
    tipo_premio varchar(100)  NOT NULL,
    producto_destacado boolean  NOT NULL,
    millas int  NOT NULL,
    src_foto varchar(100)  NOT NULL,
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
    creserva SERIAL PRIMARY KEY,
    correo_usuario varchar(100)  NOT NULL,
    fecha_reserva date  NOT NULL,
    fecha_lmite date  NOT NULL
);

-- Table: reservas_personas
CREATE TABLE reservas_personas (
    creserva integer  NOT NULL,
    ci_persona varchar(100)  NOT NULL,
    estado_reserva varchar(100)  NOT NULL,
    cvuelo int  NOT NULL,
    casiento varchar(100)  NOT NULL,
    CONSTRAINT reservas_personas_pk PRIMARY KEY (creserva,ci_persona)
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
    CONSTRAINT usuario_pk PRIMARY KEY (correo_usuario)
);

-- Table: vuelos
CREATE TABLE vuelos (
    cvuelo SERIAL PRIMARY KEY,
    fecha_vuelo timestamp  NOT NULL,
    costo money  NOT NULL,
    origen varchar(100)  NOT NULL,
    destino varchar(100)  NOT NULL
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


-- Crear la tabla satisfaction
CREATE TABLE satisfaction (
    cvuelo int NOT NULL,
    checkin boolean NOT NULL,
    satischeckin varchar(40) NOT NULL,
    satistiempo varchar(40) NOT NULL,
    satisservicio varchar(40) NOT NULL,
    satisvuelo varchar(40) NOT NULL,
    CONSTRAINT satisfaction_cvuelo_fk FOREIGN KEY (cvuelo)
    REFERENCES vuelos (cvuelo) 
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
);
