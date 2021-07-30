/**
 * @summary MiningPoolHub monitor library
 * @author hbesthee@naver.com
 * @date 2021-05-23

http://[<coin_name>.]miningpoolhub.com/index.php?page=api&action=<method>&api_key=<user_api_key>[&<argument>=<value>]
 */

const request = require('request');

let { logger } = require('../lib/logger.js');


/** MPH 작업 클래스 */
class MphAgent
{
	/** 생성자 : 채굴 코인에 대한 기본 설정 */
	constructor(coin) {
		this.coin_no = coin.coin_no;
		this.mph_hostname = coin.mph_hostname;
		this.worker_list = Array();
	}

	callMphAPI = (api_key, api_name, result_callback) => {

		let _options4API = {
			headers: {'Content-Type': 'application/json'},
			url: `http://${this.mph_hostname}.miningpoolhub.com/index.php?page=api&action=${api_name}&api_key=${api_key}`,
			body: null
		};

		request.post(_options4API, result_callback);
	}


	findWorkerById = (worker_id) => {
		this.worker_list.forEach( (worker, index) => { 
			if (worker.id == worker_id)
				return worker;
		});
		return null;
	}


	call_getuserworkers = (api_key) => {
		this.callMphAPI(api_key, 'getuserworkers', this.callback_getuserworkers);
	}


	callback_getuserworkers = (err, res, result) => {
		switch (res.statusCode) {
		case 200:
			logger.debug(`API call Success : ${this.mph_hostname} getuserworkers`);
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
			logger.error(`API call error: ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
			logger.error(err);
			break;
		}
	}
}



exports.MphAgent = MphAgent;
module.exports = exports;
