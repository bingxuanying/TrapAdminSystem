const express = require("express");
const router = express.Router();
const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport-config");
const {check, validationResult} = require("express-validator");

// initializePassport(passport, email => {
  
// });

// get index page
router.get("/", (req, res, next) => {
  res.render('index', {title:"My Application"});
});

router.get("/home", (req, res, next) => {
  res.redirect("/");
});

// POST login data
router.post("/login", (req, res, next) => {
  res.json(req.body);
});

// POST register data
router.post("/register", [
  check("username", "must be at least 5 - 10 chars long").isLength({ min: 5, max: 10 }),
  check("password", "must be at least 5 - 10 chars long")
        .isLength({ min: 5, max: 10 })
        .custom((value, { req, loc, path }) => {
            if (value !== req.body.reEnterPassword) {
                // trow error if passwords do not match
                throw new Error("Passwords don't match");
            } else {
                return value;
            }
        })
], async (req, res) => {
  try {
    // validation check
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `[${param}]: ${msg}`;
    };
    var result = validationResult(req).formatWith(errorFormatter);
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    } else {
      // encrypt password
      await bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if(err)
          throw err;
        
        // save to DB
        var user = new User({
          username: req.body.username,
          password: hashedPassword
        });
      
        const savedUser = user.save();
        res.json(savedUser);
        // res.redirect("/");
      });
    }
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