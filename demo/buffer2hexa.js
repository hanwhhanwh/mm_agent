/**
 * @author : hbesthee@naver.com
 * @date : 2021-03-14
 * 출처 : https://stackoverflow.com/questions/18879880
 */

let { logger, logBuffer } = require('../lib/logger.js'); //('./logs/', 'SS2019-'); // 기본 logger 생성 (singleton)

console.log(new Date().toISOString());
console.log(new Date().toLocaleTimeString());

let data = Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);

console.log(data);

console.log("hexa [1] = " + data.toString('hex'));
console.log("hexa [1.5] = " + data.toString('hex', 1, 18));
console.log("hexa [1.9] = " + data.toString('hex', 10, 18));

console.log("hexa [2] = " + Array.prototype.map.call(new Uint8Array(data),
			x => ('00' + x.toString(16)).slice(-2))
	.join('').match(/[a-fA-F0-9]{2}/g).join(' ').toString());

logger.info("test>>>");
logBuffer(data, "Test data :", 2);
