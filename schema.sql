DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(30) NOT NULL,
    price FLOAT NOT NULL,
    stock_quantity INT,
    PRIMARY KEY(item_id)
);

-- Modifications for Supervisor view --
CREATE TABLE departments(
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50),
    over_head_costs FLOAT
);

-- ADD PRODUCT_SALES INTO PRODUCT TABLE and initialize--
ALTER TABLE products
ADD product_sales FLOAT;

