--
-- PostgreSQL database dump
--

-- Dumped from database version 14.21 (Homebrew)
-- Dumped by pg_dump version 17.5

-- Started on 2026-04-10 23:40:21 AEST

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

--
-- TOC entry 4 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: griffinhan
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO griffinhan;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 27491)
-- Name: expense; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.expense (
    id character varying(50) NOT NULL,
    title character varying(100) NOT NULL,
    category character varying(50) NOT NULL,
    amount double precision NOT NULL,
    date date NOT NULL,
    description character varying(255)
);


ALTER TABLE public.expense OWNER TO postgres;

--
-- TOC entry 3775 (class 0 OID 27491)
-- Dependencies: 209
-- Data for Name: expense; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.expense (id, title, category, amount, date, description) FROM stdin;
2026-04-10T08:00:46.257Z	eggs	Food	8	2026-04-01	free ranged ones
2026-04-10T08:01:34.139Z	pens	Study	6	2026-03-30	12 bundle
2026-04-10T08:02:19.266Z	ice cream	Entertainment	2.5	2026-03-30	from Mi Xue
2026-04-10T08:03:28.773Z	Train	Transport	7	2026-03-30	from Rhodes to Central and versa
2026-04-10T08:00:17.674Z	sourdough bread	Food	12.5	2026-04-01	with blue brand
\.


--
-- TOC entry 3635 (class 2606 OID 27495)
-- Name: expense expense_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.expense
    ADD CONSTRAINT expense_pkey PRIMARY KEY (id);


--
-- TOC entry 3781 (class 0 OID 0)
-- Dependencies: 4
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: griffinhan
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2026-04-10 23:40:21 AEST

--
-- PostgreSQL database dump complete
--

