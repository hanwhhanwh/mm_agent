/**
 * @summary MiningPoolHub API sample
 * @author hbesthee@naver.com
 * @date 2021-03-14

http://[<coin_name>.]miningpoolhub.com/index.php?page=api&action=<method>&api_key=<user_api_key>[&<argument>=<value>]
 */

const fs = require('fs'); // 파일 시스템
const request = require('request');

let { logger, logBuffer } = require('../lib/logger.js');

const { insertRecentCredits } = require('../demo/mysql_demo.js');

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
	url: 'http://monero.miningpoolhub.com/index.php?page=api&action=getdashboarddata&api_key=' + g_strKey,
	body: null
};

request.post(g_options4API, callbackMphApi);


function callbackMphApi(err, res, result) {
	switch (res.statusCode) {
	case 200:
		logger.debug("Success : API call getdashboarddata");
		//console.log(result);
		const json = JSON.parse(result);
		//console.log(json.getdashboarddata.data.recent_credits);
/*
		let query = "";
		json.getdashboarddata.data.recent_credits.forEach( (row, index) => {
			//if (index != 7)
			//	return;
			//console.log(index + '> ' + row.date + '  | amount = ' + row.amount);
			query += "\
INSERT INTO `RECENT_CREDITS` (`reg_date`, `coin_no`, `amount`) VALUES\
	('" + row.date +"', 2, " + row.amount +")\
ON DUPLICATE KEY UPDATE\
	amount = " + row.amount +"\
	, `last_update` = NOW()\
;\n";
		});
*/
		//console.log( query );
		insertRecentCredits( 4, json.getdashboarddata.data.recent_credits );
		break;
	default:
		logger.error(`REST API call error: ResponseCode=${res.statusCode} \n\t${JSON.parse(result)}`);
		logger.error(err);
		break;
	}
}
