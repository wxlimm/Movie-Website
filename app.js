var express = require('express');

var app = express();

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

const users = require('./model/users')
const genre = require('./model/genre')
const movie = require('./model/movie')
const review = require('./model/review')
const timeslots = require('./model/timeslots')
const images = require('./model/imageUpload')

const isLoggedInMiddleware = require("./auth/isLoggedInMiddleware");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("./config.js");


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ██╗███╗   ███╗ █████╗  ██████╗ ███████╗    ██╗   ██╗██████╗ ██╗      ██████╗  █████╗ ██████╗ 
// ██║████╗ ████║██╔══██╗██╔════╝ ██╔════╝    ██║   ██║██╔══██╗██║     ██╔═══██╗██╔══██╗██╔══██╗
// ██║██╔████╔██║███████║██║  ███╗█████╗      ██║   ██║██████╔╝██║     ██║   ██║███████║██║  ██║
// ██║██║╚██╔╝██║██╔══██║██║   ██║██╔══╝      ██║   ██║██╔═══╝ ██║     ██║   ██║██╔══██║██║  ██║
// ██║██║ ╚═╝ ██║██║  ██║╚██████╔╝███████╗    ╚██████╔╝██║     ███████╗╚██████╔╝██║  ██║██████╔╝
// ╚═╝╚═╝     ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝     ╚═════╝ ╚═╝     ╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ 
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
app.use('/images', express.static('images'));
const multer = require('multer');
// FOR MOVIES
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './images/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const imageFilter = (req, file, cb) => {

    if (file.mimetype === 'image/jpeg') {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('INVALIDFILETYPE'))
    }
}

const obj = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: imageFilter
});

const upload = multer(obj).single('newImage')


// FOR PROFILE PIC
const storage2 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './imagesforuser/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const obj2 = multer({
    storage: storage2,
    limits: {
        fileSize: 1024 * 1024
    },
    fileFilter: imageFilter
});

const uploaduser = multer(obj2).single('newImage')

// ADVANCED 1
// POST A NEW IMAGE INTO IMAGES FOLDER. TO ACCESS, JUST TYPE FILEPATH IN URL
app.post("/movie/:id/image/", (req, res, next) => {
    const movieid = parseInt(req.params.id);

    upload(req, res, function (error) {
        if (error) {
            console.log(error)
            if (error.code == 'LIMIT_FILE_SIZE') {
                res.status(413).send({ "Error Message": "Upload Failed. File size too large" })
                return;
            }
            if (error) {
                res.status(500).send({ "Error Message": "Upload Failed. An error occured somewhere" })
                return;
            }
        }

        var imageDetails = {};
        imagepath = req.file.path.replace('\\', '/')
        imageDetails['path'] = imagepath
        imageDetails['movieid'] = movieid

        console.log(imageDetails)

        images.postMovieImage(imageDetails, (error, results) => {
            if (error) {
                res.status(500).send({ "Error Message": "Upload Failed. An error occured somewhere" })
                return;
            };

            console.log(results)
            res.status(201).send({ "Message": "Upload Successful" });
        }); //end of findbyid
    });
});


app.post("/users/:id/image/", (req, res, next) => {
    const userid = parseInt(req.params.id);
    uploaduser(req, res, function (error) {
        if (error) {
            console.log(error)
            if (error.code == 'LIMIT_FILE_SIZE') {
                res.status(500).send({ "Error Message": "Upload Failed. File size too large" })
                return;
            }
            if (error) {
                res.status(500).send({ "Error Message": "Upload Failed. An error occured somewhere" })
                return;
            }
        }

        var imageDetails = {};
        imagepath = req.file.path.replace('\\', '/')
        imageDetails['path'] = imagepath
        imageDetails['userid'] = userid

        console.log(imageDetails)

        images.postUserImage(imageDetails, (error, results) => {
            if (error) {
                res.status(500).send({ "Error Message": "Upload Failed. An error occured somewhere" })
                return;
            };

            console.log(results)
            console.log("DMSAIODNASOINDASOIDASOIN")
            res.status(201).send({ "Message": "Upload Successful" });
        }); //end of findbyid
    });
});



// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=    
// ██╗   ██╗███████╗███████╗██████╗ ███████╗
// ██║   ██║██╔════╝██╔════╝██╔══██╗██╔════╝
// ██║   ██║███████╗█████╗  ██████╔╝███████╗
// ██║   ██║╚════██║██╔══╝  ██╔══██╗╚════██║
// ╚██████╔╝███████║███████╗██║  ██║███████║
//  ╚═════╝ ╚══════╝╚══════╝╚═╝  ╚═╝╚══════╝
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// ENDPOINT 1
// POST A NEW USER
app.post("/users/", (req, res, next) => {

    users.postUser(req.body, (error, results) => {

        if (error) {// Error occurs because of duplicate entry             
            if (error.code === "ER_DUP_ENTRY") {
                res.status(422).send({ "Error": "The provided username already exists" });
                return;
            };
        };

        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };
        console.log(results.insertId)
        res.status(201).send({ "userid": `${results.insertId}` });
    });
});

// ENDPOINT 2
// GET ALL USERS
app.get("/users/", (req, res, next) => {
    users.findAllUsers((error, user) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return
        };  //end of if error
        res.status(200).send(user);
    }); //end of findall
}); //end of app

// ENDPOINT 3
// GET USER BY USERID
app.get("/users/:id/", (req, res, next) => {
    const userid = parseInt(req.params.id);
    // if id is not a number, send a 400.
    if (isNaN(userid)) {
        res.status(400).send();
        return;
    }

    users.findUserByID(userid, (error, user) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if user is not found.
        if (user === null) {
            res.status(404).send({ "Error": "User not found" });
            return;
        };
        res.status(200).send(user);
    }); //end of findbyid
}); //end of app

// ENDPOINT 4
// EDIT A USER DATA BY USERID
app.put("/users/:id/", (req, res, next) => {
    const userid = parseInt(req.params.id);
    users.editUserByID(userid, req.body, (error, results) => {

        if (error) {// Error occurs because of duplicate entry             
            if (error.code === "ER_DUP_ENTRY") {
                res.status(422).send({ "Error": "The new username already exists!" });
                return;
            };
        };

        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
        };
        console.log(results);
        res.status(204).send();
    });
});


// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//  ██████╗ ███████╗███╗   ██╗██████╗ ███████╗
// ██╔════╝ ██╔════╝████╗  ██║██╔══██╗██╔════╝
// ██║  ███╗█████╗  ██╔██╗ ██║██████╔╝█████╗  
// ██║   ██║██╔══╝  ██║╚██╗██║██╔══██╗██╔══╝  
// ╚██████╔╝███████╗██║ ╚████║██║  ██║███████╗
//  ╚═════╝ ╚══════╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// ENDPOINT 5
// POST A NEW GENRE
app.post("/genre/", (req, res, next) => {
    console.log(req.body)
    genre.postGenre(req.body, (error, results) => {

        if (error) {// Error occurs because of duplicate entry             
            if (error.code === "ER_DUP_ENTRY") {
                res.status(422).send(error.code);
                return;
            };
        };

        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };
        console.log(results)
        res.status(201).send({ "genreid": `${results.insertId}` });
    });
});

// ENDPOINT 6
// GET ALL GENRES
app.get("/genre/", (req, res, next) => {
    genre.findAllGenres((error, genre) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return
        };  //end of if error
        res.status(200).send(genre);
    }); //end of findall
}); //end of app

// GET GENRE USING GENREID
app.get("/genre/:id/", (req, res, next) => {
    const genreid = parseInt(req.params.id);
    // if id is not a number, send a 400.
    if (isNaN(genreid)) {
        res.status(400).send();
        return;
    }

    genre.findGenreByID(genreid, (error, genre) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if genre is not found.
        if (genre === null) {
            res.status(404).send({ "Error": "Genre not found" });
            return;
        };
        res.status(200).send(genre);
    }); //end of findbyid
}); //end of app

