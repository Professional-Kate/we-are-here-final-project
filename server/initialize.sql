PREPARE initilize_database AS
  CREATE TABLE users (
    id SERIAL PRIMARY KEY, 
    is_volunteer BOOLEAN NOT NULL,
    initials VARCHAR(5) NOT NULL,
    cohort VARCHAR(12) NOT NULL
  );
  CREATE TABLE login (
    FOREIGN KEY (users_id) REFERENCES users(id),
    user_name VARCHAR(30) NOT NULL,
    pass_hash VARCHAR(128) NOT NULL,
    salt VARCHAR(30) NOT NULL
  );
  CREATE TABLE personal_info (
    FOREIGN KEY (users_id) REFERENCES users(id),
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    region VARCHAR(20) NOT NULL
  );
EXECUTE initilize_database;