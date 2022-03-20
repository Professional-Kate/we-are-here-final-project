-- run these commands from a psql shell. Otherwise you would need to get superuser permission which just isn't fun

-- inserting cohorts into the table from the cohorts.csv file
\COPY cohorts(number, region_id) FROM 'server/SQL/data/cohorts.csv' 
DELIMITER ','
CSV HEADER;

-- inserting users into the table from the users.csv file
\COPY users(first_name, last_name, pass_hash, user_name, is_volunteer,  cohort_id) FROM 'server/SQL/data/users.csv' 
DELIMITER ','
CSV HEADER;
