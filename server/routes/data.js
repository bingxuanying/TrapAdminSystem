const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users-model");
const path = require("path");

/*
 *
 * TODO: JWT Authentication to R/W Data
 *
 */

router.post("/fetchUserInfo", (req, res) => {
  console.log(req.body);
  let pageSkip = (req.body.pageNum - 1) * 6;
  let sortOrder = null;
  let pageCount = null;
  switch (req.body.order) {
    case "AlphaUp":
      sortOrder = { company: "asc" };
      break;
    case "AlphaDown":
      sortOrder = { company: "desc" };
      break;
    case "AmountUp":
      sortOrder = { totalTraps: "asc" };
      break;
    case "AmountDown":
      sortOrder = { totalTraps: "desc" };
      break;
  }

  User.find({}, "username company totalTraps")
    .sort(sortOrder)
    .skip(pageSkip)
    .limit(6)
    .then(async users => {
      await User.countDocuments({}).then(count => {
        pageCount = {
          pageCount: Math.ceil(count / 6)
        };
      });
      users.push(pageCount);
      res.json(users);
    });
});

router.post("/addNewProduct", (req, res) => {
  let productInfo = req.body;

  for (key in productInfo) {
    console.log(key[key.length - 1], " => ", productInfo[key]);
  }

  res.status(200).send();
});

module.exports = router;
