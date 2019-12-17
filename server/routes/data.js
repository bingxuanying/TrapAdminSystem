const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users-model");

/*
 *
 * TODO: JWT Authentication to R/W Data
 *
 */

router.get("/fetchUserInfo", (req, res) => {
  User.find({}, "username company totalTraps").then(users => {
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
