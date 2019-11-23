let express = require("express");
let router = express.Router();

router.get("/person", function (req, res) {
  if (req.query.name) {
    res.send(`You have requested ${req.query.name}`)
  } else {
    res.send("You request a person");
  }
});

router.get("/person/:name", function (req, res) {
  res.send(`You have requested ${req.param.name}`)
})

module.exports = router;