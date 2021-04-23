// add credentials
const credentials = require('../../credentials/keys.json');

// mysql connection
const mysql = require('mysql');
const connection = mysql.createConnection(credentials);
connection.connect(err => { 
  if (err) throw err;
  console.log("database server connected");
});

// Routes
// Handle GET requests
const getAllNotes = (req, res) => {
  if (req.query.showBy) {
    const sql = (req.query.showBy === 'title') ? `SELECT * FROM notes ORDER BY ${req.query.showBy} ASC` : `SELECT * FROM notes ORDER BY ${req.query.showBy} DESC`
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  } else {
    const sql = 'SELECT * FROM notes';
    connection.query(sql, (err, results) => {
      if (err) throw err;
      res.send(results);
    });
  }
};

const getNote = (req, res) => {
  const id = [req.params.id];
  const sql = 'SELECT * FROM notes WHERE id = ?';
  connection.query(sql, id,  (err, results) => {
    if (err) res.send(`${id} is not a valid ID`);
    res.send(results);
  });
}

// Handle POST requests
const postNote = (req, res) => {
  const sql = 'INSERT INTO notes (title, content, priorityLevel, taskState, creationDate, deadline) VALUES (?, ?, ?, ?, ?, ?)';
  const sqlreq = [req.body.title, req.body.content, req.body.priorityLevel, req.body.taskState, req.body.creationDate, req.body.deadline];
  connection.query(sql, sqlreq,  (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Handle PUT requests
const updateNote = (req, res) => {
  const id = req.params.id;
  const sqlreq = req.body;
  const sql = `UPDATE notes SET title = '${sqlreq.title}' WHERE id = '${id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

// Handle DELETE requests
const deleteNote = (req, res) => {
  const sql = `DELETE FROM notes WHERE id = '${req.params.id}'`;
  connection.query(sql, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
};

module.exports = {
  getAllNotes,
  getNote,
  postNote,
  updateNote,
  deleteNote,
};
