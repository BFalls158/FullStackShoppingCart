const express = require('express');
const bodyParser = require('body-parser');
const pg = require('pg');
const app = express();
// Serve files from public folder. That's where all of our HTML, CSS and Angular JS are.
app.use(express.static('public'));
// This allows us to accept JSON bodies in POSTs and PUTs.
app.use(bodyParser.json());

// TODO Set up access to the database via a connection pool. You will then use
// the pool for the tasks below.
const pool = new pg.Pool({
	user: "postgres",
	password: "password",
	host: "localhost",
	port: 5432,
	database: "postgres",
	ssl: false
});

// GET /api/items - responds with an array of all items in the database.
// TODO Handle this URL with appropriate Database interaction.
app.get('/api/items', (req, res) => {
	pool.query("SELECT * FROM ShoppingCart").then( result => {
		res.send(result.rows);
	}).catch( error => {
		console.log(error);
	}); 
});

// POST /api/items - adds and item to the database. The items name and price
// are available as JSON from the request body.
// TODO Handle this URL with appropriate Database interaction.
app.post('/api/items', (req, res) => {
	const body = req.body;
	console.log(req.body);
	const sql = "INSERT INTO ShoppingCart (product, price)" + "values($1::text, $2::real)";
	const values = [body.product, body.price];
	pool.query(sql, values).then( () => {
		console.log('Inserted.');
	});
});

// DELETE /api/items/{ID} - delete an item from the database. The item is
// selected via the {ID} part of the URL.
// TODO Handle this URL with appropriate Database interaction.
app.delete('/api/items/:id', (req, res) => {
	const id = req.params.id;
	const sql = "DELETE FROM ShoppingCart WHERE id=$1::int";
	const values = [id];
	pool.query(sql, values).then( () => {
		console.log('Deleted.');
	});
});

const port = process.env.PORT || 5000;
app.listen(port, function () {
  console.log('JSON Server is running on ' + port);
});
