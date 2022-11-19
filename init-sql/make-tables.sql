-- noinspection SqlNoDataSourceInspectionForFile

-- Strive

DROP TABLE IF EXISTS strive_characters, strive_move_list, strive_gatling_table,
    xrd_characters, xrd_move_list, xrd_gatling_table,
    plus_r_characters, plus_r_move_list, plus_r_gatling_table CASCADE;

CREATE TABLE strive_characters (
    id SERIAL PRIMARY KEY,
    character_name TEXT,
    defense TEXT,
    guts TEXT,
    pre_jump TEXT,
    weight TEXT,
    back_dash TEXT,
    forward_dash TEXT,
    unique_movement TEXT,
    risc_multiplier TEXT,
    movement_tension_gain TEXT
);

CREATE TABLE strive_move_list (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES strive_characters(id),
    input TEXT,
    move_name TEXT,	
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

CREATE TABLE strive_gatling_table (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES strive_characters(id),
    move_name TEXT,
    p TEXT,
    k TEXT,
    s TEXT,
    h TEXT,
    d TEXT,
    cancel TEXT
);

-- Xrd Rev 2

CREATE TABLE xrd_characters (
    id SERIAL PRIMARY KEY,
    character_name TEXT,
    defense TEXT,
    guts TEXT,
    pre_jump TEXT,
    weight TEXT,
    back_dash TEXT,
    forward_dash TEXT,
    risc_gain_rate TEXT,
    wake_up_face_up TEXT,
    wake_up_face_down TEXT,
    unique_movement TEXT
);

CREATE TABLE xrd_move_list (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES xrd_characters(id),
    input TEXT,
    move_name TEXT,
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

CREATE TABLE xrd_gatling_table (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES xrd_characters(id),
    move_name TEXT,
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
    defense TEXT,
    guts TEXT,
    pre_jump TEXT, 
    weight TEXT,
    back_dash TEXT,
    forward_dash TEXT,
    guard_balance TEXT,
    wake_up_face_up TEXT,
    wake_up_face_down TEXT,
    unique_movement TEXT
);

CREATE TABLE plus_r_move_list (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES plus_r_characters(id),
    input TEXT,
    move_name TEXT,
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

CREATE TABLE plus_r_gatling_table (
    id SERIAL PRIMARY KEY,
    character_id INT REFERENCES plus_r_characters(id),
    move_name TEXT,
    p TEXT,
    k TEXT,
    s TEXT,
    h TEXT,
    d TEXT,
    cancel TEXT
);
