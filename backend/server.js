///// configuration /////
const WEB_PORT = 8000
const API_PORT = 8001
const STATIC_DIR = "../public" // dev
//cont STATIC_DIR = "../dist"  // prod
const JWT_SECRET = "thisisthekey"

//////////////////////////  Web Static Assets /////////////////////////
const fs = require('fs')
const expressW = require("express");
const httpsW = require("https");

const appW = expressW();
appW.use(expressW.static(STATIC_DIR));

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
const express = require('express');
const https = require('https');
const jwt = require('jsonwebtoken');
const cors = require('cors')        //solves cross-origin issue not solved by setting CORS header normally 

app = express();
app.options('*', cors())
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

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
app.get('/api/login', (req, res) => {
    console.log("***********************************************");
    console.log("Login");
    res.setHeader('Access-Control-Allow-Origin', '*');
    const user = {userID: '1', userName: 'john'};
    jwt.sign(user, JWT_SECRET, (err, token) => {
        res.json(token);
    });
})

// generic get handler
function handleDBGet(dbFunction, iParams, req, res){
    console.log("***********************************************");
    console.log("Start generic handler");
    res.setHeader('Access-Control-Allow-Origin', '*');
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        console.log("Verified for user: " + authData.userID);
        if(err) {
            console.log("Invalid JWT");
            res.sendStatus(403);
      } else {
            res.writeHead(200, {'ContentType': 'text/html'});
            dbFunction(... iParams)
                .then(rows => {
                    console.log("Processing result");
                    if (rows.length == 0) {
                        console.log("No data");
                        res.end('{"result": "no data"}');
                    }
                    else {
                        console.log("Data found");
                        console.log(JSON.stringify(rows));
                        res.end(JSON.stringify(rows));
                    }
                })
                .catch(err => "*** Error from dbFunction: " + err)  
                .finally(console.log("Back from DB call"));          
        }
    })     
}

// Articles
app.get('/api/articles', checkForToken, function(req, res) {
    console.log("***********************************************");
    console.log("Getting articles");
    handleDBGet(db.getAllArticles, [], req, res)
});

//Article
app.get('/api/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    console.log("Getting article");
    searchTerm = req.query.articleid;
    handleDBGet(db.getArticle, [searchTerm], req, res);
});

//Article update
app.post('/api/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    //console.log("body: " + JSON.stringify(req.body));
    console.log("Saving article for: " + req.body.ArticleID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'ContentType': 'text/html'});    
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if(err) {
           res.sendStatus(403);
        } else {
            db.updateArticle(req.body.ArticleID, req.body.ArticleName, req.body.ArticleText)
                .then(dbres => {
                    console.log("DB rows affected: " + dbres.affectedRows);
                    if (dbres.affectedRows == 1) {
                        console.log("DB success: " + JSON.stringify(dbres));
                        res.end("0");
                    }
                    else {
                        console.log("DB error: wrong number rows affected");
                        res.end("-1");
                    }
                })
                .catch(err => "*** Error from getAccount: " + err)
                .finally(console.log("Back from getArticle()"));
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