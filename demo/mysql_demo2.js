/**
@summary MySQL Demo - SELECT by parameters
		npm install --save mysql
@date 2021-05-20
@author hbesthee@naver.com
reference : https://github.com/mysqljs/mysql
*/

var mysql      = require('mysql');
const db_config = require('../config/db.json')
var connection = mysql.createConnection(db_config);

console.log(db_config.host);

connection.connect();

//connection.query("SELECT member_no, member_name, email, phone \
//		FROM MEMBERS WHERE member_id = 'hbesthee' AND password = 'password';"
//		, function (error, results, fields) {
connection.query("SELECT member_no, member_name, email, phone \
		FROM MEMBERS WHERE member_id = ? AND password = ?;"
		, ['hbesthee', 'password'], function (error, results, fields) {
	if (error) throw error;
	console.log('records: ', results);
});

connection.end();
