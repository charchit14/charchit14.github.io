CREATE TABLE customers (
    customerid BIGSERIAL NOT NULL PRIMARY KEY,
    customername VARCHAR(50),
    contactname VARCHAR(50),
    address VARCHAR(50),
    city VARCHAR(20),
    postalcode VARCHAR(20), 
    country VARCHAR(20)
);
