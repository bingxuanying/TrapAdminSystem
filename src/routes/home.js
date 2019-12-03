let express = require("express");
let router = express.Router();

// get index page
router.get("/", (req, res, next) => {
  res.render('index', {title:"My Application"})
})

// Post login data
router.post("/login", (req, res, next) => {
  res.json(req.body)
})

// Post register data
router.post("/register", (req, res, next) => {
  res.json(req.body)
})

// test
router.get("/trap", (req, res) => {
  if (req.query.id) {
    res.send(`You have requested trap ID #${req.query.id}`)
  } 
  else {
    res.send("You request a trap");
  }
});

router.get("/trap/:id", (req, res) => {
  res.send(`You have requested trap ID #${req.params.id}`)
})

module.exports = router;