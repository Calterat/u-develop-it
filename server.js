const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

// Connect to database
const db = new sqlite3.Database('./db/election.db', err => {
  if (err) return console.error(err.message);
  console.log('Connected to the election database.');
});

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World!'
  });
});

db.all(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
})

// Default response for any other request(Not Found) Catch all request
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection is
db.on('open', () => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});