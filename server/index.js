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

// app.all('/rooms/related-listings', (req, res) => {
//   console.log('redirecting to Server1');
//   apiProxy.web(req, res, {target: serverOne}, () => {
//     request(serverOne, (error, response, body) => {
//       res.send(body);
//     });
//   });
// });

// app.all('/', (req, res) => {
//   console.log('redirecting to Server2');
//   apiProxy.web(req, res, {target: serverTwo}, () => {
//     request(serverTwo, (error, response, body) => {
//       res.send(body);
//     })
//   });
// });

// app.all('/', (req, res) => {
//   console.log('redirecting to Server3');
//   apiProxy.web(req, res, {target: serverThree});
// });

// app.get('/', (req, res) => {
//   request(serverOne, (error, response, body) => {
//     res.sendFile('/Users/amar/Documents/hrsf119/front-end-capstone/service/related-listings/client/dist/bundle.js');
//   });
// });



// Main root
app.get('/', (req, res) => {
  res.send();
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

app.get('/rooms/bundle-relatedListings', (req, res) => {
  // request(`http://localhost:3001`, (error, response, body) => {
    res.sendFile('/Users/amar/Documents/hrsf119/front-end-capstone/service/related-listings/client/dist/bundle.js');
  // })
});

app.get('/rooms/bundle-bookings', (req, res) => {
  // request(`http://localhost:3000`, (error, response, body) => {
    res.sendFile('/Users/amar/Documents/hrsf119/front-end-capstone/service/bookings/client/dist/bundle.js');
  // });
});

app.get('/rooms/bundle-gallery', (req, res) => {
  // request(`http://localhost:1128`, (error, response, body) => {
    res.sendFile('/Users/amar/Documents/hrsf119/front-end-capstone/service/gallery-modal-overview/client/dist/bundle.js');
  // });
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
    console.log(rows);
    res.json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
})