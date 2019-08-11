/**
 * @summary MariaDB Library
 * @author  hanwhhanwh@gmail.com
 * @date    2019-04-28
 */

var mysql = require('mysql');

let _config;
let _pools;

module.exports = function () {
	_config = require('../config/mariadb.json');    // load MariaDB configuration
	_pools = mysql.createPool({
		host: _config.host
		, port: _config.port
		, user: _config.user
		, password: _config.password
		, database: _config.database
	});
 
	return {
		getConnection: function (callback) {    // create connection pool
			_pools.getConnection(callback);
		}
		, getMiners: function(callback) {
			_pools.getConnection(function(err, connection) {
				if (!err) {
					let strQuery = "\
SELECT\
	miner_no, miner_name, INET_NTOA(miner_ip) AS miner_ip, reg_date, mod_date\
	, miner_spec \
FROM MINERS AS M;\
                                ";
					connection.query(strQuery, function(err, rows, fields) {
						if (!err){  
							//response.send(rows);   
							// console.log('The solution is: ', rows);  
							// console.log('fields is: ', fields[0]);  
							callback(rows);
						}  
						else {  
							console.log('Error while performing Query.');  
							//throw err;
						}
						connection.release();
					}); 
				}
			});
		}
		, end: function(callback){
			_pools.end(callback);
		}
	}
}();