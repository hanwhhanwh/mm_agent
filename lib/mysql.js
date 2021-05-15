'use strict';

const mysql  = require('promise-mysql');


let _pool = null;

class MySqlDbAdapter {

	static getDefaultPool(){
		return _pool;
	}

	static createPool(poolConfig) {
		MySqlDbAdapter.queryTimeout = poolConfig.queryTimeout;
		console.time(TIME_PREFIX+'createPool()');
		let pool = mysql.createPool(poolConfig);
		Logger.info('createPool() >>>>>>>>>> poolConfig.queryTimeout='+MySqlDbAdapter.queryTimeout);
		console.timeEnd(TIME_PREFIX+'createPool()');
		return pool;
	}

	static releasePool(pool) {
		console.time(TIME_PREFIX+'releasePool()');
		pool.end((error)=>{
			if(error) Logger.error(error);
			else Logger.info('pool.end(): Ok');
			console.timeEnd(TIME_PREFIX+'releasePool()');
		});
	}

	static responseError(error, res) {
		res.json({
			RES_CODE: -1,
			RES_MSG: error.message
		});
		Logger.error(error.message);
	}

	static responseErrorMessage(errorMessage, res) {
		res.json({
			RES_CODE: -1,
			RES_MSG: errorMessage
		});
		Logger.error(errorMessage);
	}

	static responseResults(results, res) {
		res.json({ 
			RES_CODE:     0,
			RES_MSG:      'Ok',
			ITEMS:        results,
			NUM_OF_ITEMS: results.length
		});
	}

	static responseResultsWithCount(results, count, res) {
		res.json({
			RES_CODE:     0,
			RES_MSG:      'Ok',
			ITEMS:        results,
			NUM_OF_ITEMS: count
		});
	}

	static responseResult(result, res) {
		res.json({
			RES_CODE: 0,
			RES_MSG:  'Ok',
			ITEM:     result
		});
	}

	static isConnectionCheck(connection, res) {
		if(!connection) {
			MySqlDbAdapter.responseErrorMessage('Connection is null!', res);
			return false;
		} else {
			return true;
		}
	}

	static isAlive(req, res) {
		console.time(TIME_PREFIX+'isAlive()');
		let jsonParams = [ ];
		let statement  = `select now()`;
		Logger.debug('statement=', statement);
		
		_pool.getConnection(function(err, connection) {
			if(!MySqlDbAdapter.isConnectionCheck(connection, res)) return;
			connection.query({
				sql:     statement,
				timeout: MySqlDbAdapter.queryTimeout
			},
			jsonParams,
			function (error, results, fields) {
				if(connection) connection.release();
				if (error) {
				if(res) MySqlDbAdapter.responseError(error, res);
				} else {
				if(res) MySqlDbAdapter.responseResult(results[0], res);
				console.timeEnd(TIME_PREFIX+'isAlive()');
				}
			}
			);
		});
		}

		static count(req, res, tableName, pkName, callback) {
		console.time(TIME_PREFIX+`count(${tableName})`);
		let whereStr = 'where 1=1', jsonParams = [];
		if(req.body.DATA_ARRAY_LIST) {
			req.body.DATA_ARRAY_LIST.forEach((condition, index)=>{ // condition: { clause: 'and | or', name: '', operator: '=', value: ''}
			//Logger.debug('condition['+index+']=', condition); 
			if(condition.operator==='like') {
				whereStr = whereStr + ' ' +condition.clause + ' ' + condition.name + ' ' + condition.operator + ` '${condition.value}%'`;
			} else if(condition.operator!=='in') {
				whereStr = whereStr + ' ' +condition.clause + ' ' + condition.name + ' ' + condition.operator + ' ?';
				jsonParams.push(condition.value);
			} else {
				let values = condition.value.split(','), paramString = '';
				values.forEach((value)=>{
				paramString += '?,'
				jsonParams.push(value);
				});
				if(paramString.length>0) paramString = '('+paramString.substring(0, paramString.lastIndexOf(','))+')';
				whereStr = whereStr + ' ' +condition.clause + ' ' + condition.name + ' ' + condition.operator + ' ' + paramString;
			}
			});
		}
		
		let statement  = `select count(*) as COUNT from ${tableName} ${whereStr}`;
		Logger.debug('statement=', statement);
		Logger.debug('jsonParams=', jsonParams);

		// let pool = req.app.get(consts._CONTEXT).defaultPool.pool;
		_pool.getConnection(function(err, connection) {
			if(!MySqlDbAdapter.isConnectionCheck(connection, res)) return;
			connection.query({
				sql:     statement,
				timeout: MySqlDbAdapter.queryTimeout
			},
			jsonParams,
			function (error, results, fields) {
				if(connection) connection.release();
				if (error) {
				if(res) MySqlDbAdapter.responseError(error, res);
				} else {
				Logger.debug('results.length='+results.length);
				if(res) MySqlDbAdapter.responseResult(results[0], res);
				console.timeEnd(TIME_PREFIX+`count(${tableName})`);
				}
				if(callback) callback(error, results, fields);
			}
			);
		});
	}

} // class

_pool = MySqlDbAdapter.createPool(Config.defaultPool);
module.exports = MySqlDbAdapter;