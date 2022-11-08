-- noinspection SqlNoDataSourceInspectionForFile

-- How should this be organized for all games?

CREATE TABLE strive_characters (
	id SERIAL PRIMARY KEY,
	character_name TEXT,
    defense REAL,
    guts INT,
    pre_jump INT,
    weight TEXT,
    back_dash TEXT,
    forward_dash INT,
    unique_movement TEXT,
    risc_multiplier REAL,
    movement_tension_gain TEXT
);

CREATE TABLE strive_move_list (
	id SERIAL PRIMARY KEY,
	character_id INTEGER REFERENCES strive_characters (id),
    move_name TEXT,	
	input TEXT,
	damage TEXT,
	guard TEXT,
	startup TEXT,
	active TEXT,
	recovery_frames TEXT,
	on_block TEXT,
	on_hit TEXT,
	level TEXT,
	counter_type TEXT,
	invulnerability TEXT,
	base_combo_scaling TEXT,
	risc_gain TEXT,
	risc_loss TEXT
);

CREATE TABLE strive_gatling_options (
	id SERIAL PRIMARY KEY,
	move_id INTEGER REFERENCES strive_move_list (id),
	gatling_move TEXT,
	p TEXT,
	k TEXT,
	s TEXT,
	h TEXT,
	d TEXT
);

-- WIP

CREATE TABLE xrd_rev2_characters (
    id SERIAL PRIMARY KEY,
    character_name TEXT,
    defense REAL,
    guts INT,
    pre_jump INT,
    weight TEXT,
    back_dash TEXT,
    forward_dash INT,
    risc_gain_rate TEXT,
    wake_up_face_up TEXT,
    wake_up_face_down TEXT,
    unique_movement TEXT
);

CREATE TABLE plus_r_characters (
    id SERIAL PRIMARY KEY,
    character_name TEXT,
    defense REAL,
    guts INT,
    pre_jump INT,
    weight TEXT,
    back_dash TEXT,
    forward_dash INT,
    guard_balance INT,
    wake_up_face_up TEXT,
    wake_up_face_down TEXT,
    unique_movement TEXT
);
