// Joi is a class that will help us to validate information
const Joi = require('joi');
const express = require('express');
const app = express();
// Allows us to parse json objs in the body of the request
app.use(express.json());
const mysql = require('mysql');

// Set environment var
const port = process.env.PORT || 3000;
// server listening for client request
app.listen(port, () => console.log(`listening on port ${port}...`));

// // TODO query parameters (example: /?sortBy=name) are optional
// app.get('/api/Notes/:id', (req, res) => {
//   res.send(req.query);
// });

// validation function
function validateNote(Note) {
  // set schema
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    // content: Joi.string().min(1).max(255).required()
  });
  // validate the schema requirements
  return schema.validate(Note);
}

// mysql connection
app.use(function(req, res, next) {
  res.locals.connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'GbdtPIvy0v85Y7M4',
    database: 'notesbox'
  });
  res.locals.connection.connect((err) => {
    if(err) console.log('Connection to mysql failed!');
  });
  next();
})

// Handle GET requests
app.get('/', (req, res) => {
  res.locals.connection.query('SELECT * FROM notes', (error, results, fields) => {
		if (error) throw error;
		res.send(results);
	});
});

app.get('/:id', (req, res) => {
  res.locals.connection.query('SELECT * FROM notes WHERE id = ?', [req.params.id],  (error, results, fields) => {
    if (error) throw error;
    res.send(results);
  });
})

// Handle POST requests
app.post('/', (req, res) => {
  res.locals.connection.query('INSERT INTO notes (title, content, priorityLevel, taskState, creationDate, deadline) VALUES (?, ?, ?, ?, ?, ?)', [req.body.title, req.body.content, req.body.priorityLevel, req.body.taskState, req.body.creationDate, req.body.deadline],  (error, results, fields) => {
    if (error) throw error;
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
