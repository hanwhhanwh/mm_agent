/**
 * @summary MiningPoolHub monitor library - getdashboarddata action
 * @author hbesthee@naver.com
 * @date 2021-06-27
 */

const request	= require('request');
const mysql		= require('mysql');

const BaseAction = require('./base_action.js');
const db_config = require('../../config/db.json')
const { logger } = require('../logger.js');


/** MPH getdashboarddata action class */
class GetDataboardData extends BaseAction
{
	/** override constructor */
	constructor(api_key, coin_no, mph_hostname) {
		super(api_key, coin_no, mph_hostname);

		this.action_name = 'getdashboarddata';
		this.worker_list = Array();
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
	
			if (json != undefined && json.getdashboarddata != undefined && json.getdashboarddata.data != undefined) {
				this.insertDashboarddata( json.getdashboarddata );
			}
			break;
		default:
			logger.error(`API call error: ${this.action_name} : ${this.mph_hostname} : ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
			logger.error(err);
			break;
		}
	}


	/** getdashboarddata API 호출결과를 데이터베이스에 저장합니다. */
	insertDashboarddata = (result) => {
		let _remain_query = 0;
		let _coin_no = this.coin_no;
		var connection = mysql.createConnection(db_config);
		connection.connect();


		// 최근 수집한 총량에 대한 처리
		let query = "";
		if (result.data.recent_credits != undefined) {
			result.data.recent_credits.forEach( (row, index) => {
				query = "\
	INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES\
		( ?, ?, ? )\
	ON DUPLICATE KEY UPDATE\
		amount = ?\
		, `last_update` = NOW()\
	;\n";
				_remain_query ++;
				connection.query(query, [row.date, _coin_no, row.amount, row.amount], function (error, results, fields) {
					_remain_query --;
					if (error)
						throw error;
				});
			});
		}

	}
};

exports = GetDataboardData;
module.exports = exports;

/** usage sample:
const GetDataboardData = require('./lib/mph/getdashboarddata.js');

let api = new GetDataboardData("api_key", 2, 'ethereum');
console.log('URL = ' + api.getURL());
api.call();
*/