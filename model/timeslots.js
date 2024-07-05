var db = require('./databaseConfig.js');

const timeslots = {

    findTimeslotsByID: function (movieid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                //defines the query statement
                const findTimeslotByMovieID = `
                    SELECT 
                    movie.movieid, 
                    movie.title, 
                    timeslots.timeslotid, 
                    days.day, 
                    timeslots.starttime, 
                    timeslots.endtime FROM timeslots 
                    JOIN movie 
                    ON movie.movieid = timeslots.movieid  
                    JOIN days 
                    ON timeslots.daynum = days.daynum 
                    WHERE timeslots.movieid = ?;
                `;
                //perform the query 
                dbConn.query(findTimeslotByMovieID, [movieid], (error, results) => {
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

    postNewTimeslot: function (tsDetails, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (err) {
            if (err) {//database connection gt issue!
                console.log(err);
                return callback(err, null);
            }
            else {
                const insertUserQuery =
                    `INSERT INTO timeslots (movieid, daynum, starttime, endtime) VALUES (?, ?, ?, ?);`;
                dbConn.query(
                    insertUserQuery,
                    [tsDetails.movieid, tsDetails.day, tsDetails.starttime, tsDetails.endtime],
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

    deleteTimeslot: function(timeslotid, callback) {
        var dbConn = db.getConnection();
        dbConn.connect(function (error) {

            if (error) {
                console.log(error);
                return callback(error, null);
            }

            else {
                const deleteByIDQuery = "DELETE FROM timeslots WHERE timeslotid = ?;";
                dbConn.query(deleteByIDQuery, [timeslotid], (error, results) => {
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
    }
};

module.exports = timeslots;

