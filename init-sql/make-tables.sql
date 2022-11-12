-- noinspection SqlNoDataSourceInspectionForFile

-- Strive

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
    character_id INT REFERENCES strive_characters (id),
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
    move_id INT REFERENCES strive_move_list (id),
    gatling_move TEXT,
    p TEXT,
    k TEXT,
    s TEXT,
    h TEXT,
    d TEXT
);

-- Xrd Rev 2

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

CREATE TABLE xrd_rev2_move_list (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES xrd_rev2_characters(id),
    move_name TEXT,
    input TEXT,
    damage TEXT,
    risc_p TEXT,
    risc_m TEXT,
    prorate TEXT,
    guard TEXT,
    level TEXT,
    cancel TEXT,
    tension TEXT,
    startup TEXT,
    active TEXT,
    recovery_frames TEXT,
    on_block TEXT,
    invulnerability TEXT
);

CREATE TABLE xrd_rev2_gatling_options (
    id SERIAL PRIMARY KEY,
    move_id INT REFERENCES xrd_rev2_move_list(id),
    gatling_move TEXT,
    p TEXT,
    k TEXT,
    s TEXT,
    h TEXT,
    d TEXT,
    cancel TEXT
);

-- Accent Core Plus R

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

CREATE TABLE plus_r_move_list (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES plus_r_characters(id),
    move_name TEXT,
    input TEXT,
    damage TEXT,
    gbp TEXT,
    gbm TEXT,
    prorate TEXT,
    guard TEXT,
    level TEXT,
    cancel TEXT,
    tension TEXT,
    startup TEXT,
    active TEXT,
    recovery_frames TEXT,
    on_block TEXT,
    invulnerability TEXT,
    block_stun TEXT,
    ground_hit TEXT, 
    air_hit TEXT,
    hit_stop TEXT,
    frc_window TEXT
);

CREATE TABLE plus_r_gatling_options (
    id SERIAL PRIMARY KEY,
    move_id INT REFERENCES plus_r_move_list (id),
    gatling_move TEXT,
    p TEXT,
    k TEXT,
    s TEXT,
    h TEXT,
    d TEXT,
    cancel TEXT
);
