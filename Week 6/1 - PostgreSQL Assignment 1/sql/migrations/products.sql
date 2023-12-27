CREATE TABLE products (
    productid BIGSERIAL NOT NULL PRIMARY KEY,
    productname VARCHAR(50),
    supplierid BIGSERIAL REFERENCES suppliers(supplierid),
    categoryid BIGSERIAL REFERENCES categories(categoryid),
    unit VARCHAR(50),
    price NUMERIC(10,2)
);



-- ALTER TABLE products
-- ALTER COLUMN unit TYPE VARCHAR(50); changed from INTEGER
