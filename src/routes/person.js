let express = require('express')
let router = express.Router()

router.get('/person', function(req, res) {
    res.send('You request a person')
})

module.exports = router