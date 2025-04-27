--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

-- Started on 2025-04-27 18:00:30

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 247 (class 1255 OID 90137)
-- Name: aumentar_millas(character varying); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.aumentar_millas(correo_usuario_param character varying) RETURNS void
    LANGUAGE plpgsql
    AS $$
BEGIN
    -- Incrementar las millas del usuario en 10
    UPDATE usuarios
    SET millas = millas + 10
    WHERE correo_usuario = correo_usuario_param;
END;
$$;


ALTER FUNCTION public.aumentar_millas(correo_usuario_param character varying) OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 41071)
-- Name: asientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asientos (
    casiento character varying(100) NOT NULL,
    cavion integer NOT NULL,
    tipo_asiento character varying(100) NOT NULL
);


ALTER TABLE public.asientos OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 41076)
-- Name: asientos_vuelo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asientos_vuelo (
    cvuelo integer NOT NULL,
    casiento character varying(100) NOT NULL,
    cavion integer NOT NULL
);


ALTER TABLE public.asientos_vuelo OWNER TO postgres;

--
-- TOC entry 243 (class 1259 OID 90138)
-- Name: audi; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.audi (
    correo_usuario character varying(100),
    fecha character varying(100)
);


ALTER TABLE public.audi OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 41255)
-- Name: avion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.avion_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.avion_seq OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 41082)
-- Name: aviones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.aviones (
    cavion integer NOT NULL,
    capacidad integer NOT NULL
);


ALTER TABLE public.aviones OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 41081)
-- Name: aviones_cavion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.aviones_cavion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.aviones_cavion_seq OWNER TO postgres;

--
-- TOC entry 4965 (class 0 OID 0)
-- Dependencies: 217
-- Name: aviones_cavion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.aviones_cavion_seq OWNED BY public.aviones.cavion;


--
-- TOC entry 220 (class 1259 OID 41089)
-- Name: boletos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boletos (
    cboleto integer NOT NULL,
    ci_persona character varying(100) NOT NULL,
    ccheck_in integer,
    cvuelo integer NOT NULL,
    casiento character varying(100) NOT NULL,
    total money NOT NULL
);


ALTER TABLE public.boletos OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 41088)
-- Name: boletos_cboleto_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boletos_cboleto_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boletos_cboleto_seq OWNER TO postgres;

--
-- TOC entry 4966 (class 0 OID 0)
-- Dependencies: 219
-- Name: boletos_cboleto_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boletos_cboleto_seq OWNED BY public.boletos.cboleto;


--
-- TOC entry 222 (class 1259 OID 41096)
-- Name: check_in; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.check_in (
    ccheck_in integer NOT NULL,
    correo_usuario character varying(100),
    fecha_check_in date NOT NULL,
    numero_documento character varying(100) NOT NULL,
    tipodoc character varying(100) NOT NULL,
    equipaje_mano boolean NOT NULL,
    maleta boolean NOT NULL,
    equipaje_extra boolean NOT NULL,
    estado_checkin character varying(20)
);


ALTER TABLE public.check_in OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 41095)
-- Name: check_in_ccheck_in_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.check_in_ccheck_in_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.check_in_ccheck_in_seq OWNER TO postgres;

--
-- TOC entry 4967 (class 0 OID 0)
-- Dependencies: 221
-- Name: check_in_ccheck_in_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.check_in_ccheck_in_seq OWNED BY public.check_in.ccheck_in;


--
-- TOC entry 237 (class 1259 OID 41256)
-- Name: check_in_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.check_in_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.check_in_seq OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 41102)
-- Name: ciudad; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ciudad (
    ciudad character varying(100) NOT NULL
);


ALTER TABLE public.ciudad OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 41107)
-- Name: estados_reserva; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.estados_reserva (
    estado_reserva character varying(100) NOT NULL
);


ALTER TABLE public.estados_reserva OWNER TO postgres;

--
-- TOC entry 245 (class 1259 OID 98358)
-- Name: opiniones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opiniones (
    copinion integer NOT NULL,
    fecha_opinion timestamp without time zone NOT NULL,
    correo_usuario character varying(100) NOT NULL,
    nombres_usuario character varying(100) NOT NULL,
    apellidos_usuario character varying(100) NOT NULL,
    comentario character varying(500) NOT NULL,
    estrellas integer NOT NULL
);


ALTER TABLE public.opiniones OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 98357)
-- Name: opiniones_copinion_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opiniones_copinion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opiniones_copinion_seq OWNER TO postgres;

--
-- TOC entry 4968 (class 0 OID 0)
-- Dependencies: 244
-- Name: opiniones_copinion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opiniones_copinion_seq OWNED BY public.opiniones.copinion;


--
-- TOC entry 225 (class 1259 OID 41112)
-- Name: pais_proce; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pais_proce (
    pais_origen character varying(100) NOT NULL
);


ALTER TABLE public.pais_proce OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 41117)
-- Name: personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.personas (
    ci_persona character varying(100) NOT NULL,
    nombres character varying(100),
    apellidos character varying(100),
    fecha_nacimiento date,
    sexo character varying(100),
    tipo_persona character varying(100),
    pais_origen character varying(100)
);


ALTER TABLE public.personas OWNER TO postgres;

--
-- TOC entry 227 (class 1259 OID 41124)
-- Name: premios_millas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.premios_millas (
    premio character varying(100) NOT NULL,
    tipo_premio character varying(100) NOT NULL,
    producto_destacado boolean NOT NULL,
    millas integer NOT NULL,
    src_foto character varying(200) NOT NULL
);


ALTER TABLE public.premios_millas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 41129)
-- Name: premios_usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.premios_usuarios (
    premio character varying(100) NOT NULL,
    correo_usuario character varying(100) NOT NULL
);


ALTER TABLE public.premios_usuarios OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 41257)
-- Name: reserva_vuelos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reserva_vuelos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reserva_vuelos_seq OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 41135)
-- Name: reservas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas (
    creserva integer NOT NULL,
    correo_usuario character varying(100) NOT NULL,
    fecha_reserva date NOT NULL,
    fecha_lmite date NOT NULL
);


ALTER TABLE public.reservas OWNER TO postgres;

--
-- TOC entry 229 (class 1259 OID 41134)
-- Name: reservas_creserva_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservas_creserva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reservas_creserva_seq OWNER TO postgres;

--
-- TOC entry 4969 (class 0 OID 0)
-- Dependencies: 229
-- Name: reservas_creserva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservas_creserva_seq OWNED BY public.reservas.creserva;


--
-- TOC entry 231 (class 1259 OID 41141)
-- Name: reservas_personas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reservas_personas (
    creserva integer NOT NULL,
    ci_persona character varying(100) NOT NULL,
    estado_reserva character varying(100) NOT NULL,
    cvuelo integer NOT NULL,
    casiento character varying(100) NOT NULL
);


ALTER TABLE public.reservas_personas OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 106549)
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    rol character varying(50) NOT NULL,
    accesos json NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 41146)
-- Name: tipo_doc; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tipo_doc (
    tipodoc character varying(100) NOT NULL
);


ALTER TABLE public.tipo_doc OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 41258)
-- Name: ubicaciones_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ubicaciones_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ubicaciones_seq OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 41151)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    correo_usuario character varying(100) NOT NULL,
    "contraseña" character varying(100) NOT NULL,
    nombres_usuario character varying(100) NOT NULL,
    apellidos_usuario character varying(100) NOT NULL,
    tipo_usuario character varying(100) NOT NULL,
    millas integer NOT NULL
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 90129)
-- Name: verificaciones_correo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verificaciones_correo (
    id integer NOT NULL,
    correo character varying(255) NOT NULL,
    codigo_verificacion character varying(100) NOT NULL,
    fecha_expiracion timestamp without time zone NOT NULL
);


ALTER TABLE public.verificaciones_correo OWNER TO postgres;

--
-- TOC entry 241 (class 1259 OID 90128)
-- Name: verificaciones_correo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.verificaciones_correo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.verificaciones_correo_id_seq OWNER TO postgres;

--
-- TOC entry 4970 (class 0 OID 0)
-- Dependencies: 241
-- Name: verificaciones_correo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.verificaciones_correo_id_seq OWNED BY public.verificaciones_correo.id;


--
-- TOC entry 235 (class 1259 OID 41159)
-- Name: vuelos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vuelos (
    cvuelo integer NOT NULL,
    fecha_vuelo timestamp without time zone NOT NULL,
    costovip money NOT NULL,
    origen character varying(100) NOT NULL,
    destino character varying(100) NOT NULL,
    costobusiness money,
    costoeco money
);


