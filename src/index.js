let express = require("express")
let app = express()
let personRoute = require("./routes/person")
let dateFormat = require("dateformat")
let path = require("path")

app.use(function(req, res, next) {
    var myDate = new Date()
    myDate.setHours(myDate.getHours() - 8)
    var myDateFormat = dateFormat(myDate, "mm-dd-yyyy HH:MM:ss")
    console.log(`${myDateFormat} => ${req.originalUrl}`)
    next()
})
app.use(personRoute)
app.use(express.static("public"))

app.use(function(req, res, next) {
    res.status(404).send("You are LOST")
})

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.sendFile(path.join(__dirname, '../public/500.html'))
})

let PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.info(`Server on ${PORT}`)
})