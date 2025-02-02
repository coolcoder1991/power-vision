--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2 (Debian 17.2-1.pgdg120+1)
-- Dumped by pg_dump version 17.2 (Debian 17.2-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: accounts; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    name text,
    password text,
    dt_updated timestamp without time zone DEFAULT now()
);


ALTER TABLE public.accounts OWNER TO admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_id_seq OWNER TO admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: alembic_version; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.alembic_version (
    version_num character varying(32) NOT NULL
);


ALTER TABLE public.alembic_version OWNER TO admin;

--
-- Name: battery_status; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.battery_status (
    id integer NOT NULL,
    device_id integer,
    battery_level double precision,
    number_charges integer,
    dt_updated timestamp without time zone DEFAULT now()
);


ALTER TABLE public.battery_status OWNER TO admin;

--
-- Name: battery_status_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.battery_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.battery_status_id_seq OWNER TO admin;

--
-- Name: battery_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.battery_status_id_seq OWNED BY public.battery_status.id;


--
-- Name: battery_type; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.battery_type (
    id integer NOT NULL,
    name text,
    dt_updated timestamp without time zone DEFAULT now()
);


ALTER TABLE public.battery_type OWNER TO admin;

--
-- Name: battery_type_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.battery_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.battery_type_id_seq OWNER TO admin;

--
-- Name: battery_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.battery_type_id_seq OWNED BY public.battery_type.id;


--
-- Name: charging; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.charging (
    id integer NOT NULL,
    device_id integer,
    last_charged timestamp without time zone DEFAULT now(),
    depletion_date date,
    dt_updated timestamp without time zone DEFAULT now()
);


ALTER TABLE public.charging OWNER TO admin;

--
-- Name: charging_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.charging_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.charging_id_seq OWNER TO admin;

--
-- Name: charging_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.charging_id_seq OWNED BY public.charging.id;


--
-- Name: device; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.device (
    id integer NOT NULL,
    name text,
    model text,
    account_id integer,
    dt_updated timestamp without time zone DEFAULT now(),
    battery_id integer
);


ALTER TABLE public.device OWNER TO admin;

--
-- Name: device_id_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.device_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.device_id_seq OWNER TO admin;

--
-- Name: device_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.device_id_seq OWNED BY public.device.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: battery_status id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.battery_status ALTER COLUMN id SET DEFAULT nextval('public.battery_status_id_seq'::regclass);


--
-- Name: battery_type id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.battery_type ALTER COLUMN id SET DEFAULT nextval('public.battery_type_id_seq'::regclass);


--
-- Name: charging id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.charging ALTER COLUMN id SET DEFAULT nextval('public.charging_id_seq'::regclass);


--
-- Name: device id; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.device ALTER COLUMN id SET DEFAULT nextval('public.device_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.accounts (id, name, password, dt_updated) FROM stdin;
1	admin	admin	2025-02-02 18:06:33.655058
\.


--
-- Data for Name: alembic_version; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.alembic_version (version_num) FROM stdin;
1a4f9e7c8707
\.


--
-- Data for Name: battery_status; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.battery_status (id, device_id, battery_level, number_charges, dt_updated) FROM stdin;
\.


--
-- Data for Name: battery_type; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.battery_type (id, name, dt_updated) FROM stdin;
\.


--
-- Data for Name: charging; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.charging (id, device_id, last_charged, depletion_date, dt_updated) FROM stdin;
\.


--
-- Data for Name: device; Type: TABLE DATA; Schema: public; Owner: admin
--

COPY public.device (id, name, model, account_id, dt_updated, battery_id) FROM stdin;
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.accounts_id_seq', 1, true);


--
-- Name: battery_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.battery_status_id_seq', 1, false);


--
-- Name: battery_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.battery_type_id_seq', 1, false);


--
-- Name: charging_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.charging_id_seq', 1, false);


--
-- Name: device_id_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.device_id_seq', 1, false);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: alembic_version alembic_version_pkc; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.alembic_version
    ADD CONSTRAINT alembic_version_pkc PRIMARY KEY (version_num);


--
-- Name: battery_status battery_status_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.battery_status
    ADD CONSTRAINT battery_status_pkey PRIMARY KEY (id);


--
-- Name: battery_type battery_type_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.battery_type
    ADD CONSTRAINT battery_type_pkey PRIMARY KEY (id);


--
-- Name: charging charging_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.charging
    ADD CONSTRAINT charging_pkey PRIMARY KEY (id);


--
-- Name: device device_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_pkey PRIMARY KEY (id);


--
-- Name: battery_status battery_status_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.battery_status
    ADD CONSTRAINT battery_status_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.device(id);


--
-- Name: charging charging_device_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.charging
    ADD CONSTRAINT charging_device_id_fkey FOREIGN KEY (device_id) REFERENCES public.device(id);


--
-- Name: device device_account_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_account_id_fkey FOREIGN KEY (account_id) REFERENCES public.accounts(id);


--
-- Name: device device_battery_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.device
    ADD CONSTRAINT device_battery_id_fkey FOREIGN KEY (battery_id) REFERENCES public.battery_type(id);


--
-- PostgreSQL database dump complete
--

