/**
 * @summary Timers sample
 * @author hbesthee@naver.com
 * @date 2021-05-23

https://nodejs.org/ko/docs/guides/timers-in-node/
https://ko.javascript.info/settimeout-setinterval
 */

function myTimeout(arg) {
	console.log(`myTimeout arg was => ${arg}`);
}

var timeout = setTimeout(myTimeout, 3000, 'extra');
// clearTimeout(timeout); // Timeout 취소



function myInterval(arg1, arg2) {
	console.log(`myInterval arg1 was => ${arg1}`);
	console.log(`myInterval arg2 was => ${arg2}`);
}

var interval = setInterval(myInterval, 3000, 'arg1', 100);
// clearInterval(interval); // Interval 취소



let i = 0;

//setTimeout(() => console.log('i = ', i), 0); // ?
setImmediate(() => console.log('i = ', i)); // ?

for(let j = 0; j < 100000000; j++) {
	i++;
}