ALTER TABLE public.vuelos OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 41158)
-- Name: vuelos_cvuelo_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vuelos_cvuelo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vuelos_cvuelo_seq OWNER TO postgres;

--
-- TOC entry 4971 (class 0 OID 0)
-- Dependencies: 234
-- Name: vuelos_cvuelo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.vuelos_cvuelo_seq OWNED BY public.vuelos.cvuelo;


--
-- TOC entry 240 (class 1259 OID 41259)
-- Name: vuelos_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.vuelos_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vuelos_seq OWNER TO postgres;

--
-- TOC entry 4722 (class 2604 OID 41085)
-- Name: aviones cavion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aviones ALTER COLUMN cavion SET DEFAULT nextval('public.aviones_cavion_seq'::regclass);


--
-- TOC entry 4723 (class 2604 OID 41092)
-- Name: boletos cboleto; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos ALTER COLUMN cboleto SET DEFAULT nextval('public.boletos_cboleto_seq'::regclass);


--
-- TOC entry 4724 (class 2604 OID 41099)
-- Name: check_in ccheck_in; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.check_in ALTER COLUMN ccheck_in SET DEFAULT nextval('public.check_in_ccheck_in_seq'::regclass);


--
-- TOC entry 4728 (class 2604 OID 98361)
-- Name: opiniones copinion; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opiniones ALTER COLUMN copinion SET DEFAULT nextval('public.opiniones_copinion_seq'::regclass);


--
-- TOC entry 4725 (class 2604 OID 41138)
-- Name: reservas creserva; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas ALTER COLUMN creserva SET DEFAULT nextval('public.reservas_creserva_seq'::regclass);


--
-- TOC entry 4727 (class 2604 OID 90132)
-- Name: verificaciones_correo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verificaciones_correo ALTER COLUMN id SET DEFAULT nextval('public.verificaciones_correo_id_seq'::regclass);


--
-- TOC entry 4726 (class 2604 OID 41162)
-- Name: vuelos cvuelo; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vuelos ALTER COLUMN cvuelo SET DEFAULT nextval('public.vuelos_cvuelo_seq'::regclass);


--
-- TOC entry 4928 (class 0 OID 41071)
-- Dependencies: 215
-- Data for Name: asientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asientos (casiento, cavion, tipo_asiento) FROM stdin;
Asiento 1	1	VIP
Asiento 2	1	VIP
Asiento 3	1	VIP
Asiento 4	1	VIP
Asiento 5	1	VIP
Asiento 6	1	VIP
Asiento 7	1	VIP
Asiento 8	1	VIP
Asiento 9	1	VIP
Asiento 10	1	VIP
Asiento 11	1	Business
Asiento 12	1	Business
Asiento 13	1	Business
Asiento 14	1	Business
Asiento 15	1	Business
Asiento 16	1	Business
Asiento 17	1	Business
Asiento 18	1	Business
Asiento 19	1	Business
Asiento 20	1	Business
Asiento 21	1	Business
Asiento 22	1	Business
Asiento 23	1	Business
Asiento 24	1	Business
Asiento 25	1	Business
Asiento 26	1	Business
Asiento 27	1	Business
Asiento 28	1	Business
Asiento 29	1	Business
Asiento 30	1	Business
Asiento 31	1	Business
Asiento 32	1	Business
Asiento 33	1	Business
Asiento 34	1	Business
Asiento 35	1	Business
Asiento 36	1	Business
Asiento 37	1	Business
Asiento 38	1	Business
Asiento 39	1	Business
Asiento 40	1	Business
Asiento 41	1	Económico
Asiento 42	1	Económico
Asiento 43	1	Económico
Asiento 44	1	Económico
Asiento 45	1	Económico
Asiento 46	1	Económico
Asiento 47	1	Económico
Asiento 48	1	Económico
Asiento 49	1	Económico
Asiento 50	1	Económico
Asiento 51	1	Económico
Asiento 52	1	Económico
Asiento 53	1	Económico
Asiento 54	1	Económico
Asiento 55	1	Económico
Asiento 56	1	Económico
Asiento 57	1	Económico
Asiento 58	1	Económico
Asiento 59	1	Económico
Asiento 60	1	Económico
Asiento 61	1	Económico
Asiento 62	1	Económico
Asiento 63	1	Económico
Asiento 64	1	Económico
Asiento 65	1	Económico
Asiento 66	1	Económico
Asiento 67	1	Económico
Asiento 68	1	Económico
Asiento 69	1	Económico
Asiento 70	1	Económico
Asiento 71	1	Económico
Asiento 72	1	Económico
Asiento 73	1	Económico
Asiento 74	1	Económico
Asiento 75	1	Económico
Asiento 76	1	Económico
Asiento 77	1	Económico
Asiento 78	1	Económico
Asiento 79	1	Económico
Asiento 80	1	Económico
Asiento 1	2	VIP
Asiento 2	2	VIP
Asiento 3	2	VIP
Asiento 4	2	VIP
Asiento 5	2	VIP
Asiento 6	2	VIP
Asiento 7	2	VIP
Asiento 8	2	VIP
Asiento 9	2	VIP
Asiento 10	2	VIP
Asiento 11	2	Business
Asiento 12	2	Business
Asiento 13	2	Business
Asiento 14	2	Business
Asiento 15	2	Business
Asiento 16	2	Business
Asiento 17	2	Business
Asiento 18	2	Business
Asiento 19	2	Business
Asiento 20	2	Business
Asiento 21	2	Business
Asiento 22	2	Business
Asiento 23	2	Business
Asiento 24	2	Business
Asiento 25	2	Business
Asiento 26	2	Business
Asiento 27	2	Business
Asiento 28	2	Business
Asiento 29	2	Business
Asiento 30	2	Business
Asiento 31	2	Business
Asiento 32	2	Business
Asiento 33	2	Business
Asiento 34	2	Business
Asiento 35	2	Business
Asiento 36	2	Business
Asiento 37	2	Business
Asiento 38	2	Business
Asiento 39	2	Business
Asiento 40	2	Business
Asiento 41	2	Económico
Asiento 42	2	Económico
Asiento 43	2	Económico
Asiento 44	2	Económico
Asiento 45	2	Económico
Asiento 46	2	Económico
Asiento 47	2	Económico
Asiento 48	2	Económico
Asiento 49	2	Económico
Asiento 50	2	Económico
Asiento 51	2	Económico
Asiento 52	2	Económico
Asiento 53	2	Económico
Asiento 54	2	Económico
Asiento 55	2	Económico
Asiento 56	2	Económico
Asiento 57	2	Económico
Asiento 58	2	Económico
Asiento 59	2	Económico
Asiento 60	2	Económico
Asiento 61	2	Económico
Asiento 62	2	Económico
Asiento 63	2	Económico
Asiento 64	2	Económico
Asiento 65	2	Económico
Asiento 66	2	Económico
Asiento 67	2	Económico
Asiento 68	2	Económico
Asiento 69	2	Económico
Asiento 70	2	Económico
Asiento 71	2	Económico
Asiento 72	2	Económico
Asiento 73	2	Económico
Asiento 74	2	Económico
Asiento 75	2	Económico
Asiento 76	2	Económico
Asiento 77	2	Económico
Asiento 78	2	Económico
Asiento 79	2	Económico
Asiento 80	2	Económico
A1	1	Business
A2	1	VIP
B1	2	Económico
B2	2	Económico
C1	1	Económico
\.


