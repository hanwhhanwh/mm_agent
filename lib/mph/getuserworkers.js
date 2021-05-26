/**
 * @summary MiningPoolHub monitor library - getuserworkers action
 * @author hbesthee@naver.com
 * @date 2021-05-26
 */

 const request = require('request');

 let { logger } = require('../logger.js');
 
 
class GetUserworkers
{
	/** 생성자 : 채굴 코인에 대한 기본 설정 */
	constructor(api_key, coin_no, mph_hostname) {
		this.action_name = 'getuserworkers';
		this.api_key = api_key;
		this.coin_no = coin_no;
		this.mph_hostname = mph_hostname;
		this.worker_list = Array();
	}


	getURL = () => {
		return `http://${this.mph_hostname}.miningpoolhub.com/index.php?page=api&action=${this.action_name}&api_key=${this.api_key}`;
	}


	call = () => {
		let _options4API = {
			headers: {'Content-Type': 'application/json'},
			url: this.getURL(),
			body: null
		};

		request.post(_options4API, this.result_callback);
	}


	findWorkerById = (worker_id) => {
		this.worker_list.forEach( (worker, index) => { 
			if (worker.id == worker_id)
				return worker;
		});
		return null;
	}


	result_callback = (err, res, result) => {
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
				//insertWorkers( 2, json.getuserworkers );
			}
			break;
		default:
			logger.error(`API call error: ${this.action_name} : ${this.mph_hostname} : ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
			logger.error(err);
			break;
		}
	}
};

exports = GetUserworkers;
module.exports = exports;


let api = new GetUserworkers("key", 2, 'ethereum');
api.call();

console.log('test');
