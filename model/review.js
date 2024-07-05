var db = require('./databaseConfig.js');

const review = {

    findReviews: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findReviewsByMovieID = "SELECT review.movieid, users.userid, users.username, review.rating, review.review, review.created_at FROM users JOIN review ON users.userid = review.userid  WHERE review.movieid = ?;";
                //perform the query 
                dbConn.query(findReviewsByMovieID, [movieid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);

                    };
                    if (results.length === 0) {
                        callback(null, null);
                        return;
                    };
                    // console.log(results[0]);
                    return callback(null, results);
                });// end of query function
            }//end of else
        });//end of connection
    },//end of findByID

    postReview: function (review, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertUserQuery =
                    `INSERT INTO review (movieid, userid, rating, review) VALUES (?, ?, ?, ?);`;
                dbConn.query(
                    insertUserQuery,
                    [review.movieid, review.userid, review.rating, review.review],
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
};

module.exports = review;
