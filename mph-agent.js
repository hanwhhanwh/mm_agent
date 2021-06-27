/**
 * @summary MiningPoolHub monitor agent
 * @author hbesthee@naver.com
 * @date 2021-05-23

http://[<coin_name>.]miningpoolhub.com/index.php?page=api&action=<method>&api_key=<user_api_key>[&<argument>=<value>]
 */

const fs = require('fs'); // 파일 시스템

const { logger } = require('./lib/logger.js');
const MphAgent = require('./lib/mph.js');
const GetUserworkers = require('./lib/mph/getuserworkers.js');
const GetDataboardData = require('./lib/mph/getdashboarddata.js');

let g_strKey = undefined; // MPH API 접근 Key
let g_arrCoins = undefined; // API로 접근할 coin 목록

// mph 설정값 로딩
if (fs.existsSync('./config/mph.json')) {
	let mphConfig = require('./config/mph.json');
	g_strKey = mphConfig.key;
	g_arrCoins = mphConfig.coins;
}
else {
	g_strKey = undefined;
	g_arrCoins = undefined;
	logger.error("not found 'config/mph.json'");
	process.exit(-1);
}

let g_agent_list = Array(); // Coin별 Agent 저장 목록
let _actionList = Array(); // Coin별 MPH Action 관리 목록


logger.info("start MPH monitor agent");


let initMphAPI = function(coins) {
	coins.forEach( (coin) => {
		//console.log(`[${index}] coin_no = ${coin.coin_no}, mph_hostname = ${coin.mph_hostname}`);
		//g_agent_list.push(new MphAgent.MphAgent(coin));
		//console.log(g_worker_list[g_worker_list.length - 1]);
		_actionList.push(new GetDataboardData(g_strKey, coin.coin_no, coin.mph_hostname));
		_actionList.push(new GetUserworkers(g_strKey, coin.coin_no, coin.mph_hostname));
	});
	//g_agent_list[0].call_getuserworkers(g_strKey);

	_actionList.forEach( (action) => {
		action.call();
	});
}


initMphAPI(g_arrCoins);


// 5분 마다 API 호출하여 데이터 저장 처리
const intervalMphMonitor = setInterval(() => {
	_actionList.forEach( (action) => {
		action.call();
	});
}, 300000);