// GET MOVIES USING GENREID
app.get("/genre/:id/movie", (req, res, next) => {
    const genreid = parseInt(req.params.id);
    // if id is not a number, send a 400.
    if (isNaN(genreid)) {
        res.status(400).send();
        return;
    }

    genre.findMovieByGenreID(genreid, (error, movie) => {
        if (error) {
            res.status(500).send();
            return;
        };

        res.status(200).send(movie);
    }); //end of findbyid
}); //end of app

app.delete("/genre/:id", (req, res) => {
    const movieid = parseInt(req.params.id);
    console.log(movieid)
    if (isNaN(movieid)) {
        res.status(400).send();
        return;
    }
    genre.deleteGenreByMovie(movieid, (error, results) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if movie is not found.
        if (results.affectedRows == 0) {
            console.log(results)
            console.log(error)
            res.status(404).send({ "Error": "Genre not found" });
            return;
        };
        res.status(204).send({ "Message": "Genres deleted successfully" });
    }); //end of deletebyID
});

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ███╗   ███╗ ██████╗ ██╗   ██╗██╗███████╗
// ████╗ ████║██╔═══██╗██║   ██║██║██╔════╝
// ██╔████╔██║██║   ██║██║   ██║██║█████╗  
// ██║╚██╔╝██║██║   ██║╚██╗ ██╔╝██║██╔══╝  
// ██║ ╚═╝ ██║╚██████╔╝ ╚████╔╝ ██║███████╗
// ╚═╝     ╚═╝ ╚═════╝   ╚═══╝  ╚═╝╚══════╝
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// ENDPOINT 7
// POST NEW MOVIE
app.post("/movie/", (req, res, next) => {
    console.log(req)
    movie.postMovie(req.body, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };

        console.log(results)
        res.status(201).send({ "movieid": `${results.insertId}` });

    });
});

// ENDPOINT 8
// GET ALL MOVIES
app.get("/movie/", (req, res, next) => {
    movie.findAllMovies((error, movie) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return
        };  //end of if error
        res.status(200).send(movie);
    }); //end of findall
}); //end of app

// ENDPOINT 9
// GET MOVIE BY MOVIEID
app.get("/movie/:id/", (req, res, next) => {
    const movieid = parseInt(req.params.id);
    // if id is not a number, send a 400.
    if (isNaN(movieid)) {
        res.status(400).send();
        return;
    }

    movie.findMovieByID(movieid, (error, movie) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if movie is not found.
        if (movie === null) {
            res.status(404).send({ "Error": "Movie not found" });
            return;
        };

        movie["genres"] = movie["genres"].substring(1)
        res.status(200).send(movie);
    }); //end of findbyid
}); //end of app

// ENDPOINT 10
// DELETE MOVIE BY MOVIEID
app.delete("/movie/:id", (req, res) => {
    const movieid = parseInt(req.params.id);
    console.log(movieid)
    if (isNaN(movieid)) {
        res.status(400).send();
        return;
    }
    movie.deleteMovieByID(movieid, (error, results) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if movie is not found.
        if (results.affectedRows == 0) {
            console.log(results)
            console.log(error)
            res.status(404).send({ "Error": "Movie not found" });
            return;
        };
        res.status(204).send({ "Message": "Movie deleted successfully" });
    }); //end of deletebyID
});

// SEARCH MOVIE BY TYPE AND VALUE
app.get("/searched/:type/:val", (req, res, next) => {

    const searchtype = req.params.type;
    const searchvalue = req.params.val;

    const requestBody = {
        searchType: searchtype,
        searchValue: searchvalue
    };
    console.log(requestBody)

    movie.findMovieByTypeNValue(requestBody, (error, movie) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if movie is not found.
        if (movie === null) {
            res.status(404).send({ "Error": "Movie not found" });
            return;
        };

        res.status(200).send(movie);
    }); //end of findbyid
}); //end of app

