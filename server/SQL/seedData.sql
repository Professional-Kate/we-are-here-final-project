-- Script for inserting random data into the database 

-- From my research this is all the regions CYF handles
INSERT INTO regions 
(name) VALUES
('West Midlands'), ('Scotland'), ('London'), ('North West'), ('Rome'), ('Cape Town');

-- inserting cohorts into the table from the cohorts.csv file
\COPY cohorts(number, region_id) FROM 'server/SQL/data/cohorts.csv' 
DELIMITER ','
CSV HEADER;

-- inserting users into the table from the users.csv file
\COPY users(first_name, last_name, pass_hash, user_name, is_volunteer,  cohort_id) FROM 'server/SQL/data/users.csv' 
DELIMITER ','
CSV HEADER;
