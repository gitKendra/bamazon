var inquirer = require('inquirer');
var mysql      = require('mysql');
var Table = require('cli-table2');

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

function displayMenu(){
	inquirer.prompt([
	{
		type: 'list',
		name: 'menu',
		message: 'What would you like to do?',
		choices: ['View product sales by department', 'Create new department', 'Exit']
	}
	]).then(function(ans){
		console.log("---------------------------");
		if(ans.menu === 'View product sales by department'){
			displayProductSales();
		}
		else if(ans.menu === 'Create new department'){
			addDepartment();
		}
		else{
			exit();
		}
	});
}

// Function to view product sales by department in a table.
function displayProductSales(){
	connection.query('SELECT d.department_id AS id, d.department_name AS name, d.over_head_costs AS cost, p.product_sales AS sales '
	+ 'FROM departments AS d LEFT JOIN products AS p ON d.department_name = p.department_name '
	+ 'GROUP BY d.department_name ORDER BY d.department_id;'
	, function(err, res){
		console.log("Product Sales by Department:");
		// Instantiate a table
		var table = new Table({
		    head: ['Department ID', 'Department Name', 'Overhead Costs', 'Product Sales', 'Total Profit']
		});
		// Add rows to table
		for(key in res){
			var sales = res[key].sales;
			if(sales === null){
				sales = 0;
			}
			table.push([res[key].id, res[key].name, "$" + res[key].cost.toFixed(2), "$" + sales.toFixed(2), "$" + (res[key].sales-res[key].cost).toFixed(2)])
		}
		// Print table
		console.log(table.toString());

		displayMenu();
	});
}


// Create new department
function addDepartment(){
	inquirer.prompt([
	{
		name: 'name',
		message: 'Department name:'
	},
	{
		name: 'cost',
		message: 'Overhead cost (in dollars):'
	}
	]).then(function(ans){
		// Update database with new
		connection.query('INSERT INTO departments(department_name, over_head_costs) VALUE (?, ?);', [ans.name, ans.cost], function(err, res){
			if(err) throw err;
			console.log("New department added!");
			displayMenu();
		});
	});
}

// Closes the connection to the webserver and ends program
function exit(){
	connection.end();
	process.exit(0);
}