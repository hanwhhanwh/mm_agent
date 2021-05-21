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
/*
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results[0].solution);
  console.log(results);
  console.log(fields);
});

connection.end();
*/

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


function insertWorkers( coin_no, result )
{
	let _remain_query = 0;
	var connection = mysql.createConnection(db_config);
	connection.connect({multipleStatements: true});

	let query = "";
	let workers_status_no = 0;

	// 상태 정보 저장 처리
	query = "\
INSERT INTO WORKERS_STATUS \
(coin_no, runtime) \
VALUES (?, ?)\
;";
	_remain_query ++;
	connection.query(query, [coin_no, result.runtime]
			, function (error, results, fields) {
		_remain_query --;
		if (error)
			throw error;
		workers_status_no = results.insertId;

		result.data.forEach( (worker, index) => { 
			if (worker.password == "new") { // 신규 worker인지 확인
				query = "\
INSERT INTO WORKER \
( worker_no, user_name, password, monitor, is_alert ) \
VALUES (?, ?, ?, ?, 1) \
ON DUPLICATE KEY UPDATE user_name = ?, monitor = ?\
;";
				// WORKER 등록
				_remain_query ++;
				connection.query(query, [worker.id, worker.username, 'x', worker.monitor, worker.username, worker.monitor]
						, function (error, results, fields) {
					_remain_query --;
					if (error)
						throw error;
					//console.log(results);
					if (_remain_query <= 0)
						connection.end();
				});
			}

			// 해쉬값 저장
			query = "\
INSERT INTO WORKERS_STATUS_DATA \
(work_status_no, worker_no, coin_no, hashrate) \
VALUES (?, ?, ?, ?)\
;"
			_remain_query ++;
			connection.query(query, [workers_status_no, worker.id, coin_no, worker.hashrate]
					, function (error, results, fields) {
				_remain_query --;
				if (error)
					throw error;
				//console.log(results);
				if (_remain_query <= 0)
					connection.end(); // 모든 쿼리 이용 후, 연결 종료
			});
		});
	});

	//connection.end();

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
exports.insertWorkers = insertWorkers;
exports.insertData = insertData;
module.exports = exports;

