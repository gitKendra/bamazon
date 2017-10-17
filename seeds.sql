USE bamazon;

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
