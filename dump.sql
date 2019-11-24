--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 11.2

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: fowl; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fowl (
    id integer NOT NULL,
    name character varying(50)
);


ALTER TABLE public.fowl OWNER TO postgres;

--
-- Name: fowl_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fowl_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.fowl_id_seq OWNER TO postgres;

--
-- Name: fowl_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fowl_id_seq OWNED BY public.fowl.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    name character varying(80) NOT NULL,
    password character varying(64)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: fowl id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fowl ALTER COLUMN id SET DEFAULT nextval('public.fowl_id_seq'::regclass);


--
-- Data for Name: fowl; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fowl (id, name) FROM stdin;
1	Рябчик
2	Косуля
3	Тетерев
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (name, password) FROM stdin;
admin	a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3
\.


--
-- Name: fowl_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fowl_id_seq', 3, true);


--
-- Name: fowl fowl_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fowl
    ADD CONSTRAINT fowl_pkey PRIMARY KEY (id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (name);


--
-- PostgreSQL database dump complete
--

