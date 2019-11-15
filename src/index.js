let express = require("express")
let app = express()
let personRoute = require('./routes/person')

app.use(personRoute)
app.use(express.static('public'))

let PORT = process.env.PORT || 3000
app.listen(PORT, function() {
    console.info(`Server on ${PORT}`)
})