


CREATE TABLE IF NOT EXISTS course_schm.billing_address
(
    "id " bigserial NOT NULL,
    student_id bigint NOT NULL,
    course_order_id bigint NOT NULL,
    address_line character varying(200) COLLATE pg_catalog."default" NOT NULL,
    city character varying(100) COLLATE pg_catalog."default" NOT NULL,
    district character varying(60) COLLATE pg_catalog."default" NOT NULL,
    state character varying(60) COLLATE pg_catalog."default" NOT NULL,
    country character varying(60) COLLATE pg_catalog."default" NOT NULL,
    pincode character varying(6) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by integer NOT NULL,
    "updated_at " timestamp without time zone,
    updated_by bigint,
    CONSTRAINT billing_address_pkey PRIMARY KEY ("id ")
);

CREATE TABLE IF NOT EXISTS course_schm.course
(
    course_id bigserial NOT NULL,
    program_id bigint NOT NULL,
    uid character varying(55) COLLATE pg_catalog."default" NOT NULL,
    title character varying(55) COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default",
    video_file_id bigint,
    thumbnail_file_id bigint,
    price double precision,
    discount_percentage double precision,
    discount_amount double precision,
    final_price double precision,
    no_of_lessons integer NOT NULL DEFAULT 0,
    no_of_assignments integer NOT NULL DEFAULT 0,
    no_of_tests integer NOT NULL DEFAULT 0,
    no_of_hours interval NOT NULL DEFAULT '00:00:00'::interval,
    is_paid_course boolean NOT NULL DEFAULT false,
    status character varying COLLATE pg_catalog."default" DEFAULT 'UNPUBLISHED'::character varying,
    is_deleted boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    updated_at timestamp without time zone,
    updated_by bigint,
    course_category_id bigint,
    CONSTRAINT course_pkey PRIMARY KEY (course_id),
    CONSTRAINT course_uid_key UNIQUE (uid)
);

