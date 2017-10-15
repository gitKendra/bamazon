var inquirer = require('inquirer');
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost', //'127.0.0.1' or 'localhost'
  user     : 'root',
  password : 'root',
  port: 8889,
  database : 'bamazon'
});
 
connection.connect(function(err){
	if (err) throw err;
	// call first function
	displayMenu();
});


// List a set of menu options:
function displayMenu(){
	console.log("---------------------------");
	console.log("Choose an option:");

	inquirer.prompt([
	{
		type: 'list',
		name: 'menu',
		message: 'Choose one of the following options:',
		choices: ["View products for sale", "View low inventory", "Add to inventory", "Add new product", "Exit"]
	}
	]).then(function(ans){
		console.log("---------------------------");
		if(ans.menu === "View products for sale"){
			listProducts();
		}
		else if(ans.menu === "View low inventory"){
			displayLowInventory();
		}
		else if(ans.menu === "Add to inventory"){
			addInventory();
		}
		else if(ans.menu === "Add new product"){
			addNewProduct();
		}
		else{
			connection.end();
			process.exit(0);
		}
	});
}

// View Products for Sale : list every available item: the item IDs, names, prices, and quantities.
function listProducts(){
	connection.query('SELECT * FROM products;', function(err, res){
		console.log("All Products for sale:");
		console.log("---------------------------");
	//	console.log(res);
		for(key in res){
			console.log("Item #: " + res[key].item_id + "\nName: "+ res[key].product_name + "\nQty: "+ res[key].stock_quantity+ "\nPrice: $" + res[key].price);
			console.log("---------------------------");
		}	
		displayMenu();
	});
}

// View Low Inventory : list all items with an inventory count lower than five.
function displayLowInventory(){
	connection.query('SELECT product_name, stock_quantity FROM products WHERE stock_quantity < 5;', function(err, res){
		for(key in res){
			console.log(res[key].product_name + " (" + res[key].stock_quantity + ")");
		}
		displayMenu();
	});
}

// Add to Inventory : display a prompt that will let the manager "add more" of any item currently in the store.
function addInventory(){
	inquirer.prompt([
	{
		name: 'itemID',
		message: 'Item ID:',
	},
	{
		name: 'qty',
		message: 'Number of units to add:',
	}
	]).then(function(ans){
		connection.query("UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?", [ans.qty, ans.itemID]
		, function(err){
			if(err) throw err
			console.log("Quantity updated!");
		displayMenu();
		});
	});
}

// Add New Product :  add a completely new product to the store.
function addNewProduct(){
	inquirer.prompt([
	{
		name: 'product',
		message: 'Product name:',
	},
	{
		name: 'dept',
		message: 'Department name:',
	},
	{
		name: 'price',
		message: 'Sales price:',
	},
	{
		name: 'qty',
		message: 'Stock quantity:',
	}
	]).then(function(ans){
		connection.query("INSERT INTO products SET ?",
		{
			product_name: ans.product,
			department_name: ans.dept,
			price: ans.price,
			stock_quantity: ans.qty
		},
		function(err){
			if(err) throw err
			console.log("product inserted!");
		});
		displayMenu();
	});
}