const { request } = require('../app.js');
var db = require('./databaseConfig.js');

const movie = {

    findMovieByID: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findMovieByIDQuery = "SELECT movie.title, movie.description, movie.cast, movie.time, movie.image_path, movie.`opening date` FROM movie WHERE movieid = ?;";
                const findMovie_GenresIDQuery = "SELECT genreid_fk FROM movie_genres WHERE movieid_fk = ?;";
                const findMovie_GenreNamesQuery = "SELECT genre.genre FROM genre WHERE genreid = ?;"
                var responseMovie = null
                var movieGenreList = ""
                // QUERY FOR MOVIE DETAILS BASED ON MOVIE ID
                dbConn.query(findMovieByIDQuery, [movieid], (err, movieDetails) => {
                    if (err) {
                        return callback(err, null);

                    };
                    if (movieDetails.length === 0) {
                        callback(null, null);
                        return;
                    };
                    // QUERY FOR GENRE IDS FROM MOVIE_GENRE TABLE
                    dbConn.query(findMovie_GenresIDQuery, [movieid], (err, movieGenreIDs) => {
                        console.log(movieDetails)
                        console.log(movieGenreIDs)
                        if (err) {
                            return callback(err, null);

                        };
                        if (movieGenreIDs.length === 0) {
                            callback(null, null);
                            return;
                        };

                        // LOOP THROUGH GENREIDS AND GET GENRENAMES, ADD TO A VARIABLE.
                        for (i = 0; i < movieGenreIDs.length; i++) {
                            // QUERY FOR GENRE NAMES BASED ON GENRE IDS
                            dbConn.query(findMovie_GenreNamesQuery, [movieGenreIDs[i].genreid_fk], (err, genreNames) => {
                                if (err) {
                                    return callback(err, null);

                                };
                                if (genreNames.length === 0) {
                                    callback(null, null);
                                    return;
                                };

                                // CREATING NEW FIELD INSIDE OBJECT
                                movieGenreList += "," + genreNames[0].genre
                                responseMovie = movieDetails[0];
                                responseMovie["genres"] = movieGenreList

                                // RETURN ONLY ON LAST ITERATION
                                if (movieGenreList.split(",").length == movieGenreIDs.length + 1) {
                                    return callback(null, responseMovie)
                                }
                            });

                        };

                        dbConn.end();

                    });

                    // return callback(null, movieGenreIDs[0]);
                });// end of query function
            }//end of else
        });//end of connection
    },//end of findByID

    findMovieByTypeNValue: function (requestBody, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log(requestBody)
                requestBody.searchValue = "%" + requestBody.searchValue + "%"

                console.log(requestBody.searchValue)
                console.log(requestBody.searchType)


                //defines the query statement
                const findMovieByTypeQuery = "SELECT * FROM movie WHERE " + requestBody.searchType + " LIKE '" + requestBody.searchValue + "';";
                console.log(findMovieByTypeQuery)
                // QUERY FOR MOVIE DETAILS BASED ON MOVIE ID
                dbConn.query(findMovieByTypeQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        console.log("ERROR")
                        return callback(error, null);
                    };
                    console.log("RESULTS FOR TYPE" + results)
                    return callback(null, results);
                }); //end of query
            }//end of else
        });//end of connection
    },//end of findByID


    findAllMovies: function (callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (error) {
            if (error) {//database connection gt issue!
                console.log(error);
                return callback(error, null);
            }
            else {
                const findAllMoviesQuery = "SELECT * FROM movie";
                dbConn.query(findAllMoviesQuery, (error, results) => {
                    dbConn.end();
                    if (error) {
                        return callback(error, null);
                    };
                    return callback(null, results);
                }); //end of query
            }; //end of else
        }); //end of connect 
    }, //end of findAll

    postMovie: function (movieReq, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertMovieQuery =
                    "INSERT INTO movie (title, description, cast, time, `opening date`) VALUES (?, ?, ?, ?, ?);";
                dbConn.query(
                    insertMovieQuery,
                    [movieReq.title, movieReq.description, movieReq.cast, movieReq.time, movieReq["opening date"]],
                    (error, movieOperation) => {
                        if (error) {
                            return callback(error, null);
                        };
                        // return callback(null, results.insertId);
                        var thisMovieId = movieOperation.insertId
                        var thisMovieGenres = movieReq.genreid.split(",")
                        console.log(thisMovieId)
                        console.log(thisMovieGenres)

                        const insertMovie_GenreQuery =
                            "INSERT INTO movie_genres (movieid_fk, genreid_fk) VALUES (?, ?);";

                        for (i = 0; i < thisMovieGenres.length; i++) {
                            dbConn.query(
                                insertMovie_GenreQuery,
                                [thisMovieId, parseInt(thisMovieGenres[i])],
                                (error, results) => {
                                    if (error) {
                                        return callback(error, null);
                                    };
                                    console.log(results)
                                }
                            )
                        }
                        dbConn.end();
                        return callback(null, movieOperation);
                    }
                );
            };
        });
    },

    deleteMovieByID: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (error) {

            if (error) {
                console.log(error);
                return callback(error, null);
            }

            else {
                const deleteByIDQuery = "DELETE FROM movie WHERE movieid = ?;";
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

    editMovieByID: function (movieid, movie, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const editMovieQuery =
                    "UPDATE movie SET title = ?, description = ?, cast = ?, time = ?, `opening date` = ? WHERE movieid = ?";
                dbConn.query(editMovieQuery, [movie.title, movie.description, movie.cast, movie.time, movie["opening date"], movieid], (error, results1) => {
                    if (error) {
                        return callback(error);
                    };
                    // return callback(null, results.insertId);
                    var thisMovieGenres = movie.genreid.split(",")
                    console.log(thisMovieGenres)

                    const insertMovie_GenreQuery =
                        "INSERT INTO movie_genres (movieid_fk, genreid_fk) VALUES (?, ?);";

                    for (i = 0; i < thisMovieGenres.length; i++) {
                        dbConn.query(
                            insertMovie_GenreQuery,
                            [movieid, parseInt(thisMovieGenres[i])],
                            (error, results) => {
                                if (error) {
                                    return callback(error, null);
                                };
                                console.log(results)
                            }
                        )
                    }
                    dbConn.end();
                    return callback(null, results1);
                });
            };
        });
    },



};

module.exports = movie;

