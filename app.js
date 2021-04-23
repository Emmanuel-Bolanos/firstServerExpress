const express = require('express');
const app = express();
// Allows us to parse json objs in the body of the request
app.use(express.json());
const handler = require('./src/handlers');

// Set environment variable. Else use the port 3000
const port = process.env.PORT || 3000;
// Server listening for client request
app.listen(port, () => console.log(`server listening on port ${port}...`));

// TODO query by deadline
// TODO set a validation method for requested ids
// TODO update only the parameters given by the client

// Routes
app.get('/', (req, res) => handler.getAllNotes(req, res));

app.get('/:id', (req, res) => handler.getNote(req, res));

app.post('/', (req, res) => handler.postNote(req, res));

app.put('/:id', (req, res) => handler.updateNote(req, res));

app.delete('/:id', (req, res) => handler.deleteNote(req, res));
