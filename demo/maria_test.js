/**
 * @summary MariaDB 연동 시험용 소스
 * @author  hanwhhanwh@gmail.com
 * @date    2019-04-28
 */
//const net = require("mysql");

//const config = require("../config/mariadb.json");
const mariadb = require("../lib/mariadb.js");

//console.log("config => " + config.host);

/*
mariadb.getConnection(function(err, connection) {
    if (err) {
        throw err;
        // console.log("Pool.getConnection error");
        // return;
    }

    let strQuery = "\
SELECT\
    miner_no, miner_name, INET_NTOA(miner_ip) AS miner_ip, reg_date, mod_date\
    , miner_spec \
FROM MINERS AS M;\
            ";
    connection.query(strQuery, function(err, rows, fields) {
        if (!err){  
        //response.send(rows);   
        console.log('The solution is: ', rows);  
        console.log('fields is: ', fields[0]);  
        }  
        else  
        console.log('Error while performing Query.');  
        connection.release();  
    });  
    mariadb.end();
});
*/

mariadb.getMiners(function(arr_miners) {
	console.log('Miners => ' + arr_miners); 
	arr_miners.forEach(function(miner, index, array) {
		console.log('[' + index + '] Miners => ' + miner.miner_name); 
	});
	// foreach(arr_miners as miner) {
	// 	console.log('Miners => ' + miner); 
	// }
	mariadb.end();
});
