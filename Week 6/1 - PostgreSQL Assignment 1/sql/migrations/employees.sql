CREATE TABLE employees (
    employeeid BIGSERIAL NOT NULL PRIMARY KEY,
    lastname VARCHAR(50),
    firstname VARCHAR(50),
    birthdate DATE,
    photo VARCHAR(255),    -- Store the path of the image
    notes TEXT
);
