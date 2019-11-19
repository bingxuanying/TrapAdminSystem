let express = require('express')
let router = express.Router()

router.get('/person', function(req, res) {
    if(req.query.name) {
        res.send(`You request a person ${req.query.name}`)
    }
    else{
        res.send('You request a person')
    }
})

router.get('/person/:name', function(req, res) {
    res.send(`You request a person ${req.params.name}`)
})

router.get('/error', function(req, res) {
    throw new Error("This is a forced error")
})
module.exports = router