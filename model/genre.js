// DISM FT 2A 02
// LIM WEI XIONG
// P2026198

var db = require('./databaseConfig.js');

const genre = {

    findAllGenres: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const findAllUsersQuery = "SELECT genre.genreid, genre.genre, genre.description FROM genre;";
                dbConn.query(findAllUsersQuery, (error, results) => {
                    if (error) {
                        return callback(error, null);
                    };
                    dbConn.end();
                    return callback(null, results);
                }); //end of query
            }; //end of else
        }); //end of connect 
    }, //end of findAll

    postGenre: function (genre, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertUserQuery =
                    `INSERT INTO genre (genre, description) VALUES (?, ?);`;
                dbConn.query(
                    insertUserQuery,
                    [genre.genre, genre.description],
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

    findMovieByGenreID: function (genreid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findMovieByIDQuery = "SELECT movieid_fk FROM movie_genres WHERE genreid_fk = ?;";
                const findMovie_GenresIDQuery = "SELECT * FROM movie WHERE movieid = ?";
                var responseMovie = []
                var movieDeets = null
                // QUERY FOR MOVIE DETAILS BASED ON MOVIE ID
                dbConn.query(findMovieByIDQuery, [genreid], (err, movieDetails) => {
                    if (err) {
                        return callback(err, null);

                    };
                    if (movieDetails.length === 0) {
                        callback(null, null);
                        return;
                    };
                    // QUERY FOR GENRE IDS FROM MOVIE_GENRE TABLE
                    for (i = 0; i < movieDetails.length; i++) {
                        thisIndex = movieDetails[movieDetails.length-1].movieid_fk
                        dbConn.query(findMovie_GenresIDQuery, [movieDetails[i].movieid_fk], (err, movieRes) => {
                            if (err) {
                                return callback(err, null);
    
                            };
                            if (movieRes.length === 0) {
                                callback(null, null);
                                return;
                            };
                            responseMovie.push(movieRes[0])

                            if (thisIndex == movieRes[0].movieid) {
                                return callback(null, responseMovie)

                            }
                        });
                    }

                    dbConn.end();
                });// end of query function
            }//end of else
        });//end of connection
    },//end of findByID


    findGenreByID: function (genreid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findUserByIDQuery = "SELECT * FROM genre WHERE genreid = ?;";
                //perform the query 
                dbConn.query(findUserByIDQuery, [genreid], (error, results) => {
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

    deleteGenreByMovie: function(movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (error) {

            if (error) {
                console.log(error);
                return callback(error, null);
            }

            else {
                const deleteByIDQuery = "DELETE FROM movie_genres WHERE movieid_fk = ?;";
                dbConn.query(deleteByIDQuery, [movieid], (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log(error)
                        return callback(error, null);
                    };
                    console.log(results)
                    return callback(null, results);
                }); //end of query
            };
        });
    },

};

module.exports = genre;