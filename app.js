const express = require('express');
const app = express();
// Allows us to parse json objs in the body of the request
app.use(express.json());

// add credentials
const credentials = require('./credentials/keys.json');

const mysql = require('mysql');

// Joi is a class that will help us to validate information
// const Joi = require('joi');

// Set environment variable. Else use the port 3000
const port = process.env.PORT || 3000;
// Server listening for client request
app.listen(port, () => console.log(`server listening on port ${port}...`));

// TODO query parameters (example: /?sortBy=name)
// TODO set a validation method for requested ids
// TODO update only the parameters given by the client

// mysql connection
const connection = mysql.createConnection(credentials);

connection.connect(err => { 
  if (err) throw err;
  console.log("database server connected");
});

// Routes
// Handle GET requests
app.get('/', (req, res) => {
  const sql = 'SELECT * FROM notes';
  connection.query(sql, (err, results) => {
		if (err) throw err;
		res.send(results);
	});
});

app.get('/:id', (req, res) => {
  const sql = 'SELECT * FROM notes WHERE id = ?';
  connection.query(sql, [req.params.id],  (err, results) => {
    if (err) throw err;
    res.send(results);
  });
})

// Handle POST requests
app.post('/', (req, res) => {
  const sql = 'INSERT INTO notes (title, content, priorityLevel, taskState, creationDate, deadline) VALUES (?, ?, ?, ?, ?, ?)';
  const sqlreq = [req.body.title, req.body.content, req.body.priorityLevel, req.body.taskState, req.body.creationDate, req.body.deadline];
  connection.query(sql, sqlreq,  (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Handle PUT requests
app.put('/:id', (req, res) => {
  const id = req.params.id;
  const sqlreq = req.body;
  const sql = `UPDATE notes SET title = '${sqlreq.title}' WHERE id = '${id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Handle DELETE requests
app.delete('/:id', (req, res) => {
  const sql = `DELETE FROM notes WHERE id = '${req.params.id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});
