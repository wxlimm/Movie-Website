
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
