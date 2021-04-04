const express = require('express');
const app = express();
// Allows us to parse json objs in the body of the request
app.use(express.json());

const mysql = require('mysql');

// Joi is a class that will help us to validate information
// const Joi = require('joi');

// Set environment variable. Else use the port 3000
const port = process.env.PORT || 3000;
// Server listening for client request
app.listen(port, () => console.log(`server listening on port ${port}...`));

// TODO query parameters (example: /?sortBy=name) are optional
// TODO set a validation method

// mysql connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'GbdtPIvy0v85Y7M4',
  database: 'notesbox'
});

connection.connect(err => { 
  if (err) throw err;
  console.log("database server connected");
});

/**/
// app.use(function(req, res, next) {
//   res.locals.connection ;
//   res.locals.connection.connect((err) => {
//     if(err) console.log('Connection to mysql failed!');
//   });
//   next();
// })

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

// // Handle PUT requests
// app.put('/api/Notes/:id', (req, res) => {
//   // locate element, return 404 if not found
//   const Note = Notes.find(element => element.id === parseInt(req.params.id));
//   if (!Note) return res.status(404).send(`Note with id ${parseInt(req.params.id)} not found`);
//   // validate
//   const result = validateNote(req.body);
//   if (result.error) return res.status(400).send(result.error.details[0].message);
//   // update
//   Note.title = req.body.title;
//   // return update to client
//   res.send(Note);
// });

// // Handle DELETE requests
// app.delete('/api/Notes/:id', (req, res) => {
//   // locate element, return 404 if not found
//   const Note = Notes.find(element => element.id === parseInt(req.params.id));
//   if (!Note) return res.status(404).send(`Note with id ${parseInt(req.params.id)} not found`);
//   // delete
//   const idx = Notes.indexOf(Note);
//   Notes.splice(idx, 1);
//   // return deleted element
//   res.send(Note);
// });
