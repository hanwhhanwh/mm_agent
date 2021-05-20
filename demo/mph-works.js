/**
 * @summary MiningPoolHub API getuserworkers sample
 * @author hbesthee@naver.com
 * @date 2021-03-14

http://[<coin_name>.]miningpoolhub.com/index.php?page=api&action=<method>&api_key=<user_api_key>[&<argument>=<value>]
 */

const fs = require('fs'); // 파일 시스템
const request = require('request');

let { logger, logBuffer } = require('../lib/logger.js');

const { insertRecentCredits } = require('../demo/mysql_demo.js');
const { worker } = require('cluster');

let g_strKey = undefined;
let g_arrCoins = undefined;

// mph 설정값 로딩
if (fs.existsSync('./config/mph.json')) {
	let mphConfig = require('../config/mph.json');
	g_strKey = mphConfig.key;
	g_arrCoins = mphConfig.coins;
}
else {
	g_strKey = undefined;
	g_arrCoins = undefined;
	logger.error("not found 'config/mph.json'");
	process.exit(-1);
}


let g_options4API = {
	headers: {'Content-Type': 'application/json'},
	url: 'http://ethereum.miningpoolhub.com/index.php?page=api&action=getuserworkers&api_key=' + g_strKey,
	body: null
};


request.post(g_options4API, callbackMphApi);


let worker_list = array();


function findWorkerById(worker_id)
{
	worker_list.forEach( (worker, index) => { 
		if (worker.id == worker_id)
			return worker;
	});
	return null;
}


function callbackMphApi(err, res, result) {
	switch (res.statusCode) {
	case 200:
		logger.debug("Success : API call getuserworkers");
		//console.log(result);
		const json = JSON.parse(result);
		//console.log(json.getuserworkers.data);

		if (json != undefined && json.getuserworkers != undefined && json.getuserworkers.data != undefined) {
			json.getuserworkers.data.forEach( (worker, index) => { 
				let _worker = findWorkerById(worker.id)
				if (_worker == null) { // 신규 worker인지 확인
					worker.password = "new";
					worker_list.push(worker);
				}
			});
			insertWorkers( 2, json.getuserworkers.data );
		}
		break;
	default:
		logger.error(`REST API call error: ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
		logger.error(err);
		break;
	}
}
