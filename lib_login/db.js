var mysql = require('mysql');
var db = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "1234",
        database: "login",
});
db.connect();

module.exports = db;