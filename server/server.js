const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");
const fs = require("fs");
const f = require("util").format;
const homeRoute = require("./routes/home");
const dataRoute = require("./routes/data");
const dateFormat = require("dateformat");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");

app.use((req, res, next) => {
  var myDate = new Date();
  myDate.setHours(myDate.getHours() - 8);
  var myDateFormat = dateFormat(myDate, "mm-dd-yyyy HH:MM:ss");
  console.log(`${myDateFormat} => ${req.originalUrl}`);
  next();
});

app.use(cookieParser());

// server static files
// app.use(express.static(path.join(__dirname, "../client/build")));

// connect to DB
mongoose
  .connect(process.env.DB_CONNECTION, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    // throw err;
    console.error("DB connection error");
  });

// for body parser
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// routes
app.use("/", homeRoute);
app.use("/data", dataRoute);

// error handler
app.use((req, res, next) => {
  res.status(404).send("You are LOST");
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.sendFile(path.join(__dirname, "./public/500.html"));
});

// setup the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.info(`Server on ${PORT}`);
});
