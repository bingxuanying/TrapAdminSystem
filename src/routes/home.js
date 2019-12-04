const express = require("express");
const router = express.Router();
const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const initializePassport = require("../config/passport-config");
const passport = require("passport");

initializePassport(passport);

// get index page
router.get("/", (req, res, next) => {
  res.render('index', {title:"My Application"});
});

router.get("/home", (req, res, next) => {
  res.redirect("/");
});

// Post login data
router.post("/login", (req, res, next) => {
  res.json(req.body);
});

// Post register data
router.post("/register", async (req, res) => {
  try {
    var hashedPassword = await bcrypt.hash(req.body.password, 10);
    
    var user = new User({
      username: req.body.username,
      password: hashedPassword
    });
  
    const savedUser = await user.save()
    // res.json(savedUser);
    res.redirect("/");
  } catch(err) {
    console.error(err);
  }
});




// test
router.get("/trap", (req, res) => {
  if (req.query.id) {
    res.send(`You have requested trap ID #${req.query.id}`);
  } 
  else {
    res.send("You request a trap");
  }
});

router.get("/trap/:id", (req, res) => {
  res.send(`You have requested trap ID #${req.params.id}`);
});

module.exports = router;