DROP TABLE if exists regions CASCADE;
DROP TABLE if exists cohorts CASCADE;
DROP TABLE if exists users CASCADE;
DROP TABLE if exists modules CASCADE;
DROP TABLE if exists weeks CASCADE;
DROP TABLE IF exists volunteer_flags;

CREATE TABLE regions(
  id   SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE cohorts (
  id        SERIAL PRIMARY KEY,
  number    SMALLINT NOT NULL,
  region_id INTEGER REFERENCES regions(id)
);

CREATE TABLE users (
  id           SERIAL PRIMARY KEY,
  first_name   VARCHAR(20) NOT NULL,
  last_name    VARCHAR(20) NOT NULL, 
  pass_hash    TEXT NOT NULL,
  pass_salt    TEXT NOT NULL,
  user_name    VARCHAR(15) NOT NULL,
  is_volunteer BOOLEAN NOT NULL,
  cohort_id    INTEGER REFERENCES cohorts(id)
);

CREATE TABLE modules (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE weeks (
  id        SERIAL PRIMARY KEY,
  week_date DATE NOT NULL,
  module_id INTEGER REFERENCES modules(id)
);

CREATE TABLE volunteer_flags (
  id                SERIAL PRIMARY KEY, 
  no_webcam         BOOLEAN,
  low_participation BOOLEAN,
  absent            BOOLEAN, 
  left_early        BOOLEAN, 
  other_comments    TEXT,
  clockin_time      TIMESTAMP,
  user_id           INTEGER REFERENCES users(id),
  week_id           INTEGER REFERENCES weeks(id)
);