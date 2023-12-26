CREATE TABLE orderdetails (
    orderdetailid BIGSERIAL NOT NULL PRIMARY KEY,
    orderid BIGSERIAL REFERENCES orders(orderid),
    productid BIGSERIAL REFERENCES products(productid),
    quantity INTEGER
);