--
-- TOC entry 4929 (class 0 OID 41076)
-- Dependencies: 216
-- Data for Name: asientos_vuelo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asientos_vuelo (cvuelo, casiento, cavion) FROM stdin;
1	Asiento 1	2
1	Asiento 2	2
1	Asiento 3	2
1	Asiento 4	2
1	Asiento 5	2
1	Asiento 6	2
1	Asiento 7	2
1	Asiento 8	2
1	Asiento 9	2
1	Asiento 10	2
1	Asiento 11	2
1	Asiento 12	2
1	Asiento 13	2
1	Asiento 14	2
1	Asiento 15	2
1	Asiento 16	2
1	Asiento 17	2
1	Asiento 18	2
1	Asiento 19	2
1	Asiento 20	2
1	Asiento 21	2
1	Asiento 22	2
1	Asiento 23	2
1	Asiento 24	2
1	Asiento 25	2
1	Asiento 26	2
1	Asiento 27	2
1	Asiento 28	2
1	Asiento 29	2
1	Asiento 30	2
1	Asiento 31	2
1	Asiento 32	2
1	Asiento 33	2
1	Asiento 34	2
1	Asiento 35	2
1	Asiento 36	2
1	Asiento 37	2
1	Asiento 38	2
1	Asiento 39	2
1	Asiento 40	2
1	Asiento 41	2
1	Asiento 42	2
1	Asiento 43	2
1	Asiento 44	2
1	Asiento 45	2
1	Asiento 46	2
1	Asiento 47	2
1	Asiento 48	2
1	Asiento 49	2
1	Asiento 50	2
1	Asiento 51	2
1	Asiento 52	2
1	Asiento 53	2
1	Asiento 54	2
1	Asiento 55	2
1	Asiento 56	2
1	Asiento 57	2
1	Asiento 58	2
1	Asiento 59	2
1	Asiento 60	2
1	Asiento 61	2
1	Asiento 62	2
1	Asiento 63	2
1	Asiento 64	2
1	Asiento 65	2
1	Asiento 66	2
1	Asiento 67	2
1	Asiento 68	2
1	Asiento 69	2
1	Asiento 70	2
1	Asiento 71	2
1	Asiento 72	2
1	Asiento 73	2
1	Asiento 74	2
1	Asiento 75	2
1	Asiento 76	2
1	Asiento 77	2
1	Asiento 78	2
1	Asiento 79	2
1	Asiento 80	2
2	Asiento 1	2
2	Asiento 2	2
2	Asiento 3	2
2	Asiento 4	2
2	Asiento 5	2
2	Asiento 6	2
2	Asiento 7	2
2	Asiento 8	2
2	Asiento 9	2
2	Asiento 10	2
2	Asiento 11	2
2	Asiento 12	2
2	Asiento 13	2
2	Asiento 14	2
2	Asiento 15	2
2	Asiento 16	2
2	Asiento 17	2
2	Asiento 18	2
2	Asiento 19	2
2	Asiento 20	2
2	Asiento 21	2
2	Asiento 22	2
2	Asiento 23	2
2	Asiento 24	2
2	Asiento 25	2
2	Asiento 26	2
2	Asiento 27	2
2	Asiento 28	2
2	Asiento 29	2
2	Asiento 30	2
2	Asiento 31	2
2	Asiento 32	2
2	Asiento 33	2
2	Asiento 34	2
2	Asiento 35	2
2	Asiento 36	2
2	Asiento 37	2
2	Asiento 38	2
2	Asiento 39	2
2	Asiento 40	2
2	Asiento 41	2
2	Asiento 42	2
2	Asiento 43	2
2	Asiento 44	2
2	Asiento 45	2
2	Asiento 46	2
2	Asiento 47	2
2	Asiento 48	2
2	Asiento 49	2
2	Asiento 50	2
2	Asiento 51	2
2	Asiento 52	2
2	Asiento 53	2
2	Asiento 54	2
2	Asiento 55	2
2	Asiento 56	2
2	Asiento 57	2
2	Asiento 58	2
2	Asiento 59	2
2	Asiento 60	2
2	Asiento 61	2
2	Asiento 62	2
2	Asiento 63	2
2	Asiento 64	2
2	Asiento 65	2
2	Asiento 66	2
2	Asiento 67	2
2	Asiento 68	2
2	Asiento 69	2
2	Asiento 70	2
2	Asiento 71	2
2	Asiento 72	2
2	Asiento 73	2
2	Asiento 74	2
2	Asiento 75	2
2	Asiento 76	2
2	Asiento 77	2
2	Asiento 78	2
2	Asiento 79	2
2	Asiento 80	2
3	Asiento 1	2
3	Asiento 2	2
3	Asiento 3	2
3	Asiento 4	2
3	Asiento 5	2
3	Asiento 6	2
3	Asiento 7	2
3	Asiento 8	2
3	Asiento 9	2
3	Asiento 10	2
3	Asiento 11	2
3	Asiento 12	2
3	Asiento 13	2
3	Asiento 14	2
3	Asiento 15	2
3	Asiento 16	2
3	Asiento 17	2
3	Asiento 18	2
3	Asiento 19	2
3	Asiento 20	2
3	Asiento 21	2
3	Asiento 22	2
3	Asiento 23	2
3	Asiento 24	2
3	Asiento 25	2
3	Asiento 26	2
3	Asiento 27	2
3	Asiento 28	2
3	Asiento 29	2
3	Asiento 30	2
3	Asiento 31	2
3	Asiento 32	2
3	Asiento 33	2
3	Asiento 34	2
3	Asiento 35	2
3	Asiento 36	2
3	Asiento 37	2
3	Asiento 38	2
3	Asiento 39	2
3	Asiento 40	2
3	Asiento 41	2
3	Asiento 42	2
3	Asiento 43	2
3	Asiento 44	2
3	Asiento 45	2
3	Asiento 46	2
3	Asiento 47	2
3	Asiento 48	2
3	Asiento 49	2
3	Asiento 50	2
3	Asiento 51	2
3	Asiento 52	2
3	Asiento 53	2
3	Asiento 54	2
3	Asiento 55	2
3	Asiento 56	2
3	Asiento 57	2
3	Asiento 58	2
3	Asiento 59	2
3	Asiento 60	2
3	Asiento 61	2
3	Asiento 62	2
3	Asiento 63	2
3	Asiento 64	2
3	Asiento 65	2
3	Asiento 66	2
3	Asiento 67	2
3	Asiento 68	2
3	Asiento 69	2
3	Asiento 70	2
3	Asiento 71	2
3	Asiento 72	2
3	Asiento 73	2
3	Asiento 74	2
3	Asiento 75	2
3	Asiento 76	2
3	Asiento 77	2
3	Asiento 78	2
3	Asiento 79	2
3	Asiento 80	2
4	Asiento 1	2
4	Asiento 2	2
4	Asiento 3	2
4	Asiento 4	2
4	Asiento 5	2
4	Asiento 6	2
4	Asiento 7	2
4	Asiento 8	2
4	Asiento 9	2
4	Asiento 10	2
4	Asiento 11	2
4	Asiento 12	2
4	Asiento 13	2
4	Asiento 14	2
4	Asiento 15	2
4	Asiento 16	2
4	Asiento 17	2
4	Asiento 18	2
4	Asiento 19	2
4	Asiento 20	2
4	Asiento 21	2
4	Asiento 22	2
4	Asiento 23	2
4	Asiento 24	2
4	Asiento 25	2
4	Asiento 26	2
4	Asiento 27	2
4	Asiento 28	2
4	Asiento 29	2
4	Asiento 30	2
4	Asiento 31	2
4	Asiento 32	2
4	Asiento 33	2
4	Asiento 34	2
4	Asiento 35	2
4	Asiento 36	2
4	Asiento 37	2
4	Asiento 38	2
4	Asiento 39	2
4	Asiento 40	2
4	Asiento 41	2
4	Asiento 42	2
4	Asiento 43	2
4	Asiento 44	2
4	Asiento 45	2
4	Asiento 46	2
4	Asiento 47	2
4	Asiento 48	2
4	Asiento 49	2
4	Asiento 50	2
4	Asiento 51	2
4	Asiento 52	2
4	Asiento 53	2
4	Asiento 54	2
4	Asiento 55	2
4	Asiento 56	2
4	Asiento 57	2
4	Asiento 58	2
4	Asiento 59	2
4	Asiento 60	2
4	Asiento 61	2
4	Asiento 62	2
4	Asiento 63	2
4	Asiento 64	2
4	Asiento 65	2
4	Asiento 66	2
4	Asiento 67	2
4	Asiento 68	2
4	Asiento 69	2
4	Asiento 70	2
4	Asiento 71	2
4	Asiento 72	2
4	Asiento 73	2
4	Asiento 74	2
4	Asiento 75	2
4	Asiento 76	2
4	Asiento 77	2
4	Asiento 78	2
4	Asiento 79	2
4	Asiento 80	2
1	A1	1
1	A2	1
2	B1	2
2	B2	2
3	C1	1
10	Asiento 1	2
10	Asiento 2	2
10	Asiento 3	2
10	Asiento 4	2
10	Asiento 5	2
10	Asiento 6	2
10	Asiento 7	2
10	Asiento 8	2
10	Asiento 9	2
10	Asiento 10	2
10	Asiento 11	2
10	Asiento 12	2
10	Asiento 13	2
10	Asiento 14	2
10	Asiento 15	2
10	Asiento 16	2
10	Asiento 17	2
10	Asiento 18	2
10	Asiento 19	2
10	Asiento 20	2
10	Asiento 21	2
10	Asiento 22	2
10	Asiento 23	2
10	Asiento 24	2
10	Asiento 25	2
10	Asiento 26	2
10	Asiento 27	2
10	Asiento 28	2
10	Asiento 29	2
10	Asiento 30	2
10	Asiento 31	2
10	Asiento 32	2
10	Asiento 33	2
10	Asiento 34	2
10	Asiento 35	2
10	Asiento 36	2
10	Asiento 37	2
10	Asiento 38	2
10	Asiento 39	2
10	Asiento 40	2
10	Asiento 41	2
10	Asiento 42	2
10	Asiento 43	2
10	Asiento 44	2
10	Asiento 45	2
10	Asiento 46	2
10	Asiento 47	2
10	Asiento 48	2
10	Asiento 49	2
10	Asiento 50	2
10	Asiento 51	2
10	Asiento 52	2
10	Asiento 53	2
10	Asiento 54	2
10	Asiento 55	2
10	Asiento 56	2
10	Asiento 57	2
10	Asiento 58	2
10	Asiento 59	2
10	Asiento 60	2
10	Asiento 61	2
10	Asiento 62	2
10	Asiento 63	2
10	Asiento 64	2
10	Asiento 65	2
10	Asiento 66	2
10	Asiento 67	2
10	Asiento 68	2
10	Asiento 69	2
10	Asiento 70	2
10	Asiento 71	2
10	Asiento 72	2
10	Asiento 73	2
10	Asiento 74	2
10	Asiento 75	2
10	Asiento 76	2
10	Asiento 77	2
10	Asiento 78	2
10	Asiento 79	2
10	Asiento 80	2
11	Asiento 1	2
11	Asiento 2	2
11	Asiento 3	2
11	Asiento 4	2
11	Asiento 5	2
11	Asiento 6	2
11	Asiento 7	2
11	Asiento 8	2
11	Asiento 9	2
11	Asiento 10	2
11	Asiento 11	2
11	Asiento 12	2
11	Asiento 13	2
11	Asiento 14	2
11	Asiento 15	2
11	Asiento 16	2
11	Asiento 17	2
11	Asiento 18	2
11	Asiento 19	2
11	Asiento 20	2
11	Asiento 21	2
11	Asiento 22	2
11	Asiento 23	2
11	Asiento 24	2
11	Asiento 25	2
11	Asiento 26	2
11	Asiento 27	2
11	Asiento 28	2
11	Asiento 29	2
11	Asiento 30	2
11	Asiento 31	2
11	Asiento 32	2
11	Asiento 33	2
11	Asiento 34	2
11	Asiento 35	2
11	Asiento 36	2
11	Asiento 37	2
11	Asiento 38	2
11	Asiento 39	2
11	Asiento 40	2
11	Asiento 41	2
11	Asiento 42	2
11	Asiento 43	2
11	Asiento 44	2
11	Asiento 45	2
11	Asiento 46	2
11	Asiento 47	2
11	Asiento 48	2
11	Asiento 49	2
11	Asiento 50	2
11	Asiento 51	2
11	Asiento 52	2
11	Asiento 53	2
11	Asiento 54	2
11	Asiento 55	2
11	Asiento 56	2
11	Asiento 57	2
11	Asiento 58	2
11	Asiento 59	2
11	Asiento 60	2
11	Asiento 61	2
11	Asiento 62	2
11	Asiento 63	2
11	Asiento 64	2
11	Asiento 65	2
11	Asiento 66	2
11	Asiento 67	2
11	Asiento 68	2
11	Asiento 69	2
11	Asiento 70	2
11	Asiento 71	2
11	Asiento 72	2
11	Asiento 73	2
11	Asiento 74	2
11	Asiento 75	2
11	Asiento 76	2
11	Asiento 77	2
11	Asiento 78	2
11	Asiento 79	2
11	Asiento 80	2
12	Asiento 1	2
12	Asiento 2	2
12	Asiento 3	2
12	Asiento 4	2
12	Asiento 5	2
12	Asiento 6	2
12	Asiento 7	2
12	Asiento 8	2
12	Asiento 9	2
12	Asiento 10	2
12	Asiento 11	2
12	Asiento 12	2
12	Asiento 13	2
12	Asiento 14	2
12	Asiento 15	2
12	Asiento 16	2
12	Asiento 17	2
12	Asiento 18	2
12	Asiento 19	2
12	Asiento 20	2
12	Asiento 21	2
12	Asiento 22	2
12	Asiento 23	2
12	Asiento 24	2
12	Asiento 25	2
12	Asiento 26	2
12	Asiento 27	2
12	Asiento 28	2
12	Asiento 29	2
12	Asiento 30	2
12	Asiento 31	2
12	Asiento 32	2
12	Asiento 33	2
12	Asiento 34	2
12	Asiento 35	2
12	Asiento 36	2
12	Asiento 37	2
12	Asiento 38	2
12	Asiento 39	2
12	Asiento 40	2
12	Asiento 41	2
12	Asiento 42	2
12	Asiento 43	2
12	Asiento 44	2
12	Asiento 45	2
12	Asiento 46	2
12	Asiento 47	2
12	Asiento 48	2
12	Asiento 49	2
12	Asiento 50	2
12	Asiento 51	2
12	Asiento 52	2
12	Asiento 53	2
12	Asiento 54	2
12	Asiento 55	2
12	Asiento 56	2
12	Asiento 57	2
12	Asiento 58	2
12	Asiento 59	2
12	Asiento 60	2
12	Asiento 61	2
12	Asiento 62	2
12	Asiento 63	2
12	Asiento 64	2
12	Asiento 65	2
12	Asiento 66	2
12	Asiento 67	2
12	Asiento 68	2
12	Asiento 69	2
12	Asiento 70	2
12	Asiento 71	2
12	Asiento 72	2
12	Asiento 73	2
12	Asiento 74	2
12	Asiento 75	2
12	Asiento 76	2
12	Asiento 77	2
12	Asiento 78	2
12	Asiento 79	2
12	Asiento 80	2
13	Asiento 1	2
13	Asiento 2	2
13	Asiento 3	2
13	Asiento 4	2
13	Asiento 5	2
13	Asiento 6	2
13	Asiento 7	2
13	Asiento 8	2
13	Asiento 9	2
13	Asiento 10	2
13	Asiento 11	2
13	Asiento 12	2
13	Asiento 13	2
13	Asiento 14	2
13	Asiento 15	2
13	Asiento 16	2
13	Asiento 17	2
13	Asiento 18	2
13	Asiento 19	2
13	Asiento 20	2
13	Asiento 21	2
13	Asiento 22	2
13	Asiento 23	2
13	Asiento 24	2
13	Asiento 25	2
13	Asiento 26	2
13	Asiento 27	2
13	Asiento 28	2
13	Asiento 29	2
13	Asiento 30	2
13	Asiento 31	2
13	Asiento 32	2
13	Asiento 33	2
13	Asiento 34	2
13	Asiento 35	2
13	Asiento 36	2
13	Asiento 37	2
13	Asiento 38	2
13	Asiento 39	2
13	Asiento 40	2
13	Asiento 41	2
13	Asiento 42	2
13	Asiento 43	2
13	Asiento 44	2
13	Asiento 45	2
13	Asiento 46	2
13	Asiento 47	2
13	Asiento 48	2
13	Asiento 49	2
13	Asiento 50	2
13	Asiento 51	2
13	Asiento 52	2
13	Asiento 53	2
13	Asiento 54	2
13	Asiento 55	2
13	Asiento 56	2
13	Asiento 57	2
13	Asiento 58	2
13	Asiento 59	2
13	Asiento 60	2
13	Asiento 61	2
13	Asiento 62	2
13	Asiento 63	2
13	Asiento 64	2
13	Asiento 65	2
13	Asiento 66	2
13	Asiento 67	2
13	Asiento 68	2
13	Asiento 69	2
13	Asiento 70	2
13	Asiento 71	2
13	Asiento 72	2
13	Asiento 73	2
13	Asiento 74	2
13	Asiento 75	2
13	Asiento 76	2
13	Asiento 77	2
13	Asiento 78	2
13	Asiento 79	2
13	Asiento 80	2
14	Asiento 1	1
14	Asiento 2	1
14	Asiento 3	1
14	Asiento 4	1
14	Asiento 5	1
14	Asiento 6	1
14	Asiento 7	1
14	Asiento 8	1
14	Asiento 9	1
14	Asiento 10	1
14	Asiento 11	1
14	Asiento 12	1
14	Asiento 13	1
14	Asiento 14	1
14	Asiento 15	1
14	Asiento 16	1
14	Asiento 17	1
14	Asiento 18	1
14	Asiento 19	1
14	Asiento 20	1
14	Asiento 21	1
14	Asiento 22	1
14	Asiento 23	1
14	Asiento 24	1
14	Asiento 25	1
14	Asiento 26	1
14	Asiento 27	1
14	Asiento 28	1
14	Asiento 29	1
14	Asiento 30	1
14	Asiento 31	1
14	Asiento 32	1
14	Asiento 33	1
14	Asiento 34	1
14	Asiento 35	1
14	Asiento 36	1
14	Asiento 37	1
14	Asiento 38	1
14	Asiento 39	1
14	Asiento 40	1
14	Asiento 41	1
14	Asiento 42	1
14	Asiento 43	1
14	Asiento 44	1
14	Asiento 45	1
14	Asiento 46	1
14	Asiento 47	1
14	Asiento 48	1
14	Asiento 49	1
14	Asiento 50	1
14	Asiento 51	1
14	Asiento 52	1
14	Asiento 53	1
14	Asiento 54	1
14	Asiento 55	1
14	Asiento 56	1
14	Asiento 57	1
14	Asiento 58	1
14	Asiento 59	1
14	Asiento 60	1
14	Asiento 61	1
14	Asiento 62	1
14	Asiento 63	1
14	Asiento 64	1
14	Asiento 65	1
14	Asiento 66	1
14	Asiento 67	1
14	Asiento 68	1
14	Asiento 69	1
14	Asiento 70	1
14	Asiento 71	1
14	Asiento 72	1
14	Asiento 73	1
14	Asiento 74	1
14	Asiento 75	1
14	Asiento 76	1
14	Asiento 77	1
14	Asiento 78	1
14	Asiento 79	1
14	Asiento 80	1
\.


