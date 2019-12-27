const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/users-model");
const Product = require("../models/products-model");
const path = require("path");

/*
 *
 * TODO: JWT Authentication to R/W Data
 *
 */

router.post("/fetchUserInfo", (req, res) => {
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

  User.find({}, "company totalTraps")
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

router.post("/fetchProductInfo", (req, res) => {
  let pageSkip = (req.body.pageNum - 1) * 6;
  let sortOrder = null;
  let query = {};
  let pageCount = null;
  switch (req.body.order) {
    case "AlphaUp":
      sortOrder = { company: "asc" };
      break;
    case "AlphaDown":
      sortOrder = { company: "desc" };
      break;
    case "AmountUp":
      sortOrder = { product_id: "asc" };
      break;
    case "AmountDown":
      sortOrder = { product_id: "desc" };
      break;
    case "Available":
      sortOrder = { product_id: "asc" };
      query = { company: "N/A" };
      break;
    case "Unavailable":
      sortOrder = { company: "asc" };
      query = { company: { $ne: "N/A" } };
      break;
  }

  Product.find(query, "product_id company")
    .sort(sortOrder)
    .skip(pageSkip)
    .limit(6)
    .then(async products => {
      await Product.countDocuments({}).then(count => {
        pageCount = {
          pageCount: Math.ceil(count / 6)
        };
      });
      products.push(pageCount);
      res.json(products);
    });
});

router.post("/addNewProduct", (req, res) => {
  let productInfo = req.body;

  for (let i = 0; i < productInfo.length; i++) {
    let curProductInfo = productInfo[i];
    Product.findOne({ product_id: curProductInfo[0] }, async product => {
      if (!product) {
        var product = new Product({
          product_id: curProductInfo[0],
          company: curProductInfo[1] === "NA" ? "N/A" : curProductInfo[1]
        });
        await product.save();
        if (curProductInfo[1] !== "NA") {
          mongoose.set("useFindAndModify", false);
          await User.findOneAndUpdate(
            { company: curProductInfo[1] },
            { $inc: { totalTraps: 1 } }
          );
        }
      }
    });
  }

  res.status(200).send();
});

router.post("/fetchCompanyInfo", (req, res) => {
  User.findOne({ company: req.body.company_name }, "username totalTraps").then(
    async companyInfo => {
      let allInfo = [];
      allInfo.push(companyInfo);
      await Product.find({ company: req.body.company_name }, "product_id").then(
        productInfo => {
          allInfo.push(productInfo);
        }
      );
      res.json(allInfo);
    }
  );
});

router.post("/AssignProduct", async (req, res) => {
  let companyName = req.body.company;
  let productArr = req.body.addNewNum.split(",");
  for (let i = 0; i < productArr.length; i++) {
    let _productArr = productArr[i].split("-");

    if (_productArr.length > 2 || _productArr.length < 1) {
      continue;
    }

    let num0 = parseInt(_productArr[0], 10);
    let num1 = parseInt(_productArr[1], 10);
    if (num0 > num1) {
      continue;
    }

    let j = num0;
    let size = _productArr.length === 1 ? j + 1 : num1 + 1;

    for (j; j < size; j++) {
      console.log(j);
      console.log(companyName);
      mongoose.set("useFindAndModify", false);
      await Product.findOneAndUpdate(
        { product_id: j },
        { company: companyName }
      );
      await User.findOneAndUpdate(
        { company: companyName },
        { $inc: { totalTraps: 1 } }
      );
    }
  }
  res.status(200).send();
});

module.exports = router;
