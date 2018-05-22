var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'aniknow'
});

connection.connect();

connection.query('SELECT num FROM animalInfo WHERE id=1', function (error, results, fields) {
  if (error) throw error;
  console.log(results);
});