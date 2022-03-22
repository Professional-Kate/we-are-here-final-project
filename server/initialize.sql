-- SQL file for making a fresh database with 6 tables

-- drop all tables to completely reset the database
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
INSERT INTO regions(name) VALUES ('West Midlands'), ('London'), ('Scotland'), ('Manchester');

CREATE TABLE cohorts (
  id                     SERIAL PRIMARY KEY,
  number                 SMALLINT NOT NULL,
  region_id              INT NOT NULL,
  FOREIGN KEY(region_id) REFERENCES regions(id)
);
INSERT INTO cohorts (number, region_id) VALUES (1, 1), (2, 1), (3, 1), (1, 2), (2, 2), (3, 2), (4, 2), (1, 3), (2, 3), (1, 4), (2, 4);

CREATE TABLE users (
  id                     SERIAL PRIMARY KEY,
  first_name             VARCHAR(20) NOT NULL,
  last_name              VARCHAR(20) NOT NULL, 
  pass_hash              TEXT NOT NULL,
  user_name              VARCHAR(15) NOT NULL,
  is_volunteer           BOOLEAN NOT NULL,
  cohort_id              INT,
  FOREIGN KEY(cohort_id) REFERENCES cohorts(id),

  -- if statement checking if is_volunteer is false then add NOT NULL to cohort_id column 
  -- this means that if a volunteer signs up (is_volunteer = true) they don't need to provide a cohort_id 
  -- if a trainee signs up (is_volunteer = false) they will HAVE to provide a cohort_id
  CONSTRAINT check_volunteer 
    CHECK ( (is_volunteer) OR (cohort_id IS NOT NULL))
);             

CREATE TABLE modules (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(20) NOT NULL
);

CREATE TABLE weeks (
  id                     SERIAL PRIMARY KEY,
  week_date              DATE NOT NULL,
  start_time             TIMESTAMP NOT NULL,
  end_time               TIMESTAMP NOT NULL,
  module_id              INT NOT NULL,
  FOREIGN KEY(module_id) REFERENCES modules(id)
);

-- I made these flags not required to make the backend code a bit easier
CREATE TABLE volunteer_flags (
  id                   SERIAL PRIMARY KEY, 
  no_webcam            BOOLEAN DEFAULT FALSE NOT NULL,
  low_participation    BOOLEAN DEFAULT FALSE NOT NULL,
  absent               BOOLEAN DEFAULT FALSE NOT NULL, 
  left_early           BOOLEAN DEFAULT FALSE NOT NULL, 
  other_comments       TEXT,
  clockin_time         TIMESTAMP,
  user_id              INT NOT NULL,
  week_id              INT NOT NULL,
  FOREIGN KEY(user_id) REFERENCES users(id),
  FOREIGN KEY(week_id) REFERENCES weeks(id)
);