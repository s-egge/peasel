var path = require('path')
var express = require('express')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 3000

//send requested public files
app.use(express.static('public'))

//send homepage
app.get("/", function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'))

})

app.listen(port, function() {
    console.log("Listening on port", port)
})