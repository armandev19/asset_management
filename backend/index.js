const express = require('express');
const mysql = require('mysql');

const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'YgtDGdmoEn',
  database: 'asset_management',
});
// localhost', 'root', 'YgtDGdmoEn'
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});



app.get('/api/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

app.get('/api/user-details', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

app.get('/api/assets', (req, res) => {
  const searchTerm = req.query.search;

  let query = 'SELECT * FROM assets';
  if (searchTerm) {
    // Modify the query to include a WHERE clause for filtering
    query = `SELECT * FROM assets WHERE asset_code LIKE '%${searchTerm}%' OR asset_name LIKE '%${searchTerm}%'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

app.get('/api/locations', (req, res) => {
  const searchTerm = req.query.search;

  let query = 'SELECT * FROM locations';
  if (searchTerm) {
    // Modify the query to include a WHERE clause for filtering
    query = `SELECT * FROM locations WHERE name LIKE '%${searchTerm}%' OR address LIKE '%${searchTerm}%'`;
  }

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});

app.get('/api/asset-transfer', (req, res) => {
  let query;
  query = `SELECT * FROM asset_transfer WHERE name LIKE '%${searchTerm}%' OR address LIKE '%${searchTerm}%'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error querying MySQL:', err);
      return res.status(500).send('Error fetching data');
    }
    res.json(results);
  });
});