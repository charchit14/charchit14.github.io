CREATE TABLE orders (
    orderid BIGSERIAL NOT NULL PRIMARY KEY,
    customerid BIGSERIAL REFERENCES customers(customerid),
    employeeid BIGSERIAL REFERENCES employees(employeeid),
    orderdate DATE,
    shipperid BIGSERIAL REFERENCES shippers(shipperid)
);
