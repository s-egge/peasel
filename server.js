var path = require('path')
var express = require('express')
var fs = require('fs')

var app = express()
var port = process.env.PORT || 3000

//helper function to prevent reading microservice text file too early
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//send requested public files
app.use(express.static('public'))

//send homepage
app.get("/", function(req, res) {
    res.status(200).sendFile(path.join(__dirname, 'public/index.html'))

})

//get random color via microservice
app.get("/randomcolor", async function(req, res) {

    //write to the microservice text file
    fs.writeFile('randomColor.txt', "request", error => {
        if (error) throw error
    })

    //wait a few seconds for the microservice to do its job
    await sleep(2000);

    //read color supplied by microservice
    fs.readFile('randomColor.txt', 'utf8', function(error, color) {
        if (error) console.log('error', error);
        res.end(color);
    })
})

app.listen(port, function() {
    console.log("Listening on port", port)
})