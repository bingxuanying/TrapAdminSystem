let express = require("express");
let app = express();
let mongoose = require("mongoose");
require("dotenv/config");
let fs = require("fs");
let f = require("util").format;
let homeRoute = require("./routes/home");
let dateFormat = require("dateformat");
let bodyParser = require("body-parser")
let path = require("path");

app.use((req, res, next) => {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() - 8);
    var myDateFormat = dateFormat(myDate, "mm-dd-yyyy HH:MM:ss");
    console.log(`${myDateFormat} => ${req.originalUrl}`);
    next();
});

// server static files
app.use(express.static(path.join(__dirname, "../public")));

// for body parser
app.use(bodyParser.urlencoded({
    extended: true
}));

// routers
app.use("/", homeRoute);

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
let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.info(`Server on ${PORT}`);
});