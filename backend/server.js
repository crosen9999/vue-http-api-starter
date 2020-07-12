///// configuration /////
webPort = 8000
APIPort = 8001
staticDir = "../public" // dev
//staticDir = "../dist"  // prod

//////////////////////////  Web Static Assets /////////////////////////
var expressW = require("express");
var appW = expressW();

appW.use(expressW.static(staticDir))

console.log("Starting Web server on port " + webPort);
appW.listen(webPort)
console.log("Server started.")


//////////////////////////  API /////////////////////////
const db = require("./dbManager");
const app = require('express')();
const http = require('http');
const server = http.Server(app);

console.log("Starting API server on port " + APIPort);
server.listen(APIPort);
console.log("Server started.")

// DEBUG End Point
counter=1;
charIndex = 65;
app.get('/debug', function(req, res) {
    if (charIndex > 75) charIndex = 65;
    letter = String.fromCharCode(charIndex);
    output = `{"NextItem": "${letter}"}`;
    console.log("Sending: " + output);
    res.writeHead(200, {'ContentType': 'text/html'});
    res.end(output);
    charIndex++;
});

// Article
app.get('/articles', function(req, res) {
    console.log("***********************************************");
    console.log("Getting articles");
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');    
    res.writeHead(200, {'ContentType': 'text/html'});
    db.getAllArticles()
        .then(rows => {
            console.log("Processing result");
            if (rows.length == 0) {
                console.log("No data");
                res.end('{"result": "no data"}');
            }
            else {
                console.log("Data found for article " + rows[0].ArticleID);
                console.log(JSON.stringify(rows));
                res.end(JSON.stringify(rows));
            }
        })
        .catch(err => "Error from getAllArticles: " + err)

});