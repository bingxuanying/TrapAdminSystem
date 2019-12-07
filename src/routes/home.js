const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const {check, validationResult} = require("express-validator");

// initializePassport(passport, email => {
  
// });

// get index page
router.get("/", (req, res, next) => {
  res.render('index', {title:"My Application"});
});


// POST login data
router.post("/login", passport.authenticate(
  "local", {
  successRedirect: "/trap",
  failureRedirect: "/trap/wrongTrap"
}));

// POST register data
router.post("/register", [
  check("username", "must be at least 5 - 10 chars long")
        .isLength({ min: 5, max: 10 }),
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
], (req, res) => {
  try {
    // validation check
    const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
      return `[${param}]: ${msg}`;
    };
    
    var result = validationResult(req).formatWith(errorFormatter);
    
    if (!result.isEmpty()) {
      return res.json({ errors: result.array() });
    } else {
      // check if user unique
      User.findOne({ username: req.body.username }, async (user) => {
        if (!user) {
          // encrypt password
          await bcrypt.hash(
            req.body.password, 10, 
            async (err, hashedPassword) => {
            if(err)
              throw err;
            
            // save to DB
            var user = new User({
              username: req.body.username,
              password: hashedPassword
            });
          
            const savedUser = await user.save();
            console.log("register success");
            res.json(savedUser);
            // res.redirect("/");
          });
        } else {
          res.json({error: "User already exists"});
        }
      })
    }
  } catch(err) {
    console.error(err);
  }
});


// ssesion
passport.serializeUser((_id, done) => {
  done(null, _id);
});

passport.deserializeUser((id, done) => {
  User.findOne(id, (err, user) => {
    done(err, user);
  });
});

// test
router.get("/trap", authenticationMiddleware(), (req, res) => {
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



// authentication middleware
function authenticationMiddleware() {
  return (req, res, next) => {
    console.log(`
        req.session.passport.user: ${JSON.
        stringify(req.session.passport)}`);
        
    if (req.isAuthenticated()) return next();
    
    res.redirect('/')
  }
}

module.exports = router;