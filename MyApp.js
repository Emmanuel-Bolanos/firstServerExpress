// Joi is a class that will help us to validate information
const Joi = require('joi');
const express = require('express');
const app = express();
// Allows us to parse json objs in the body of the request
app.use(express.json());

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

// our "db"
// TODO mod this to work with RDS
const Notes = [
  {id: 1, title: "not fake note"},
  {id: 2, title: "Note bogaloo"},
  {id: 3, title: "the Note of notes"},
  {id: 4, title: "a crazy note"}
];

// Handle GET requests
app.get('/api/Notes', (req, res) => {
  res.send(Notes);
});

app.get('/api/Notes/:id', (req, res) => {
  const Note = Notes.find(element => element.id === parseInt(req.params.id));
  if (!Note) return res.status(404).send(`Note with id ${parseInt(req.params.id)} not found`);
  res.send(Note);
});

// // TODO query parameters (example: /?sortBy=name) are optional
// app.get('/api/Notes/:id', (req, res) => {
//   res.send(req.query);
// });

// Handle POST requests
app.post('/api/Notes', (req, res) => {
  // validate
  const result = validateNote(req.body);
  // communicate error if needed
  if (result.error) return res.status(400).send(result.error.details[0].message);
  // adding element
  const Note = {
    id: Notes.length + 1,
    title: req.body.title
  };
  Notes.push(Note);
  res.send(Note);
});

// Handle PUT requests
app.put('/api/Notes/:id', (req, res) => {
  // locate element, return 404 if not found
  const Note = Notes.find(element => element.id === parseInt(req.params.id));
  if (!Note) return res.status(404).send(`Note with id ${parseInt(req.params.id)} not found`);
  // validate
  const result = validateNote(req.body);
  if (result.error) return res.status(400).send(result.error.details[0].message);
  // update
  Note.title = req.body.title;
  // return update to client
  res.send(Note);
});

// Handle DELETE requests
app.delete('/api/Notes/:id', (req, res) => {
  // locate element, return 404 if not found
  const Note = Notes.find(element => element.id === parseInt(req.params.id));
  if (!Note) return res.status(404).send(`Note with id ${parseInt(req.params.id)} not found`);
  // delete
  const idx = Notes.indexOf(Note);
  Notes.splice(idx, 1);
  // return deleted element
  res.send(Note);
});

// Set environment var
const port = process.env.PORT || 3000;

// server listening for client request
app.listen(port, () => console.log(`listening on port ${port}...`));
