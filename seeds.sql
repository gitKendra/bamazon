USE bamazon;

-- Add mock data to products --
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

-- Add mock data to departments --
INSERT INTO departments(department_name, over_head_costs)
VALUE ("Electronics", 500),
	("Home & Kitchen", 1000),
	("Clothing", 300),
	("Outdoor", 500),
	("Beauty & Personal Care", 500),
	("Movies & TV", 100)
;  

UPDATE products SET product_sales = 0;

-- 
SELECT item_id, product_name, price FROM products;

SELECT product_name, stock_quantity, price FROM products WHERE item_id = 1;

UPDATE products
SET stock_quantity = 3
WHERE item_id = 4;

SELECT product_name, stock_quantity
FROM products
WHERE stock_quantity < 5;

UPDATE products 
SET stock_quantity = 10 
WHERE item_id = 1;

SELECT d.department_id AS id, d.department_name AS name, d.over_head_costs AS cost, p.product_sales AS sales
FROM departments AS d
LEFT JOIN products AS p ON d.department_name = p.department_name
GROUP BY d.department_name
ORDER BY id;
