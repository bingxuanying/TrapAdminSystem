const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const fs = require("fs");
const f = require("util").format;
const homeRoute = require("./routes/home");
const dateFormat = require("dateformat");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser')
const path = require("path");

const session = require("express-session");
const MongoStore = require('connect-mongo')(session);
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("./models/users-model");

app.use((req, res, next) => {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() - 8);
    var myDateFormat = dateFormat(myDate, "mm-dd-yyyy HH:MM:ss");
    console.log(`${myDateFormat} => ${req.originalUrl}`);
    next();
});

app.use(cookieParser());

// server static files
app.use(express.static(path.join(__dirname, "../public")));

// create session and initialize passport
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    // set to TRUE only when https
    // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// for body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

// routers
app.use("/", homeRoute);

// login authentication
passport.use(new LocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, (err, user) => {
            if (err) { done(err); }
            
            if (!user) { 
                done(null, false); 
            } else {
                const hash = user.password;
                bcrypt.compare(password, hash, (err, res) => {
                    if (res === true) {
                        return done(null, { _id: user._id });
                    } else {
                        return done(null, false);
                    }
                })
            }
        });
    }
));

// error handler
app.use((req, res, next) => {
    res.status(404).send("You are LOST");
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, "../public/500.html"));
});

// connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
)
.then(() => {
    console.log("DB connection successful");
})
.catch((err) => {
    throw err;
    console.error("DB connection error");
});

// setup the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.info(`Server on ${PORT}`);
});