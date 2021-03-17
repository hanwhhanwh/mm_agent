/**
 * @summary MiningPoolHub API sample
 * @author hbesthee@naver.com
 * @date 2021-03-14

http://[<coin_name>.]miningpoolhub.com/index.php?page=api&action=<method>&api_key=<user_api_key>[&<argument>=<value>]
 */

const fs = require('fs'); // 파일 시스템
const request = require('request');

let { logger, logBuffer } = require('../lib/logger.js');


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
	//logger.exitAfterFlush(0);
	process.exit(-1);
}



let g_options4API = {
	headers: {'Content-Type': 'application/json'},
	url: 'http://ethereum.miningpoolhub.com/index.php?page=api&action=getdashboarddata&api_key=' + g_strKey,
	body: null
};

request.post(g_options4API, callbackMphApi);


function callbackMphApi(err, res, result) {
	switch (res.statusCode) {
	case 200:
		logger.debug("Success : API call getdashboarddata")
		console.log(result);
		break;
	default:
		logger.error(`REST API call error: ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
		logger.error(err);
		break;
	}
}
