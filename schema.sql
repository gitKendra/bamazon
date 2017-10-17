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

-- Add mock data --
INSERT INTO products (product_name, department_name, price)
VALUE 
	("echo dot", "Electronics", 44.99),
	("Fire TV", "Electronics", 69.99),
    ("Toaster", "Home & Kitchen", 14.96),
    ("Ninja Blender", "Home & Kitchen", 114.56),
    ("Sarcastic Print Tee", "Clothing", 8.79),
    ("Unicorn Onesie", "Clothing", 13.97),
    ("Pop-up Tent", "Outdoor", 68.96),
    ("Grooming Kit", "Beauty & Personal Care", 37.50),
    ("Body Lotion", "Beauty & Personal Care", 6.94),
    ("Serenity (Blu-Ray)", "Movies & TV", 8.99)
;
    
UPDATE products
SET stock_quantity = 100;


-- Modifications for Supervisor view --
CREATE TABLE departments(
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(50),
    over_head_costs FLOAT
);
-- Add mock data --
INSERT INTO departments(department_name, over_head_costs)
VALUE ("Electronics", 500),
	("Home & Kitchen", 1000),
	("Clothing", 300),
	("Outdoor", 500),
	("Beauty & Personal Care", 500),
	("Movies & TV", 100)
;    

-- ADD PRODUCT_SALES INTO PRODUCT TABLE and initialize--
ALTER TABLE products
ADD product_sales FLOAT;

UPDATE products SET product_sales = 0;