// EDIT A MOVIE DATA BY MOVIEID
app.put("/movie/:id/", (req, res, next) => {
    const movieid = parseInt(req.params.id);


    movie.editMovieByID(movieid, req.body, (error, results) => {

        if (error) {// Error occurs because of duplicate entry             
            if (error.code === "ER_DUP_ENTRY") {
                res.status(422).send({ "Error": "The new movie already exists!" });
                return;
            };
        };

        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };
        console.log(results);
        res.status(204).send();
    });
});




// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// ██████╗ ███████╗██╗   ██╗██╗███████╗██╗    ██╗
// ██╔══██╗██╔════╝██║   ██║██║██╔════╝██║    ██║
// ██████╔╝█████╗  ██║   ██║██║█████╗  ██║ █╗ ██║
// ██╔══██╗██╔══╝  ╚██╗ ██╔╝██║██╔══╝  ██║███╗██║
// ██║  ██║███████╗ ╚████╔╝ ██║███████╗╚███╔███╔╝
// ╚═╝  ╚═╝╚══════╝  ╚═══╝  ╚═╝╚══════╝ ╚══╝╚══╝ 
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// ENDPOINT 11
// POST NEW REVIEW BY MOVIEID
app.post("/movie/:id/review/", isLoggedInMiddleware, (req, res, next) => {
    const reviewMovieID = parseInt(req.params.id);
    
    // IsLoggedInMiddleware
    if (req.body.userid !== req.decodedToken.user_id) {
        res.status(403).send();
        return;
    }

    console.log(req.body);
    req.body["movieid"] = reviewMovieID;
    review.postReview(req.body, (error, results) => {

        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };
        console.log(results)
        res.status(201).send({ "reviewid": `${results.insertId}` });
    });
});

// ENDPOINT 12
// GET REVIEWS BY MOVIEID
app.get("/movie/:id/reviews/", (req, res, next) => {
    const movieid = parseInt(req.params.id);

    if (isNaN(movieid)) {
        res.status(400).send();
        return;
    }

    review.findReviews(movieid, (error, movie) => {
        if (error) {
            res.status(500).send();
            return;
        };

        res.status(200).send(movie);
    }); //end of findbyid
}); //end of app

// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ████████╗██╗███╗   ███╗███████╗███████╗██╗      ██████╗ ████████╗███████╗
// ╚══██╔══╝██║████╗ ████║██╔════╝██╔════╝██║     ██╔═══██╗╚══██╔══╝██╔════╝
//    ██║   ██║██╔████╔██║█████╗  ███████╗██║     ██║   ██║   ██║   ███████╗
//    ██║   ██║██║╚██╔╝██║██╔══╝  ╚════██║██║     ██║   ██║   ██║   ╚════██║
//    ██║   ██║██║ ╚═╝ ██║███████╗███████║███████╗╚██████╔╝   ██║   ███████║
//    ╚═╝   ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝╚══════╝ ╚═════╝    ╚═╝   ╚══════╝
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

// ADVANCED 2
// GET TIMESLOTS BY MOVIEID
app.get("/movie/:id/timeslots/", (req, res, next) => {
    const movieid = parseInt(req.params.id);
    // if id is not a number, send a 400.
    if (isNaN(movieid)) {
        res.status(400).send();
        return;
    }

    timeslots.findTimeslotsByID(movieid, (error, movie) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if timeslot is not found.
        if (movie === null) {
            res.status(404).send({ "Error": "Timeslot not found" });
            return;
        };

        res.status(200).send(movie);
    }); //end of findbyid
}); //end of app

