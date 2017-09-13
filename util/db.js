var dbhost = "hzzmdata.mysql.rds.aliyuncs.com";
var dbuser = "zuma_stat_read";
var dbdatabase = "zuma_stat";
var dbpassword = "cQO1fKzQ";
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 10,
    host: dbhost,
    user: dbuser,
    password: dbpassword,
    database: dbdatabase
});

module.exports = pool;