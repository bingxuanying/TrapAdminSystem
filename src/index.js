const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const fs = require("fs");
const f = require("util").format;
const homeRoute = require("./routes/home");
const dateFormat = require("dateformat");
const bodyParser = require("body-parser");
const path = require("path");

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
app.use(express.urlencoded({
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.info(`Server on ${PORT}`);
});