// POST NEW TIMESLOT
app.post("/movie/:id/timeslots/", (req, res, next) => {
    const movieid = parseInt(req.params.id);
    req.body["movieid"] = movieid
    timeslots.postNewTimeslot(req.body, (error, results) => {
        if (error) {
            console.log(error);
            res.status(500).send({ "Result": "Internal Error" });
            return;
        };
        console.log(results)
        res.status(201).send({ "timeslotid": `${results.insertId}` });
    });
});

// DELETE TIMESLOT BY TIMESLOTID
app.delete("/timeslots/:id/", (req, res) => {
    const timeslotid = parseInt(req.params.id);
    console.log(timeslotid)
    if (isNaN(timeslotid)) {
        res.status(400).send();
        return;
    }
    timeslots.deleteTimeslot(timeslotid, (error, results) => {
        if (error) {
            res.status(500).send();
            return;
        };

        // send a 404 if movie is not found.
        if (results == null) {
            console.log(results)
            console.log(error)
            res.status(404).send();
            return;
        };
        res.status(204).send();
    }); //end of deletebyID
});

module.exports = app;


// Form data

// {
//     "username":"Terry Tan",
//     "email":"terry@gmail.com",
//     "contact":"91234567",
//     "password":"abc123456",
//     "type":"Customer",
//     "profile_pic_url":"https://www.abc.com/terry.jpg"
// } 

// {
//     "genre": "Action",
//     "description": "the action genre has close ties to classic strife and struggle narratives that you find across all manner of art and literature"
// } 

// {
//     "userid":1,
//     "rating":5,
//     "review": "Good Movie, love the action"
// }

// {
//     "title": "A Quiet Place",
//     "description": " If they hear you, they hunt you. A family must live in silence to avoid mysterious creatures that hunt by sound. Knowing that even the slightest whisper or footstep can bring death, Evelyn and Lee are determined to find a way to protect their children while desperately searching for a way to fight back.",
//     "cast": "Emily Blunt, John Krasinski, Millicent Simmonds, Noah Jupe, Cade Woodward",
//     "genreid": "3,4,10",
//     "time": "90 mins",
//     "opening date":"9 Mar 2018"
// }

// {
//     "day":"2",
//     "starttime":"12:30:00",
//     "endtime":"15:00:00"
// } 


app.use('/css', express.static('public'))
app.use("/imagesforuser", express.static('imagesforuser'));
app.get("/", (req, res) => {
    res.sendFile("/public/home.html", { root: __dirname });
});

app.get("/movies/", (req, res) => {
    res.sendFile("/public/movies.html", { root: __dirname });
});

app.get("/movies/:id", (req, res) => {
    res.sendFile("public/movie.html", {root: __dirname})
})

app.get("/login/", (req, res) => {
    res.sendFile("/public/login.html", { root: __dirname });
});

app.get("/register/", (req, res) => {
    res.sendFile("/public/register.html", { root: __dirname });
});

app.get("/genres/", (req, res) => {
    res.sendFile("/public/genres.html", { root: __dirname });
});

app.get("/genres/:id", (req, res) => {
    res.sendFile("/public/genre.html", { root: __dirname });
});

app.get("/search/:type/:val", (req, res) => {
    res.sendFile("/public/search.html", { root: __dirname });
});

app.get("/admin", (req, res) => {
    res.sendFile("/public/admin.html", { root: __dirname });
});


app.post("/userlogin/", (req, res) => {
    users.verify(
        req.body.username,
        req.body.password,
        (error, user) => {
            if (error) {
                res.status(500).send();
                return;
            }
            if (user === null) {
                res.status(401).send();
                return;
            }
            console.log(user)
            console.log(user.type)

            const payload = { user_id: user.userid };
            jwt.sign(payload, JWT_SECRET, { algorithm: "HS256" }, (error, token) => {
                if (error) {
                    console.log(error);
                    res.status(401).send();
                    return;
                }
                res.status(200).send({
                    token: token,
                    user_id: user.userid,
                    userType: user.type
                });
            })
        });
});
