// DISM FT 2A 02
// LIM WEI XIONG
// P2026198

var db = require('./databaseConfig.js');

const users = {

    findUserByID: function (userid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findUserByIDQuery = "SELECT users.userid, users.username, users.email, users.contact, users.type, users.profile_pic_url, users.profile_pic_url ,users.created_at FROM users WHERE userid = ?;";
                //perform the query 
                dbConn.query(findUserByIDQuery, [userid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);

                    };
                    if (results.length === 0) {
                        callback(null, null);
                        return;
                    };
                    // console.log(results[0]);
                    return callback(null, results[0]);
                });// end of query function
            }//end of else
        });//end of connection
    },//end of findByID

    findAllUsers: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const findAllUsersQuery = "SELECT users.userid, users.username, users.email, users.contact, users.type, users.profile_pic_url, users.created_at FROM users;";
                dbConn.query(findAllUsersQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                }); //end of query
            }; //end of else
        }); //end of connect 
    }, //end of findAll

    postUser: function (users, callback) {
        var dbConn = db.getConnection();
        console.log(users)
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertUserQuery =
                    `INSERT INTO users (username, email, contact, password, type, profile_pic_url) VALUES (?, ?, ?, ?, ?, ?);`;
                dbConn.query(
                    insertUserQuery,
                    [users.username, users.email, users.contact, users.password, users.type, users.profile_pic_url],
                    (error, results) => {
                        dbConn.end();
                        if (error) {
                            return callback(error, null);

                        };
                        return callback(null, results);

                    });
            };
        });
    },

    editUserByID: function (userid, users, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const editUserQuery =
                    `UPDATE users SET username = ?, email = ?, contact = ?, password = ?, type = ?, profile_pic_url = ? WHERE userid = ?`;
                dbConn.query(editUserQuery, [users.username, users.email, users.contact, users.password, users.type, users.profile_pic_url, userid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error);
                    };

                    return callback(null, results)
                });
            };
        });
    },

    verify: function (username, password, callback) {

        var dbConn = db.getConnection();
        dbConn.connect(function (err) {

            if (err) {//database connection gt issue!

                console.log(err);
                return callback(err, null);
            } else {

                const query = "SELECT * FROM users WHERE username=? and password=?";

                dbConn.query(query, [username, password], (error, results) => {
                    dbConn.end();

                    if (error) {
                        callback(error, null);
                        return;
                    }
                    if (results.length === 0) {
                        return callback(null, null);

                    } else {
                        const user = results[0];
                        console.log(user)
                        return callback(null, user);
                    }
                });
            }
        });
    }

};

module.exports = users;