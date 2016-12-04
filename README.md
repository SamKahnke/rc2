CREATE TABLE public.matches
(
    id integer NOT NULL DEFAULT nextval('matches_id_seq'::regclass),
    team1 character varying COLLATE pg_catalog."default",
    team2 character varying COLLATE pg_catalog."default",
    t1_p1_score integer,
    t1_p2_score integer,
    t1_p3_score integer,
    t2_p1_score integer,
    t2_p2_score integer,
    t2_p3_score integer,
    t1_p1 character varying COLLATE pg_catalog."default",
    t1_p2 character varying COLLATE pg_catalog."default",
    t1_p3 character varying COLLATE pg_catalog."default",
    t2_p1 character varying COLLATE pg_catalog."default",
    t2_p2 character varying COLLATE pg_catalog."default",
    t2_p3 character varying COLLATE pg_catalog."default",
    match_date date,
    CONSTRAINT matches_pkey PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.matches
    OWNER to postgres;

GRANT ALL ON TABLE public.matches TO postgres;

INSERT INTO public.matches(
	id, team1, team2, t1_p1_score, t1_p2_score, t1_p3_score, t2_p1_score, t2_p2_score, t2_p3_score, t1_p1, t1_p2, t1_p3, t2_p1, t2_p2, t2_p3, match_date)
	VALUES (26, 'A team', 'B team', 1, 2, 2, 1, 0, 3, 'Carl', 'Fred', 'John', 'Jimmy', 'Frank', 'Joe', '2016-11-12'), 
    (27, 'C team', 'D team', 1, 0, 1, 3, 4, 2, 'Gertrude', 'Billy', 'Brody', 'Helen', 'Greg', 'Sam', '2016-11-23');
