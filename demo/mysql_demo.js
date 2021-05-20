/**
@summary MySQL Demo
		npm install --save mysqljs/mysql
@date 2021-05-19
@author hbesthee@naver.com
reference : https://github.com/mysqljs/mysql
*/

var mysql      = require('mysql');
const db_config = require('../config/db.json')
var connection = mysql.createConnection(db_config);

console.log(db_config.host);

connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  console.log(results);
  console.log(fields);
});

connection.end();


function insertRecentCredits (coin_no, rows)
{
	var connection = mysql.createConnection(db_config);
	connection.connect();

	let query = "";
	rows.forEach( (row, index) => {
		query = "\
INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES\
	('" + row.date + "', " + coin_no + ", " + row.amount + ")\
ON DUPLICATE KEY UPDATE\
	amount = " + row.amount + "\
	, `last_update` = NOW()\
;\n";
		connection.query(query, function (error, results, fields) {
			if (error)
				throw error;
		});
	});
	connection.end();
}


function insertData(qeury)
{
	var connection = mysql.createConnection(db_config);
	connection.connect({multipleStatements: true});

	connection.query(qeury, function (error, results, fields) {
		if (error)
			throw error;
		console.log(results);
		console.log(fields);
	});

	connection.end();
}

exports.insertRecentCredits = insertRecentCredits;
exports.insertData = insertData;
module.exports = exports;

