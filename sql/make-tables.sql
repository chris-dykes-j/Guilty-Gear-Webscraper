CREATE TABLE characters (
	character_id SERIAL PRIMARY KEY,
	character_name TEXT
);

CREATE TABLE move_list (
	move_id SERIAL PRIMARY KEY,
	character_id INTEGER REFERENCES characters (character_id),
	move_name TEXT UNIQUE NOT NULL,
	input TEXT,
	damage TEXT,
	guard TEXT,
	startup TEXT,
	active TEXT,
	recovery_frames TEXT,
	on_block TEXT,
	invulnerability TEXT
);

/* CREATE TABLE gatling_options (
	gatling_id SERIAL PRIMARY KEY,
	move_id INTEGER REFERENCES move_list (move_id),
	gatling_move TEXT
); */
