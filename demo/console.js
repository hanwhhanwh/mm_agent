const TIME_PREFIX = '>>>>>>>>>>>>>>>>>>> time: MySqlDbAdapter.';

let i = 0;

console.time(TIME_PREFIX+'createPool()');

for (i = 0 ; i < 10000000 ; i++) ;

console.timeEnd(TIME_PREFIX+'createPool()');
