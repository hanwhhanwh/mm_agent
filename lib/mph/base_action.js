/**
 * @summary MiningPoolHub monitor library - action parent class definition
 * @author hbesthee@naver.com
 * @date 2021-05-26
 */

const request = require('request');

let { logger } = require('../logger.js');
 
 
/** parent class for mph actions */
class BaseAction
{
	/** 생성자 : 채굴 코인에 대한 기본 설정 */
	constructor(api_key, coin_no, mph_hostname) {
		this.action_name = 'base';
		this.api_key = api_key;
		this.coin_no = coin_no;
		this.mph_hostname = mph_hostname;
	}


	call = () => {
		let _options4API = {
			headers: {'Content-Type': 'application/json'},
			url: this.getURL(),
			body: null
		};

		request.post(_options4API, this.callbackRequest);
	}


	getURL = () => {
		return `http://${this.mph_hostname}.miningpoolhub.com/index.php?page=api&action=${this.action_name}&api_key=${this.api_key}`;
	}


	callbackRequest = (err, res, result) => {
		if (res.statusCode == undefined) {
			logger.warn(res);
			return;
		}
	}
};

exports = BaseAction;
module.exports = exports;