--
-- TOC entry 4956 (class 0 OID 90138)
-- Dependencies: 243
-- Data for Name: audi; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.audi (correo_usuario, fecha) FROM stdin;
	
danialee14@gmail.com	Fri May 10 2024 16:20:14 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:20:33 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:24:53 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:24:54 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:24:55 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:24:55 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:25:03 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:25:11 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:26:43 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:26:44 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:26:57 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:26:58 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:28:24 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:28:26 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:28:32 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:30:12 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Fri May 10 2024 16:31:44 GMT-0400 (hora de Bolivia)
daniela.guzman,b@ucb.edu.bo	Fri May 10 2024 16:33:19 GMT-0400 (hora de Bolivia)
daniela.gwrhwb@ucb.edu.bo	Fri May 10 2024 16:34:24 GMT-0400 (hora de Bolivia)
dangewgwg@ucb.edu.bo	Fri May 10 2024 16:34:39 GMT-0400 (hora de Bolivia)
ayana.siegle@ucb.edu.bo	Fri May 10 2024 17:06:47 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Sun May 26 2024 19:52:22 GMT-0400 (hora de Bolivia)
danielita@ucb.edu.bo	Sun May 26 2024 19:52:46 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:04:09 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:13:44 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:16:00 GMT-0400 (hora de Bolivia)
pepe@gmail.com	Mon May 27 2024 19:18:26 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:19:24 GMT-0400 (hora de Bolivia)
pepe@gmail.com	Mon May 27 2024 19:19:49 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:23:01 GMT-0400 (hora de Bolivia)
pepe@gmail.com	Mon May 27 2024 19:24:54 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:27:40 GMT-0400 (hora de Bolivia)
pepe@gmail.com	Mon May 27 2024 19:32:35 GMT-0400 (hora de Bolivia)
pepe@gmail.com	Mon May 27 2024 19:37:03 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Mon May 27 2024 19:37:19 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Wed May 29 2024 16:48:37 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Wed May 29 2024 23:35:20 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Wed May 29 2024 23:36:50 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Wed May 29 2024 23:43:39 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Thu May 30 2024 21:45:34 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Thu May 30 2024 21:50:48 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Thu Jun 13 2024 10:50:39 GMT-0400 (hora de Bolivia)
danialee14@gmail.com	Sun Apr 27 2025 15:21:47 GMT-0400 (hora de Bolivia)
danielita@ucb.edu.bo	Sun Apr 27 2025 16:04:32 GMT-0400 (hora de Bolivia)
\.


