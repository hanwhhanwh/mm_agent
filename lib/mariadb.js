/**
 * @summary MariaDB Library
 * @author  hanwhhanwh@gmail.com
 * @date    2019-04-28
 */

var mysql = require('mysql');
 
module.exports = function () {
    const config = require('../config/mariadb.json');    // load MariaDB configuration
    const pool = mysql.createPool({
        host: config.host
        , port: config.port
        , user: config.user
        , password: config.password
        , database: config.database
    });
 
    return {
        getConnection: function (callback) {    // create connection pool
            pool.getConnection(callback);
        },
        end: function(callback){
            pool.end(callback);
        }
    }
}();