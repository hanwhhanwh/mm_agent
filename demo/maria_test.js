/**
 * @summary MariaDB 연동 시험용 소스
 * @author  hanwhhanwh@gmail.com
 * @date    2019-04-28
 */
//const net = require("mysql");

//const config = require("../config/mariadb.json");
const mariadb = require("../lib/mariadb.js");

//console.log("config => " + config.host);

mariadb.getConnection(function(err, connection) {
    if (err) {
        throw err;
        // console.log("Pool.getConnection error");
        // return;
    }

    connection.query('SELECT * FROM COINS', function(err, rows, fields) {
        if (!err){  
        //response.send(rows);   
        console.log('The solution is: ', rows[0]);  
        console.log('fields is: ', fields[0]);  
        }  
        else  
        console.log('Error while performing Query.');  
        connection.release();  
    });  
    mariadb.end();
});