--
-- TOC entry 4931 (class 0 OID 41082)
-- Dependencies: 218
-- Data for Name: aviones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.aviones (cavion, capacidad) FROM stdin;
1	80
2	80
7	150
8	90
9	80
10	120
11	100
\.


--
-- TOC entry 4933 (class 0 OID 41089)
-- Dependencies: 220
-- Data for Name: boletos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.boletos (cboleto, ci_persona, ccheck_in, cvuelo, casiento, total) FROM stdin;
1	12345678	11	4	Asiento 9	300,00 €
\.


--
-- TOC entry 4935 (class 0 OID 41096)
-- Dependencies: 222
-- Data for Name: check_in; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.check_in (ccheck_in, correo_usuario, fecha_check_in, numero_documento, tipodoc, equipaje_mano, maleta, equipaje_extra, estado_checkin) FROM stdin;
7	dadguzman.b@ucb.edu.bo	2024-06-11	2345678	Pasaporte	t	t	f	Realizado
8	danialee14@gmail.com	2024-06-14	3456789	Carnet de Identidad	f	t	f	Pendiente
9	daniela.gen.b@ucb.edu.bo	2024-06-17	4567890	DNI	t	f	f	Pendiente
10	danielaegwkjghwkzman.b@ucb.edu.bo	2024-06-19	5678901	Pasaporte	t	t	t	Pendiente
6	andrea.fernandez.l@ucb.edu.bo	2024-06-09	1234567	DNI	t	f	t	Realizado
11	danialee14@gmail.com	2024-06-10	12345678	Carnet de Identidad	f	f	f	Realizado
\.


--
-- TOC entry 4936 (class 0 OID 41102)
-- Dependencies: 223
-- Data for Name: ciudad; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ciudad (ciudad) FROM stdin;
La Paz
Cochabamba
Santa Cruz
Sucre
Tarija
Potosí
Oruro
Beni
Pando
\.


--
-- TOC entry 4937 (class 0 OID 41107)
-- Dependencies: 224
-- Data for Name: estados_reserva; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.estados_reserva (estado_reserva) FROM stdin;
Realizado
Pendiente
Pagado
Confirmada
Cancelada
\.


--
-- TOC entry 4958 (class 0 OID 98358)
-- Dependencies: 245
-- Data for Name: opiniones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opiniones (copinion, fecha_opinion, correo_usuario, nombres_usuario, apellidos_usuario, comentario, estrellas) FROM stdin;
22	2024-05-01 10:15:00	jose.perez@example.com	Jose	Perez	Excelente servicio, el vuelo salió a tiempo y la tripulación fue muy amable.	5
23	2024-05-02 14:30:00	maria.lopez@example.com	Maria	Lopez	Muy buena experiencia, volvería a volar con ustedes.	4
24	2024-05-03 09:45:00	juan.garcia@example.com	Juan	Garcia	El vuelo fue cómodo y llegamos antes de lo esperado.	5
25	2024-05-04 18:20:00	ana.martinez@example.com	Ana	Martinez	Todo bien, pero podrían mejorar la comida a bordo.	3
26	2024-05-05 11:10:00	luis.rodriguez@example.com	Luis	Rodriguez	El personal fue muy atento y el vuelo tranquilo.	4
27	2024-05-06 15:50:00	carla.gomez@example.com	Carla	Gomez	Excelente atención y puntualidad, muy recomendable.	5
28	2024-05-07 08:30:00	fernando.fernandez@example.com	Fernando	Fernandez	Buen servicio, aunque hubo un pequeño retraso.	4
29	2024-05-08 17:00:00	laura.morales@example.com	Laura	Morales	Viaje cómodo y seguro, lo recomiendo.	5
30	2024-05-09 12:25:00	oscar.ramos@example.com	Oscar	Ramos	La atención a bordo fue excelente.	5
31	2024-05-10 19:40:00	lucia.torres@example.com	Lucia	Torres	Todo bien, aunque el entretenimiento a bordo es limitado.	3
32	2024-05-11 13:05:00	pablo.mendoza@example.com	Pablo	Mendoza	El vuelo fue placentero y el personal muy amable.	4
33	2024-05-12 16:15:00	sofia.flores@example.com	Sofia	Flores	Muy buena experiencia, repetiré en el futuro.	5
34	2024-05-13 07:50:00	diego.sanchez@example.com	Diego	Sanchez	Hubo un retraso, pero el personal fue muy profesional.	3
35	2024-05-14 14:00:00	camila.diaz@example.com	Camila	Diaz	Excelente servicio y puntualidad.	5
36	2024-05-15 10:20:00	gabriel.romero@example.com	Gabriel	Romero	Todo estuvo bien, pero podrían mejorar el check-in.	4
37	2024-05-16 18:35:00	javier.ortiz@example.com	Javier	Ortiz	El vuelo fue agradable y sin contratiempos.	5
38	2024-05-17 11:55:00	alicia.rivera@example.com	Alicia	Rivera	Muy buena atención y vuelo cómodo.	4
39	2024-05-18 09:30:00	rafael.gutierrez@example.com	Rafael	Gutierrez	Todo excelente, muy recomendable.	5
40	2024-05-19 17:45:00	veronica.ruiz@example.com	Veronica	Ruiz	El personal fue muy atento, aunque el vuelo se retrasó un poco.	4
41	2024-05-20 12:10:00	eduardo.herrera@example.com	Eduardo	Herrera	Excelente experiencia, volveré a volar con Vuela Bo.	5
\.


