/**
 * @summary MiningPoolHub monitor library - getuserworkers action
 * @author hbesthee@naver.com
 * @date 2021-05-26
 */

const request = require('request');
const mysql      = require('mysql');

const BaseAction = require('./base_action.js');
const db_config = require('../../config/db.json')
const { logger } = require('../logger.js');
 

/** MPH getuserworkers action class */
class GetUserworkers extends BaseAction
{
	/** override constructor */
	constructor(api_key, coin_no, mph_hostname) {
		super(api_key, coin_no, mph_hostname);

		this.action_name = 'getuserworkers';
		this.worker_list = Array();
	}


	/** 동일한 worker_id를 갖는 worker 객체를 찾아 반환합니다. */
	findWorkerById = (worker_id) => {
		this.worker_list.forEach( (worker, index) => { 
			if (worker.id == worker_id)
				return worker;
		});
		return null;
	}


	/** override : BaseAction.callbackRequest() */
	callbackRequest = (err, res, result) => {
		if (res.statusCode == undefined) {
			logger.warn(res);
			return;
		}

		switch (res.statusCode) {
		case 200:
			logger.debug(`API call Success : ${this.action_name} : ${this.mph_hostname}`);
			const json = JSON.parse(result);
	
			if (json != undefined && json.getuserworkers != undefined && json.getuserworkers.data != undefined) {
				json.getuserworkers.data.forEach( (worker, index) => { 
					let _worker = this.findWorkerById(worker.id)
					if (_worker == null) { // 신규 worker인지 확인
						worker.password = "new";
						this.worker_list.push(worker);
					}
				});
				this.insertWorkers( json.getuserworkers );
			}
			break;
		default:
			logger.error(`API call error: ${this.action_name} : ${this.mph_hostname} : ResponseCode=${res.statusCode} \n\t${(result)}`);
			logger.error(err);
			break;
		}
	}


	/** API 호출결과를 데이터베이스에 저장합니다. */
	insertWorkers = (result) => {
		let _remain_query = 0;
		let _coin_no = this.coin_no;
		var connection = mysql.createConnection(db_config);
		connection.connect();
	
		let query = "";
		let workers_status_no = 0;
	
		// 상태 정보 저장 처리
		query = "\
INSERT INTO WORKERS_STATUS \
(coin_no, runtime) \
VALUES (?, ?)\
;";
		_remain_query ++;
		connection.query(query, [_coin_no, result.runtime]
				, function (error, results, fields) {
			_remain_query --;
			if (error)
				throw error;
			workers_status_no = results.insertId;
	
			result.data.forEach( (worker) => { 
				if (worker.password == "new") { // 신규 worker인지 확인
					query = "\
INSERT INTO WORKER \
( worker_no, coin_no, user_name, password, monitor, is_alert ) \
VALUES (?, ?, ?, ?, ?, 1) \
ON DUPLICATE KEY UPDATE user_name = ?, monitor = ?\
;";
					// WORKER 등록
					_remain_query ++;
					connection.query(query, [worker.id, _coin_no, worker.username, 'x', worker.monitor, worker.username, worker.monitor]
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
				connection.query(query, [workers_status_no, worker.id, _coin_no, worker.hashrate]
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
	}
};

exports = GetUserworkers;
module.exports = exports;

/** usage sample:
const GetUserworkers = require('./lib/mph/getuserworkers.js');

let api = new GetUserworkers("api_key", 2, 'ethereum');
console.log('URL = ' + api.getURL());
api.call();
*/