CREATE TABLE IF NOT EXISTS course_schm.course_categories
(
    id bigserial NOT NULL,
    category_name character varying(55) COLLATE pg_catalog."default" NOT NULL,
    program_id bigint,
    CONSTRAINT course_categories_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.course_orders
(
    order_id bigserial NOT NULL,
    uid character varying(50) COLLATE pg_catalog."default" NOT NULL,
    course_id bigint NOT NULL,
    student_id bigint NOT NULL,
    course_price double precision NOT NULL,
    discount_percentage double precision NOT NULL,
    discount_price double precision NOT NULL,
    price_after_discount double precision NOT NULL,
    tax_details jsonb,
    final_price double precision NOT NULL,
    order_status character varying COLLATE pg_catalog."default" NOT NULL DEFAULT 'PENDING'::character varying,
    purchased_date timestamp without time zone,
    valid_upto timestamp without time zone,
    created_by bigint NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT course_orders_pkey PRIMARY KEY (order_id)
);

CREATE TABLE IF NOT EXISTS course_schm.dacast_folders
(
    id bigserial NOT NULL,
    folder_id character varying COLLATE pg_catalog."default" NOT NULL,
    folder_path character varying COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    CONSTRAINT dacast_folders_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.file_details
(
    id bigserial NOT NULL,
    uid character varying(56) COLLATE pg_catalog."default" NOT NULL,
    file_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
    content_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    s3_bucket character varying(128) COLLATE pg_catalog."default" NOT NULL,
    file_path character varying(512) COLLATE pg_catalog."default" NOT NULL,
    file_url character varying(1024) COLLATE pg_catalog."default" NOT NULL,
    original_file_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    is_public boolean NOT NULL DEFAULT false,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    CONSTRAINT file_details_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.learning_aspects
(
    aspect_id bigserial NOT NULL,
    aspect_name character varying(1000) COLLATE pg_catalog."default" NOT NULL,
    "created_at " timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    course_id bigint NOT NULL,
    CONSTRAINT learning_aspects_pkey PRIMARY KEY (aspect_id)
);

CREATE TABLE IF NOT EXISTS course_schm.lessons
(
    lesson_id bigserial NOT NULL  ,
    uid character varying(55) COLLATE pg_catalog."default" NOT NULL,
    module_id bigint NOT NULL,
    lesson_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    points double precision NOT NULL,
    video_file_id bigint NOT NULL,
    thumbnail_file_id bigint,
    attachment_file_id bigint NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    updated_at timestamp without time zone,
    updated_by bigint,
    is_visible boolean NOT NULL DEFAULT true,
    is_deleted boolean NOT NULL DEFAULT false,
    no_of_hours interval NOT NULL DEFAULT '00:00:00'::interval,
    sequence_id integer,
    CONSTRAINT lessons_pkey PRIMARY KEY (lesson_id)
);

CREATE TABLE IF NOT EXISTS course_schm.modules
(
    module_id bigserial NOT NULL,
    uid character varying COLLATE pg_catalog."default",
    section_id bigint NOT NULL,
    course_id bigint NOT NULL,
    module_name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    no_of_lessons integer NOT NULL DEFAULT 0,
    no_of_assignments integer NOT NULL DEFAULT 0,
    no_of_tests integer NOT NULL DEFAULT 0,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    updated_at timestamp without time zone,
    updated_by bigint,
    is_visible boolean NOT NULL DEFAULT true,
    is_deleted boolean NOT NULL DEFAULT false,
    no_of_hours interval NOT NULL DEFAULT '00:00:00'::interval,
    sequence_id integer,
    CONSTRAINT modules_pkey PRIMARY KEY (module_id)
);

CREATE TABLE IF NOT EXISTS course_schm.payment_orders
(
    id bigserial NOT NULL,
    student_id integer,
    course_order_id integer NOT NULL,
    paid_amount double precision NOT NULL,
    price double precision NOT NULL,
    receipt_id character varying COLLATE pg_catalog."default",
    status character varying(20) COLLATE pg_catalog."default",
    created_by integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_by integer,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    order_id character varying COLLATE pg_catalog."default",
    course_id bigint NOT NULL,
    CONSTRAINT payment_orders_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.payment_transactions
(
    id bigserial NOT NULL,
    order_id character varying(100) COLLATE pg_catalog."default" NOT NULL,
    payment_id character varying(100) COLLATE pg_catalog."default",
    payment_type character varying(200) COLLATE pg_catalog."default",
    amount double precision,
    description character varying(200) COLLATE pg_catalog."default",
    transaction_type character varying(500) COLLATE pg_catalog."default",
    status character varying(500) COLLATE pg_catalog."default",
    reference_number character varying(45) COLLATE pg_catalog."default",
    is_verified boolean,
    created_at timestamp without time zone,
    updated_at timestamp without time zone,
    payment_order_id integer,
    CONSTRAINT payment_transactions_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.programs
(
    id bigserial NOT NULL,
    program_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT programs_pkey PRIMARY KEY (id),
    CONSTRAINT programs_program_name_key UNIQUE (program_name)
);

CREATE TABLE IF NOT EXISTS course_schm.sections
(
    section_id bigserial NOT NULL,
    uid character varying(55) COLLATE pg_catalog."default" NOT NULL,
    course_id bigint NOT NULL,
    section_name character varying(500) COLLATE pg_catalog."default" NOT NULL,
    description character varying(2000) COLLATE pg_catalog."default" NOT NULL,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    created_by bigint NOT NULL,
    updated_at timestamp without time zone,
    updated_by bigint,
    is_visible boolean DEFAULT true,
    is_deleted boolean NOT NULL DEFAULT false,
    sequence_id integer,
    CONSTRAINT sections_pkey PRIMARY KEY (section_id)
);

CREATE TABLE IF NOT EXISTS course_schm.tax_details
(
    id bigserial NOT NULL,
    tax_type character varying COLLATE pg_catalog."default" NOT NULL,
    tax_value double precision NOT NULL,
    CONSTRAINT tax_details_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS course_schm.video_file_details
(
    id bigserial NOT NULL,
    uid character varying(55) COLLATE pg_catalog."default" NOT NULL,
    video_file_name character varying(512) COLLATE pg_catalog."default" NOT NULL,
    content_type character varying(128) COLLATE pg_catalog."default" NOT NULL,
    vod_id character varying(128) COLLATE pg_catalog."default",
    video_duration interval NOT NULL DEFAULT '00:00:00'::interval,
    created_by bigint,
    created_at timestamp without time zone NOT NULL DEFAULT CURRENT_TIMESTAMP,
    thumbnail_file_name character varying COLLATE pg_catalog."default",
    is_deleted boolean NOT NULL DEFAULT false,
    folder_id character varying COLLATE pg_catalog."default",
    asset_id character varying COLLATE pg_catalog."default",
    CONSTRAINT video_file_details_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS course_schm.course
    ADD CONSTRAINT course_program_id_fkey FOREIGN KEY (program_id)
    REFERENCES course_schm.programs (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS course_schm.lessons
    ADD CONSTRAINT fk1_module FOREIGN KEY (module_id)
    REFERENCES course_schm.modules (module_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS course_schm.modules
    ADD CONSTRAINT fk1_section FOREIGN KEY (section_id)
    REFERENCES course_schm.sections (section_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

    ALTER TABLE course_schm.file_details
    ALTER COLUMN file_name TYPE character varying(200) COLLATE pg_catalog."default";