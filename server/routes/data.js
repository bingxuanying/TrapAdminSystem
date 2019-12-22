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

const replaceCircular = (obj, level = 0, already = new WeakSet()) => {
  switch (typeof obj) {
    case "object":
      if (!obj) return obj;
      if (already.has(obj)) {
        return "CIRCULAR";
      }
      already.add(obj);
      const newObj = {};
      Object.keys(obj).forEach(key => {
        const val = replaceCircular(obj[key], level + 1, already);
        newObj[key] = val;
      });
      already.delete(obj);
      return newObj;
    default:
      return obj;
  }
};

module.exports = router;
