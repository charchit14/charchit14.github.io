CREATE TABLE products (
    productid BIGSERIAL NOT NULL PRIMARY KEY,
    productname VARCHAR(50),
    supplierid BIGSERIAL REFERENCES suppliers(supplierid),
    categoryid BIGSERIAL REFERENCES categories(categoryid),
    unit INTEGER,
    price NUMERIC(10,2)
);
