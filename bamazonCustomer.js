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
	displayItems();
});


// Displays currently available products for purchase
function displayItems(){
	connection.query('SELECT item_id, product_name, price FROM products;', function(err, res){
		console.log("Current Inventory for Sale by ID number:");
	//	console.log(res);
		for(key in res){
			console.log("Item#: " + res[key].item_id + "  "+ res[key].product_name + "  $" + res[key].price);
		}	
		purchaseItem();
	});
}


var purchaseItem = function(){

	inquirer.prompt([
	{
		name: 'itemID',
		message: 'Enter the item number you would like to purchase'
	},
	{
		name: 'qty',
		message: 'How many units would you like to purchase?'
	}
	]).then(function(ans){
		// check if purchase can be made
		// Get item and quantiny from database
		connection.query('SELECT product_name, stock_quantity, price FROM products WHERE item_id = ?', [ans.itemID], function(err, res){
			if(err) console.log(err);
			console.log("item: " + res[0].product_name + " qty: " + res[0].stock_quantity);
			console.log("purchased qty: " +ans.qty);
			// purchase can be made
			if(ans.qty <= res[0].stock_quantity){
				// reduce quantity
				connection.query('UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?;', [ans.qty, ans.itemID],
					function(err, res){
						if(err) throw err;
					});
				console.log("Total cost $%d for %d units of %s", (res[0].price*ans.qty).toFixed(2), ans.qty, res[0].product_name);
			}
			else{
				console.log("Insuficient inventory for purchase. There are only %s units available.", res[0].stock_quantity);
			}
		});
	});
};
