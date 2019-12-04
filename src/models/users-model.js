const mongoose = require("mongoose");

var usersSchema = new mongoose.Schema({
   username: {
       type: String,
       require: true
   },
   password: {
       type: String,
       require: true
   }
});

module.exports = mongoose.model("User", usersSchema)