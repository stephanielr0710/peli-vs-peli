var mysql = require('mysql');

var connection = mysql.createConnection({
    host     : '0.0.0.0',
    user     : 'root',
    password : 'labarca18921048',
    database : 'competencias'
  });
   
  module.exports = connection;