const express = require('express');
const request = require('request');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./db/index');
var httpProxy = require('http-proxy');
var apiProxy = httpProxy.createProxyServer();
var serverOne = 'http://localhost:3001',
    serverTwo = 'http://localhost:3000',
    serverThree = 'http://localhost:1128';

const app = express();
const PORT = 3004;

app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '..', 'client', 'dist')));

app.all('/rooms/related-listings', (req, res) => {
  console.log('redirecting to Server1');
  apiProxy.web(req, res, {target: serverOne});
});

app.all('/rooms/bookings/bundle', (req, res) => {
  console.log('redirecting to Server2');
  apiProxy.web(req, res, {target: serverTwo});
});

app.all('/rooms/gallery/bundle', (req, res) => {
  console.log('redirecting to Server3');
  apiProxy.web(req, res, {target: serverThree});
});

// Related Listings

// get database information for related listings
app.get('/rooms/related-listings', (req, res) => {
  let queryString = "SELECT * FROM listings";
  db.query("use related_listings", (err, rows, fields) => {});
  db.query(queryString, (err, rows, fields) => {
    res.json(rows);
  })
});

// Bookings

// get database information for bookings
app.get('/rooms/bookings/listings', (req, res) => {
  let queryString = "SELECT * FROM listings";
  db.query("use bookings", (err, rows, fields) => {});
  db.query(queryString, (err, rows, fields) => {
    res.json(rows);
  })
});

app.get('/rooms/bookings/dates/:month', (req, res) => {
  db.query('use bookings', (err, rows, fields) => {});
  db.query(`SELECT * FROM dates WHERE month = "${req.params.month}"`, (err, rows, fields) => {
    res.json(rows);
  })
})

// gallery

app.get('/images', (req, res) => {
  db.query('use airbnb', (err, rows, fields) => {});
  db.query(`SELECT * FROM Images`, (err, rows, fields) => {
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})