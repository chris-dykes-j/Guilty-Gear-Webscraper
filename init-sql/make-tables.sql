-- noinspection SqlNoDataSourceInspectionForFile

CREATE TABLE characters (
	character_id SERIAL PRIMARY KEY,
	character_name TEXT,
    defense REAL,
    guts INT,
    weight TEXT,
    back_dash TEXT,
    forward_dash INT,
    unique_movement TEXT,
    risc_multiplier REAL
);

CREATE TABLE move_list (
	move_id SERIAL PRIMARY KEY,
	character_id INTEGER REFERENCES characters (character_id),
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

CREATE TABLE gatling_options (
	gatling_id SERIAL PRIMARY KEY,
	move_id INTEGER REFERENCES move_list (move_id),
	gatling_move TEXT,
	p TEXT,
	k TEXT,
	s TEXT,
	h TEXT,
	d TEXT
);
