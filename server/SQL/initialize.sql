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

CREATE TABLE cohorts (
  id                     SERIAL PRIMARY KEY,
  number                 SMALLINT NOT NULL,
  region_id              INT NOT NULL,
  FOREIGN KEY(region_id) REFERENCES regions(id)
);

CREATE TABLE users (
  id                     SERIAL PRIMARY KEY,
  first_name             VARCHAR(20) NOT NULL,
  last_name              VARCHAR(20) NOT NULL, 
  pass_hash              VARCHAR(60) NOT NULL,
  user_name              VARCHAR(30) NOT NULL,
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
  name VARCHAR(30) NOT NULL
);

CREATE TABLE weeks (
  id                     SERIAL PRIMARY KEY,
  week_date              DATE NOT NULL,
  start_time             TIME NOT NULL,
  end_time               TIME NOT NULL,
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

-- inserting into regions from my research this is all the regions CYF handles
INSERT INTO regions 
(name) VALUES
('West Midlands'), ('Scotland'), ('London'), ('North West'), ('Rome'), ('Cape Town');

-- inserting into modules I got all these from the CYF sylabus page
INSERT INTO modules
(name) VALUES
('Intro to Digital'), ('Fundamentals'), ('Induction and Git'), ('HTML/CSS'), ('Building a team'), ('JavaScript Core 1'), ('Communicating in the workplace'), ('JavaScript Core 2'), ('Presentation Skills'), ('JavaScript Core 3'), ('Specialisation'), ('React'), ('Preparing for the Job Market'), ('Node.js'), ('Interview Skills'), ('Databases'), ('Working in Teams'), ('Final Projects'), ('Presentations and Demo Day');