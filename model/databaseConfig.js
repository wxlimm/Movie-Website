// DISM FT 2A 02
// LIM WEI XIONG
// P2026198

var mysql = require('mysql');

var dbConnect = {

    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "1qwer$#@!",
            database: "finalAssignment",
            dateStrings: true
        }
        );
        return conn;
    }
}
module.exports = dbConnect;