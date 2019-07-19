const mysql = require('mysql');

// let connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'related_listings'
// });

const connection = mysql.createConnection('mysql://root:@database:3306/');

connection.connect((err) => {
  if(err){
    console.log(err);
    return;
  }
});

module.exports = connection;