const mongoose = require("mongoose");

var productsSchema = new mongoose.Schema({
  product_id: {
    type: Number,
    require: true
  },
  company: {
    type: String,
    require: true
  }
});

module.exports = mongoose.model("Product", productsSchema);