--
-- TOC entry 4938 (class 0 OID 41112)
-- Dependencies: 225
-- Data for Name: pais_proce; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pais_proce (pais_origen) FROM stdin;
Bolivia
México
Chile
Perú
Argentina
\.


--
-- TOC entry 4939 (class 0 OID 41117)
-- Dependencies: 226
-- Data for Name: personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.personas (ci_persona, nombres, apellidos, fecha_nacimiento, sexo, tipo_persona, pais_origen) FROM stdin;
8002000	Carlos	Mendez	1980-02-15	Masculino	Adulto	Bolivia
8002001	Maria	Perez	1989-07-23	Femenino	Adulto	Chile
1234567	Juan	Perez	1990-05-15	Masculino	Adulto mayor	Bolivia
2345678	Maria	Gomez	1985-08-20	Femenino	Adulto	Bolivia
3456789	Carlos	Lopez	1978-03-10	Masculino	Niño	Bolivia
4567890	Laura	Rodriguez	1995-11-25	Femenino	Adulto	Bolivia
5678901	Pedro	Martinez	1980-07-03	Masculino	Adulto mayor	Bolivia
8002003	Miles	Morales	2024-01-23	Masculino	Bebe	Bolivia
12345678	Maria Magdalena	Perez Paredes	2021-02-28	Mujer	Adulto	\N
23444153	Rosario Maria	Perez Paredes	2018-01-29	Mujer	Adulto	\N
52511142	Pedro Pepe	Gimenez Pereira	1998-11-19	Hombre	Adulto mayor	\N
12446313	Jose Juan	Mamani Mamani	1994-06-30	Hombre	Adulto	\N
\.


--
-- TOC entry 4940 (class 0 OID 41124)
-- Dependencies: 227
-- Data for Name: premios_millas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.premios_millas (premio, tipo_premio, producto_destacado, millas, src_foto) FROM stdin;
Viaje a Santa Cruz	Viaje	t	50000	/Aerolinea-Web-Segura/public/assets/santa.webp
Reloj de Lujo	Producto	f	25000	/Aerolinea-Web-Segura/public/assets/reloj.webp
Cena Gourmet	Comida	f	10000	/Aerolinea-Web-Segura/public/assets/cena.webp
Auriculares Inalámbricos	Producto	t	15000	/Aerolinea-Web-Segura/public/assets/auriculares.webp
Estancia en Hotel 5 Estrellas	Experiencia	t	30000	/Aerolinea-Web-Segura/public/assets/hotel.webp
Bicicleta de Montaña	Producto	f	20000	/Aerolinea-Web-Segura/public/assets/bici.webp
Spa de Lujo	Cuidado Personal	f	12000	/Aerolinea-Web-Segura/public/assets/spa.webp
Televisor 4K	Producto	t	35000	/Aerolinea-Web-Segura/public/assets/televisor.webp
Entradas para Concierto	Otro	f	8000	/Aerolinea-Web-Segura/public/assets/concierto.webp
Maleta de Viaje	Producto	f	7000	/Aerolinea-Web-Segura/public/assets/maleta.webp
\.


--
-- TOC entry 4941 (class 0 OID 41129)
-- Dependencies: 228
-- Data for Name: premios_usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.premios_usuarios (premio, correo_usuario) FROM stdin;
\.


--
-- TOC entry 4943 (class 0 OID 41135)
-- Dependencies: 230
-- Data for Name: reservas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservas (creserva, correo_usuario, fecha_reserva, fecha_lmite) FROM stdin;
3	joshnisth@gmail.com	2024-05-10	2024-05-12
4	danialee14@gmail.com	2024-05-18	2024-05-20
10	andrea.fernandez.l@ucb.edu.bo	2024-06-05	2024-06-08
11	dadguzman.b@ucb.edu.bo	2024-06-07	2024-06-10
13	daniela.gen.b@ucb.edu.bo	2024-06-13	2024-06-16
14	danielaegwkjghwkzman.b@ucb.edu.bo	2024-06-15	2024-06-18
15	andrea.fernandez.l@ucb.edu.bo	2024-06-05	2024-06-08
16	dadguzman.b@ucb.edu.bo	2024-06-07	2024-06-10
17	danialee14@gmail.com	2024-06-10	2024-06-13
18	daniela.gen.b@ucb.edu.bo	2024-06-13	2024-06-16
19	danielaegwkjghwkzman.b@ucb.edu.bo	2024-06-15	2024-06-18
26	andrea.fernandez.l@ucb.edu.bo	2024-06-25	2024-06-27
27	andrea.fernandez.l@ucb.edu.bo	2024-06-25	2024-06-27
28	andrea.fernandez.l@ucb.edu.bo	2024-06-25	2024-06-27
12	danialee14@gmail.com	2024-06-01	2024-06-13
29	danialee14@gmail.com	2024-06-25	2024-06-27
30	danialee14@gmail.com	2024-06-25	2024-06-27
31	danialee14@gmail.com	2024-05-31	2024-06-02
32	danialee14@gmail.com	2024-05-31	2024-06-02
33	danialee14@gmail.com	2024-05-31	2024-06-02
34	danialee14@gmail.com	2024-05-31	2024-06-02
35	danialee14@gmail.com	2024-05-31	2024-06-02
36	danialee14@gmail.com	2024-05-31	2024-06-02
37	danialee14@gmail.com	2024-05-31	2024-06-02
38	danialee14@gmail.com	2024-05-31	2024-06-02
39	danialee14@gmail.com	2024-05-31	2024-06-02
40	danialee14@gmail.com	2024-05-31	2024-06-02
41	danialee14@gmail.com	2024-05-31	2024-06-02
42	danialee14@gmail.com	2024-05-31	2024-06-02
43	danialee14@gmail.com	2024-05-31	2024-06-02
45	danialee14@gmail.com	2024-05-31	2024-06-02
46	danialee14@gmail.com	2024-05-31	2024-06-02
47	danialee14@gmail.com	2024-05-31	2024-06-10
48	danialee14@gmail.com	2024-05-31	2024-06-10
49	danialee14@gmail.com	2024-05-31	2024-06-10
50	danialee14@gmail.com	2024-05-31	2024-06-10
51	danialee14@gmail.com	2024-05-31	2024-06-10
52	danialee14@gmail.com	2024-05-31	2024-06-10
53	danialee14@gmail.com	2024-05-31	2024-06-10
55	danialee14@gmail.com	2024-05-31	2024-06-10
56	danialee14@gmail.com	2024-05-31	2024-06-10
57	danialee14@gmail.com	2024-05-31	2024-06-02
58	danialee14@gmail.com	2024-05-31	2024-06-02
59	danialee14@gmail.com	2024-05-31	2024-07-15
61	danialee14@gmail.com	2024-05-31	2024-06-10
63	danialee14@gmail.com	2024-05-31	2024-06-10
65	danialee14@gmail.com	2024-05-31	2024-06-10
67	danialee14@gmail.com	2024-05-31	2024-06-10
69	danialee14@gmail.com	2024-05-31	2024-06-10
70	danialee14@gmail.com	2024-05-31	2024-06-10
71	danialee14@gmail.com	2024-05-31	2024-06-10
72	danialee14@gmail.com	2024-05-31	2024-06-10
73	danialee14@gmail.com	2024-05-31	2024-06-10
74	danialee14@gmail.com	2024-05-31	2024-06-10
75	danialee14@gmail.com	2024-05-31	2024-06-10
76	danialee14@gmail.com	2024-05-31	2024-06-10
77	danialee14@gmail.com	2024-05-31	2024-06-10
78	danialee14@gmail.com	2024-05-31	2024-06-10
79	danialee14@gmail.com	2024-05-31	2024-06-10
80	danialee14@gmail.com	2024-05-31	2024-06-10
81	danialee14@gmail.com	2024-05-31	2024-06-10
82	danialee14@gmail.com	2024-05-31	2024-06-10
83	danialee14@gmail.com	2024-05-31	2024-06-10
84	danialee14@gmail.com	2024-05-31	2024-06-10
85	danialee14@gmail.com	2024-05-31	2024-06-10
86	danialee14@gmail.com	2024-05-31	2024-06-10
87	danialee14@gmail.com	2024-05-31	2024-08-21
88	danialee14@gmail.com	2024-05-31	2024-08-21
89	danialee14@gmail.com	2024-05-31	2024-07-17
90	danialee14@gmail.com	2024-05-31	2024-07-17
\.


