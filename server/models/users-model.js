const mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  company: {
    type: String,
    require: false
  },
  totalTraps: {
    type: Number,
    require: false
  }
});

module.exports = mongoose.model("User", usersSchema);
