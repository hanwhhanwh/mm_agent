/**
@summary MySQL Demo
		npm install --save mysqljs/mysql
@date 2021-05-19
@author hbesthee@naver.com
reference : https://github.com/mysqljs/mysql
*/

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
});

connection.end();