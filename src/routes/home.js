let express = require("express");
let router = express.Router();

// get index page
router.get("/", function(req, res, next) {
  res.render('index', {title:"My Application"})
})

// Post login data
router.get("/login", function(req, res, next){
  res.json(req.body)
})

// Post register data
/*
TODO: transfer to register page
*/
router.get("/register", function(req, res, next) {
  res.send("WORKING")
})

// test
router.get("/trap", function (req, res) {
  if (req.query.id) {
    res.send(`You have requested trap ID #${req.query.id}`)
  } 
  else {
    res.send("You request a trap");
  }
});

router.get("/trap/:id", function (req, res) {
  res.send(`You have requested trap ID #${req.params.id}`)
})

module.exports = router;