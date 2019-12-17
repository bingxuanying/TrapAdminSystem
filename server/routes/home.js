const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// get index page
router.get("/", (req, res, next) => {
  // res.render("index", {
  //   title: "My Application"
  // });
  res.status(200).send("welcome");
});

// POST login data
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then(user => {
      // Send token to user
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Password match
          const payload = {
            _id: user._id,
            username: user.username
          };
          let token = jwt.sign(payload, process.env.SECRECT_KEY, {
            expiresIn: "8h"
          });
          res.cookie("token", token, { httpOnly: true }).sendStatus(200);
        } else {
          // Password doesn't match
          res.json({ error: "Wrong password" });
        }
      } else {
        res.json({ error: "User doesn't exist" });
      }
    })
    .catch(err => res.send("err: " + err));
});

// POST register data
router.post(
  "/register",
  [
    check("username", "must be at least 5 - 10 chars long").isLength({
      min: 5,
      max: 10
    }),
    check("password", "must be at least 5 - 10 chars long")
      .isLength({
        min: 5,
        max: 10
      })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.reEnterPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      })
  ],
  (req, res) => {
    try {
      // validation check
      const errorFormatter = ({
        location,
        msg,
        param,
        value,
        nestedErrors
      }) => {
        return `[${param}]: ${msg}`;
      };

      var result = validationResult(req).formatWith(errorFormatter);

      if (!result.isEmpty()) {
        return res.json({
          errors: result.array()
        });
      } else {
        /*
       *
       * original *else* { xxx }
       *
       {
      // encrypt password
      await bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
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
    }
       */
        // check if user unique
        User.findOne(
          {
            username: req.body.username
          },
          async user => {
            if (!user) {
              // encrypt password
              await bcrypt.hash(
                req.body.password,
                10,
                async (err, hashedPassword) => {
                  if (err) throw err;

                  // save to DB
                  var user = new User({
                    username: req.body.username,
                    password: hashedPassword
                  });

                  const savedUser = await user.save();
                  console.log("register success");
                  res.json(savedUser);
                  // res.redirect("/");
                }
              );
            } else {
              res.json({
                error: "User already exists"
              });
            }
          }
        );
      }
    } catch (err) {
      console.error(err);
    }
  }
);

// ssesion
// passport.serializeUser((_id, done) => {
//   done(null, _id);
// });

// passport.deserializeUser((id, done) => {
//   User.findOne(id, (err, user) => {
//     done(err, user);
//   });
// });

// test
router.get("/trap", withAuth, function(req, res) {
  if (req.query.id) {
    res.send(`You have requested trap ID #${req.query.id}`);
  } else {
    res.send("You request a trap");
  }
});

router.get("/trap/:id", (req, res) => {
  res.send(`You have requested trap ID #${req.params.id}`);
});

// authentication middleware
function withAuth(req, res, next) {
  const token = req.cookies.token || req.body.token || req.query.token;

  if (!token) {
    res.status(401).send("Unauthorized: No token provided");
  } else {
    jwt.verify(token, process.env.SECRECT_KEY, function(err, decode) {
      if (err) {
        res.status(401).send("Unauthorized: Invalid token");
      } else {
        req.username = decode.username;
        next();
      }
    });
  }
}

module.exports = router;
