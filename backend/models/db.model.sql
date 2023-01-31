-- Users table
DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE  users  (
   user_id SERIAL PRIMARY KEY UNIQUE,
   email varchar(255) UNIQUE,
   full_name varchar (255),
   password varchar (255),
   
);