select * from usuarios;
select * from historial_passwords;


ALTER TABLE public.usuarios
--ADD COLUMN rol varchar(50) NOT NULL DEFAULT 'usuario',
ADD COLUMN activo integer NOT NULL DEFAULT 1,
ADD COLUMN password_last_date date NOT NULL DEFAULT CURRENT_DATE;

CREATE SEQUENCE public.historial_passwords_cpassword_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.historial_passwords (
    cpassword integer NOT NULL DEFAULT nextval('public.historial_passwords_cpassword_seq'::regclass),
    password character varying(100) NOT NULL,
    fecha_uso date NOT NULL,
    correo_usuario character varying(100) NOT NULL,
    CONSTRAINT historial_passwords_pk PRIMARY KEY (cpassword)
);

ALTER SEQUENCE public.historial_passwords_cpassword_seq OWNED BY public.historial_passwords.cpassword;

ALTER TABLE public.historial_passwords
ADD CONSTRAINT historial_passwords_usuarios FOREIGN KEY (correo_usuario) 
REFERENCES public.usuarios(correo_usuario);

-- Actualizar el rol de los usuarios existentes
UPDATE public.usuarios 
SET rol = 'administrador' 
WHERE correo_usuario = 'danielita@ucb.edu.bo';

UPDATE public.usuarios 
SET rol = 'usuario' 
WHERE correo_usuario != 'danielita@ucb.edu.bo';

-- Insertar contraseñas históricas (ejemplo)
INSERT INTO public.historial_passwords (password, fecha_uso, correo_usuario)
SELECT contraseña, password_last_date, correo_usuario 
FROM public.usuarios;