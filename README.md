# bamazon

An Amazon-like storefront CLI app using MySQL, node, and JavaScript. The app will take in orders from customers and deplete stock from the store's inventory, track product sales across departments and then provide a summary of the highest-grossing departments in the store.

There are 3 different files depending on your role:

1. Customer (bamazonCustomer.js)
2. Manager (bamazonManager.js)
3. Supervisor (bamazonSupervisor.js)

## bamazonCustomer.js
**Use:**
Run program to view current inventory and to purchase product.
```
node bamazonManager.js
```

## bamazonManager.js
**Use:**
Run program to be presented with the option to view products for sale, view low inventory, add more inventory to current product, add new product to store, or exit the program.

```
node bamazonManager.js
```

## bamazonSupervisor.js
**Use:**
Run program to be presented with the option to view product sales by department, create a new department, or exit the program.

```
node bamazonSupervisor.js
```

## Screenshot
see [Demo Images](https://github.com/gitKendra/bamazon/tree/master/demo_images) for screenshots of the various functions of each program
