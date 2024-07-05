// DISM FT 2A 02
// LIM WEI XIONG
// P2026198

var db = require('./databaseConfig.js');

const images = {
    postMovieImage: function (imageDetails, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertMovieQuery =
                    "UPDATE movie SET image_path = ? WHERE movieid = ?;";
                dbConn.query(
                    insertMovieQuery,
                    [imageDetails.path, imageDetails.movieid],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        };
                        dbConn.end();
                        return callback(null, results);

                    });
            };
        });
    },

    postUserImage: function (imageDetails, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertMovieQuery =
                    "UPDATE users SET profile_pic_url = ? WHERE userid = ?;";
                dbConn.query(
                    insertMovieQuery,
                    [imageDetails.path, imageDetails.userid],
                    (error, results) => {
                        if (error) {
                            return callback(error, null);
                        };
                        dbConn.end();
                        return callback(null, results);

                    });
            };
        });
    },

}

module.exports = images