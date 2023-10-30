CREATE DATABASE attendance;

CREATE TABLE employees (
    user_id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);

--insert dummy users

INSERT INTO users(user_name, user_email, user_password) VALUES ('dummy', 'dummy@gmail.com', 'dpass541');


