let express = require("express");
let app = express();
let homeRoute = require("./routes/home");
let dateFormat = require("dateformat");
let path = require("path");

app.use(function (req, res, next) {
    var myDate = new Date();
    myDate.setHours(myDate.getHours() - 8);
    var myDateFormat = dateFormat(myDate, "mm-dd-yyyy HH:MM:ss");
    console.log(`${myDateFormat} => ${req.originalUrl}`);
    next();
});

// server static files
app.use(express.static(path.join(__dirname, "../public")));

//routers
app.use("/", homeRoute);

// error handler
app.use(function (req, res, next) {
    res.status(404).send("You are LOST");
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.sendFile(path.join(__dirname, "../public/500.html"));
});

//seting up the server
let PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.info(`Server on ${PORT}`);
});