--
-- TOC entry 4944 (class 0 OID 41141)
-- Dependencies: 231
-- Data for Name: reservas_personas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reservas_personas (creserva, ci_persona, estado_reserva, cvuelo, casiento) FROM stdin;
3	8002003	Pagado	2	Asiento 2
4	8002001	Pendiente	3	Asiento 2
3	8002000	Pagado	2	Asiento 1
11	1234567	Confirmada	1	A1
12	2345678	Pendiente	2	B1
13	3456789	Cancelada	3	C1
14	4567890	Confirmada	1	A2
15	5678901	Pendiente	2	B2
56	12345678	Pagado	4	Asiento 9
58	23444153	Pagado	13	Asiento 8
90	12446313	Pendiente	11	Asiento 38
90	52511142	Pendiente	11	Asiento 39
\.


--
-- TOC entry 4959 (class 0 OID 106549)
-- Dependencies: 246
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (rol, accesos) FROM stdin;
admin	{\n    "crear_usuario": true,\n    "editar_usuario": true,\n    "eliminar_usuario": true,\n    "ver_reportes": true\n}
usuario	{\n    "crear_usuario": false,\n    "editar_usuario": false,\n    "eliminar_usuario": false,\n    "ver_reportes": true\n}
\.


--
-- TOC entry 4945 (class 0 OID 41146)
-- Dependencies: 232
-- Data for Name: tipo_doc; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tipo_doc (tipodoc) FROM stdin;
DNI
Pasaporte
Carnet de Identidad
\.


--
-- TOC entry 4946 (class 0 OID 41151)
-- Dependencies: 233
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (correo_usuario, "contraseña", nombres_usuario, apellidos_usuario, tipo_usuario, millas) FROM stdin;
pepe@gmail.com	7edede46f596b580cd10469463987280	pepe	perez	cliente	0
pepe2@gmail.com	7edede46f596b580cd10469463987280	pepe	perez	cliente	0
maria@gmail.com	f8461b554d59b3014e8ff5165dc62fac	maria	mamani	cliente	0
pepito@gmail.com	4f79a140f65c09dc4604a77d755cf273	pepe	reseee	cliente	0
hshjs@xnsm	3f585d2527cd6ec4a4468032c8d5fe34	daniela	gda	cliente	0
daniela.wwguzman.b@ucb.edu.bo	578271c950efaf117569a156a126e3a1	alejandra	ehswr	cliente	0
daniela.gen.b@ucb.edu.bo	e2d5dc666e4b2ed79fd20194821c205f	hdhs	hseh	cliente	0
dadguzman.b@ucb.edu.bo	653cc64c3d2f16c2bb5e8d0ea7db0718	daniela	dbsb	cliente	0
ddrhashuzman.b@ucb.edu.bo	c5e7d6d0178e09bdeefc785733503428	alejandra	srhs	cliente	0
danieldn.b@ucb.edu.bo	8ce74a745d65c3973e0a3e25e975313b	daniela	ddvd	cliente	0
danielaegwkjghwkzman.b@ucb.edu.bo	eb1df4111f8a5e72fb333e48746da04a	daniela	ddvd	cliente	0
dan14@gmail.com	8fc828b696ba1cd92eab8d0a6ffb17d6	daniela	ddvd	cliente	0
dbibub14@gmail.com	8fc828b696ba1cd92eab8d0a6ffb17d6	daniela	ddvd	cliente	0
guzman.b@ucb.edu.bo	8fc828b696ba1cd92eab8d0a6ffb17d6	daniela	ddvd	cliente	0
daniela.guzman.b@ucb.edu.bo	8fc828b696ba1cd92eab8d0a6ffb17d6	Daniela	Guzman	cliente	0
danielita@ucb.edu.bo	8fc828b696ba1cd92eab8d0a6ffb17d6	Daniela	Guzman	administrador	0
joshnisth@gmail.com	689e064e6a5ff0dc90387bdaa52f2fba	Josue	Nisthaus	cliente	0
andrea.fernandez.l@ucb.edu.bo	9450476b384b32d8ad8b758e76c98a69	Andreita Las mas Bonis	Laffertt la mas bonis de guzman	cliente	0
ayana.siegle@ucb.edu.bo	e73c39181a9a4fd35bac21757172e926	Ayana	Siegle	cliente	0
danialee14@gmail.com	8fc828b696ba1cd92eab8d0a6ffb17d6	daniela	guzman	cliente	60
\.


--
-- TOC entry 4955 (class 0 OID 90129)
-- Dependencies: 242
-- Data for Name: verificaciones_correo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verificaciones_correo (id, correo, codigo_verificacion, fecha_expiracion) FROM stdin;
7	daniela.guzman.b@ucb.edu.bo	b56501	2024-05-06 14:37:32.371523
8	danialee14@gmail.com	5019cb	2024-05-06 14:38:56.236774
9	danialee14@gmail.com	18dae1	2024-05-06 14:47:44.003141
10	danialee14@gmail.com	e3d66e	2024-05-06 14:51:35.303242
11	danialee14@gmail.com	5a1a36	2024-05-06 14:56:17.646805
12	dan14@gmail.com	611bcf	2024-05-06 14:58:20.442056
13	dbibub14@gmail.com	587389	2024-05-06 15:00:01.634237
14	guzman.b@ucb.edu.bo	a6abb9	2024-05-06 15:02:29.306035
15	daniela.guzman.b@ucb.edu.bo	0f448c	2024-05-06 15:05:42.187854
16	danialee14@gmail.com	4aad16	2024-05-06 15:09:01.35998
\.


--
-- TOC entry 4948 (class 0 OID 41159)
-- Dependencies: 235
-- Data for Name: vuelos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vuelos (cvuelo, fecha_vuelo, costovip, origen, destino, costobusiness, costoeco) FROM stdin;
1	2024-06-10 00:00:00	300,00 €	Cochabamba	Santa Cruz	220,00 €	122,00 €
2	2024-06-22 00:00:00	300,00 €	Cochabamba	Oruro	220,00 €	122,00 €
3	2024-06-10 00:00:00	300,00 €	Tarija	Sucre	220,00 €	122,00 €
4	2024-06-10 00:00:00	300,00 €	La Paz	Sucre	220,00 €	122,00 €
10	2024-07-15 00:00:00	300,00 €	La Paz	Santa Cruz	220,00 €	122,00 €
11	2024-07-17 00:00:00	300,00 €	La Paz	Santa Cruz	0,00 €	122,00 €
12	2024-06-01 19:33:00	200,00 €	La Paz	Sucre	333,00 €	111,00 €
13	2024-06-02 18:34:00	1.155,00 €	La Paz	Potosí	111,00 €	222,00 €
14	2024-08-21 01:02:00	1.000,00 €	Cochabamba	La Paz	500,00 €	350,00 €
\.


--
-- TOC entry 4972 (class 0 OID 0)
-- Dependencies: 236
-- Name: avion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.avion_seq', 1, false);


--
-- TOC entry 4973 (class 0 OID 0)
-- Dependencies: 217
-- Name: aviones_cavion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.aviones_cavion_seq', 11, true);


--
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 219
-- Name: boletos_cboleto_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.boletos_cboleto_seq', 2, true);


--
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 221
-- Name: check_in_ccheck_in_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.check_in_ccheck_in_seq', 12, true);


--
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 237
-- Name: check_in_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.check_in_seq', 1, false);


--
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 244
-- Name: opiniones_copinion_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opiniones_copinion_seq', 50, true);


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 238
-- Name: reserva_vuelos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reserva_vuelos_seq', 1, false);


--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 229
-- Name: reservas_creserva_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservas_creserva_seq', 90, true);


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 239
-- Name: ubicaciones_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ubicaciones_seq', 1, false);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 241
-- Name: verificaciones_correo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.verificaciones_correo_id_seq', 16, true);


--
-- TOC entry 4982 (class 0 OID 0)
-- Dependencies: 234
-- Name: vuelos_cvuelo_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vuelos_cvuelo_seq', 14, true);


--
-- TOC entry 4983 (class 0 OID 0)
-- Dependencies: 240
-- Name: vuelos_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.vuelos_seq', 1, false);


