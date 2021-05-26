/**
 * @summary MiningPoolHub monitor library - getuserworkers action
 * @author hbesthee@naver.com
 * @date 2021-05-26
 */

const request = require('request');

const BaseAction = require('./base_action.js');
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
			logger.error(`API call error: ${this.action_name} : ${this.mph_hostname} : ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
			logger.error(err);
			break;
		}
	}


	/** API 호출결과를 데이터베이스에 저장합니다. */
	insertWorkers = (results) => {

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