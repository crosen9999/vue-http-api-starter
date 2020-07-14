///// configuration /////
const WEB_PORT = 8000
const API_PORT = 8001
const STATIC_DIR = "../public" // dev
//cont STATIC_DIR = "../dist"  // prod
const JWT_SECRET = "thisisthekey"

//////////////////////////  Web Static Assets /////////////////////////
const fs = require('fs')
const express = require("express");
const httpsW = require("https");

const appW = express();
appW.use(express.static(STATIC_DIR));

const key = fs.readFileSync(__dirname + '/server.key');
const cert = fs.readFileSync(__dirname + '/server.cert');

const options = {
    key: key,
    cert: cert
};

const serverW = httpsW.createServer(options, appW);

console.log("Starting Web server on port " + WEB_PORT);
serverW.listen(WEB_PORT)
console.log("Server started.")


//////////////////////////  API /////////////////////////
const db = require("./dbManager");
const app = require('express')();
const https = require('https');
const jwt = require('jsonwebtoken');
const cors = require('cors')        //solves cross-origin issue not solved by setting CORS header normally 
app.options('*', cors())

const server = https.createServer(
	    {
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
        },
        app
    );

console.log("Starting API server on port " + API_PORT);
server.listen(API_PORT);
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

//Login
app.post('/api/login', (req, res) => {
        const user = {id: '1', username: 'john'};
        jwt.sign({user: user}, JWT_SECRET, (err, token) => {
            res.json({token});
        });
    }
)

// Articles
app.get('/articles', checkForToken, function(req, res) {
    console.log("***********************************************");
    console.log("Getting articles");
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if(err) {
           res.sendStatus(403);
      } else {
            res.setHeader('Access-Control-Allow-Origin', '*');    
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
        }
    })    
});

//Article
app.options('*', cors())
app.get('/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    searchTerm = req.query.articleid;
    console.log("Searching for: " + searchTerm);
    res.setHeader('Access-Control-Allow-Origin', '*');
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if(err) {
           res.sendStatus(403);
        } else {
            db.getArticle(searchTerm)
                .then(rows => {
                    console.log("Processing result");
                    if (rows.length == 0) {
                        console.log("No data");
                        res.end('{"result": "no data"}');
                    }
                    else {
                        console.log("Data found for " + rows[0].ArticleID);
                        console.log(JSON.stringify(rows));
                        res.end(JSON.stringify(rows));
                    }
                })
                .catch(err => "Error from getAccount: " + err)
        }
    })
});
                 
//move this to helper functions
function checkForToken(req, res, next) {
    console.log("***************************************")
    console.log("Verifying token");
    const bearerHeader = req.headers['authorization'];
    if (typeof(bearerHeader) !== 'undefined'){
        const bearerToken = bearerHeader.split(' ')[1];
        console.log("Token found: " + bearerToken);
        req.token = bearerToken;
        next();
    } else{
        console.log("No token found.  Ending request with 403")
        res.sendStatus(403);
    }
}