--
-- TOC entry 4730 (class 2606 OID 41075)
-- Name: asientos asientos_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asientos
    ADD CONSTRAINT asientos_pk PRIMARY KEY (casiento, cavion);


--
-- TOC entry 4732 (class 2606 OID 41080)
-- Name: asientos_vuelo asientos_vuelo_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asientos_vuelo
    ADD CONSTRAINT asientos_vuelo_pk PRIMARY KEY (cvuelo, casiento);


--
-- TOC entry 4734 (class 2606 OID 41087)
-- Name: aviones aviones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.aviones
    ADD CONSTRAINT aviones_pkey PRIMARY KEY (cavion);


--
-- TOC entry 4736 (class 2606 OID 41094)
-- Name: boletos boletos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_pkey PRIMARY KEY (cboleto);


--
-- TOC entry 4738 (class 2606 OID 41101)
-- Name: check_in check_in_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.check_in
    ADD CONSTRAINT check_in_pkey PRIMARY KEY (ccheck_in);


--
-- TOC entry 4740 (class 2606 OID 41106)
-- Name: ciudad ciudad_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ciudad
    ADD CONSTRAINT ciudad_pk PRIMARY KEY (ciudad);


--
-- TOC entry 4742 (class 2606 OID 41111)
-- Name: estados_reserva estados_reserva_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.estados_reserva
    ADD CONSTRAINT estados_reserva_pk PRIMARY KEY (estado_reserva);


--
-- TOC entry 4764 (class 2606 OID 98365)
-- Name: opiniones opiniones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opiniones
    ADD CONSTRAINT opiniones_pkey PRIMARY KEY (copinion);


--
-- TOC entry 4744 (class 2606 OID 41116)
-- Name: pais_proce pais_proce_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pais_proce
    ADD CONSTRAINT pais_proce_pk PRIMARY KEY (pais_origen);


--
-- TOC entry 4746 (class 2606 OID 41123)
-- Name: personas personas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pk PRIMARY KEY (ci_persona);


--
-- TOC entry 4748 (class 2606 OID 41128)
-- Name: premios_millas premios_millas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.premios_millas
    ADD CONSTRAINT premios_millas_pk PRIMARY KEY (premio);


--
-- TOC entry 4750 (class 2606 OID 41133)
-- Name: premios_usuarios premios_usuarios_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.premios_usuarios
    ADD CONSTRAINT premios_usuarios_pk PRIMARY KEY (premio, correo_usuario);


--
-- TOC entry 4754 (class 2606 OID 41145)
-- Name: reservas_personas reservas_personas_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas_personas
    ADD CONSTRAINT reservas_personas_pk PRIMARY KEY (creserva, ci_persona);


--
-- TOC entry 4752 (class 2606 OID 41140)
-- Name: reservas reservas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_pkey PRIMARY KEY (creserva);


--
-- TOC entry 4766 (class 2606 OID 106555)
-- Name: roles roles_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pk PRIMARY KEY (rol);


--
-- TOC entry 4756 (class 2606 OID 41150)
-- Name: tipo_doc tipo_doc_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tipo_doc
    ADD CONSTRAINT tipo_doc_pk PRIMARY KEY (tipodoc);


--
-- TOC entry 4758 (class 2606 OID 41157)
-- Name: usuarios usuario_pk; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuario_pk PRIMARY KEY (correo_usuario);


--
-- TOC entry 4762 (class 2606 OID 90134)
-- Name: verificaciones_correo verificaciones_correo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verificaciones_correo
    ADD CONSTRAINT verificaciones_correo_pkey PRIMARY KEY (id);


--
-- TOC entry 4760 (class 2606 OID 41164)
-- Name: vuelos vuelos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vuelos
    ADD CONSTRAINT vuelos_pkey PRIMARY KEY (cvuelo);


--
-- TOC entry 4767 (class 2606 OID 41170)
-- Name: asientos asientos_aviones; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asientos
    ADD CONSTRAINT asientos_aviones FOREIGN KEY (cavion) REFERENCES public.aviones(cavion);


--
-- TOC entry 4768 (class 2606 OID 41175)
-- Name: asientos_vuelo asientos_vuelo_asientos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asientos_vuelo
    ADD CONSTRAINT asientos_vuelo_asientos FOREIGN KEY (casiento, cavion) REFERENCES public.asientos(casiento, cavion);


--
-- TOC entry 4769 (class 2606 OID 41180)
-- Name: asientos_vuelo asientos_vuelo_vuelos; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asientos_vuelo
    ADD CONSTRAINT asientos_vuelo_vuelos FOREIGN KEY (cvuelo) REFERENCES public.vuelos(cvuelo);


--
-- TOC entry 4770 (class 2606 OID 41185)
-- Name: boletos boletos_asientos_vuelo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_asientos_vuelo FOREIGN KEY (cvuelo, casiento) REFERENCES public.asientos_vuelo(cvuelo, casiento);


--
-- TOC entry 4771 (class 2606 OID 41165)
-- Name: boletos boletos_check_in; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_check_in FOREIGN KEY (ccheck_in) REFERENCES public.check_in(ccheck_in);


--
-- TOC entry 4772 (class 2606 OID 41190)
-- Name: boletos boletos_personas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boletos
    ADD CONSTRAINT boletos_personas FOREIGN KEY (ci_persona) REFERENCES public.personas(ci_persona);


--
-- TOC entry 4773 (class 2606 OID 41195)
-- Name: check_in check_in_tipo_doc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.check_in
    ADD CONSTRAINT check_in_tipo_doc FOREIGN KEY (tipodoc) REFERENCES public.tipo_doc(tipodoc);


--
-- TOC entry 4774 (class 2606 OID 41200)
-- Name: check_in check_in_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.check_in
    ADD CONSTRAINT check_in_usuarios FOREIGN KEY (correo_usuario) REFERENCES public.usuarios(correo_usuario);


--
-- TOC entry 4775 (class 2606 OID 41205)
-- Name: personas personas_pais_proce; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.personas
    ADD CONSTRAINT personas_pais_proce FOREIGN KEY (pais_origen) REFERENCES public.pais_proce(pais_origen);


--
-- TOC entry 4776 (class 2606 OID 41210)
-- Name: premios_usuarios premios_usuarios_premios_millas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.premios_usuarios
    ADD CONSTRAINT premios_usuarios_premios_millas FOREIGN KEY (premio) REFERENCES public.premios_millas(premio);


--
-- TOC entry 4777 (class 2606 OID 41215)
-- Name: premios_usuarios premios_usuarios_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.premios_usuarios
    ADD CONSTRAINT premios_usuarios_usuarios FOREIGN KEY (correo_usuario) REFERENCES public.usuarios(correo_usuario);


--
-- TOC entry 4779 (class 2606 OID 41220)
-- Name: reservas_personas reservas_detalle_personas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas_personas
    ADD CONSTRAINT reservas_detalle_personas FOREIGN KEY (ci_persona) REFERENCES public.personas(ci_persona);


--
-- TOC entry 4780 (class 2606 OID 41225)
-- Name: reservas_personas reservas_detalle_reservas; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas_personas
    ADD CONSTRAINT reservas_detalle_reservas FOREIGN KEY (creserva) REFERENCES public.reservas(creserva);


--
-- TOC entry 4781 (class 2606 OID 41230)
-- Name: reservas_personas reservas_personas_asientos_vuelo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas_personas
    ADD CONSTRAINT reservas_personas_asientos_vuelo FOREIGN KEY (cvuelo, casiento) REFERENCES public.asientos_vuelo(cvuelo, casiento);


--
-- TOC entry 4782 (class 2606 OID 41235)
-- Name: reservas_personas reservas_personas_estados_reserva; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas_personas
    ADD CONSTRAINT reservas_personas_estados_reserva FOREIGN KEY (estado_reserva) REFERENCES public.estados_reserva(estado_reserva);


--
-- TOC entry 4778 (class 2606 OID 41240)
-- Name: reservas reservas_usuarios; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reservas
    ADD CONSTRAINT reservas_usuarios FOREIGN KEY (correo_usuario) REFERENCES public.usuarios(correo_usuario);


--
-- TOC entry 4783 (class 2606 OID 41245)
-- Name: vuelos vuelos_ciudad; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vuelos
    ADD CONSTRAINT vuelos_ciudad FOREIGN KEY (destino) REFERENCES public.ciudad(ciudad);


--
-- TOC entry 4784 (class 2606 OID 41250)
-- Name: vuelos vuelos_origen; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vuelos
    ADD CONSTRAINT vuelos_origen FOREIGN KEY (origen) REFERENCES public.ciudad(ciudad);


-- Completed on 2025-04-27 18:00:33

--
-- PostgreSQL database dump complete
--

