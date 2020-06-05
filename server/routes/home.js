const express = require("express");
const router = express.Router();
const path = require("path");
const mongoose = require("mongoose");
const User = require("../models/users-model");
const bcrypt = require("bcrypt");
const passport = require("passport");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv/config");

// get index page
router.get("/", (req, res, next) => {
  // res.status(200).sendFile(path.join(__dirname, "build", "index.html"));
});

router.get("/jwtAuth", (req, res) => {
  var token = req.cookies.token;
  jwt.verify(token, process.env.SECRECT_KEY, (err, verifiedJwt) => {
    if (err) {
      res.status(401).json({ err: err.message });
    } else {
      var adminList = process.env.ADMINISTRATOR_LIST.split(",");
      var jwtRole = adminList.includes(verifiedJwt.username)
        ? "administrator"
        : "user";
      res.status(200).json({ role: jwtRole });
    }
  });
});

// POST login data
router.post("/login", (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      // Send token to user
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          // Password match
          const payload = {
            _id: user._id,
            username: user.username,
          };
          var token = jwt.sign(payload, process.env.SECRECT_KEY, {
            expiresIn: "12h",
          });

          var adminList = process.env.ADMINISTRATOR_LIST.split(",");
          var loginRole = adminList.includes(user.username)
            ? "administrator"
            : "user";

          res
            .status(200)
            .cookie("token", token, { httpOnly: true })
            .json({ role: loginRole });
        } else {
          // Password doesn't match
          res.status(401).json({ err: "Wrong password" });
        }
      } else {
        res.status(401).json({ err: "User doesn't exist" });
      }
    })
    .catch((err) => res.send("err: " + err));
});

// POST register data
router.post(
  "/register",
  [
    check("username", "must be at least 5 - 10 chars long").isLength({
      min: 5,
      max: 10,
    }),
    check("password", "must be at least 5 - 10 chars long")
      .isLength({
        min: 5,
        max: 10,
      })
      .custom((value, { req, loc, path }) => {
        if (value !== req.body.reEnterPassword) {
          // trow error if passwords do not match
          throw new Error("Passwords don't match");
        } else {
          return value;
        }
      }),
  ],
  (req, res) => {
    try {
      // validation check
      const errorFormatter = ({
        location,
        msg,
        param,
        value,
        nestedErrors,
      }) => {
        return `${param}: ${msg}`;
      };

      var result = validationResult(req).formatWith(errorFormatter);

      console.log(result.array());
      if (!result.isEmpty()) {
        res.status(406).json({
          errors: result.array(),
        });
      } else {
        // check if user unique
        User.findOne(
          {
            username: req.body.username,
          },
          async (user) => {
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
                    password: hashedPassword,
                  });

                  const savedUser = await user.save();
                  console.log("register success");
                  res.status(201).json(savedUser);
                  // res.redirect("/");
                }
              );
            } else {
              res.status(403).json({
                error: "User already exists",
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

// test
router.get("/trap", withAuth, function (req, res) {
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
    jwt.verify(token, process.env.SECRECT_KEY, function (err, decode) {
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
