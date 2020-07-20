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
const { request } = require('http')
const { response } = require('express')
const { execFile } = require('child_process')

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
app.get('/debug', function(req, res) {
    console.log("***********************************************");
    console.log("DB Add")
    //db.updateArticle(req.body.ArticleID, req.body.ArticleName, req.body.ArticleText)
    db.addArticle("x", "y")
    .then(dbres => {
        console.log("DB rows affected: " + dbres.affectedRows);
        if (dbres.affectedRows == 1) {
            console.log("DB success: " + JSON.stringify(dbres));
            res.end(JSON.stringify(dbres))
        }
        else {
            console.log("DB error: wrong number rows affected");
            res.end(dbres)
        }
    })
    .catch(err => "*** Error from getAccount: " + err)
    .finally(console.log("Back from getArticle()"));
});

/***************************************************
Create User
***************************************************
Input params as form vars:
    UserName
    Password

Behavior:
    Adds record to user table

Returns:
    On success, returns JWT
    On error, returns {error: ERR_MESSAGE}
    where ERR_MESSAGE is:
        DUPLICATE   if UserName already exists
        UNKNOWN     for any other error
*/
app.post('/api/createuser', (req, res) => {
    console.log("***********************************************");
    console.log("Creating user for: " + req.body.UserName + "/" + req.body.Password);
    res.setHeader('Access-Control-Allow-Origin', '*');

    UserName = req.body.UserName;
    Password = req.body.Password;

    db.addUser(UserName, Password)
    .then(dbres => {
        console.log("User created with UserID " + dbres.insertId);
        const user = {userID: dbres.insertId, userName: UserName};
        jwt.sign(user, JWT_SECRET, (err, token) => {
            console.log("token = " + token)
            res.json(token);
            res.end();
        })
    })
    .catch(err => {
        if (err == "DUPLICATE") {
            res.json({error: "DUPLICATE"})
        }else {
            res.json({error: "UNKNOWN"})
        }
    })
    .finally(console.log("Back from addUser()"));
})

//Login
app.post('/api/login', (req, res) => {
    console.log("***********************************************");
    console.log("Login");
    res.setHeader('Access-Control-Allow-Origin', '*');
    const user = {userID: '1', userName: 'john'};
    console.log("Sending signed token for " + user.userName);
    jwt.sign(user, JWT_SECRET, (err, token) => {
        res.json(token);
        res.end();
    });
})

// generic get handler
function handleDBGet(dbFunction, iParams, req, res){
    console.log("***********************************************");
    console.log("Start generic handler for dbFunction = " + dbFunction.name);
    res.setHeader('Access-Control-Allow-Origin', '*');
    jwt.verify(req.token, JWT_SECRET, (err, decoded) => {
        console.log(JSON.stringify(decoded))
        CurrentUserID = decoded.userID;
        console.log("Verified for user: " + CurrentUserID);
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
                        console.log(JSON.stringify(rows).substring(0,50));
                        res.end(JSON.stringify(rows));
                    }
                })
                .catch(err => "console.log(*** Error from dbFunction: " + err)  
                .finally(console.log("Back from DB call"));          
        }
    })     
}

// Articles GET
app.get('/api/articles', checkForToken, function(req, res) {
    console.log("***********************************************");
    console.log("Getting articles");
    handleDBGet(db.getAllArticles, [], req, res)
});

//Article GET
app.get('/api/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    console.log("Getting article");
    searchTerm = req.query.articleid;
    handleDBGet(db.getArticle, [searchTerm], req, res);
});

//Article PUT
app.put('/api/article', checkForToken, function(req, res) {
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
                .catch(err => "*** Error from updateArticle: " + err)
                .finally(console.log("Back from updateArticle()"));
        }
    })
});

//Article DEL
app.delete('/api/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    //console.log("body: " + JSON.stringify(req.body));
    console.log("Deleting article: " + req.body.ArticleID);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'ContentType': 'text/html'});    
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if(err) {
           res.sendStatus(403);
        } else {
            db.deleteArticle(req.body.ArticleID)
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
                .catch(err => "*** Error from deleteArticle: " + err)
                .finally(console.log("Back from deleteArticle()"));
        }
    })
});

//Article POST
app.post('/api/article', checkForToken, function(req, res) {
    console.log("***********************************************");
    //console.log("body: " + JSON.stringify(req.body));
    console.log("Adding article");
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, {'ContentType': 'text/html'});    
    jwt.verify(req.token, JWT_SECRET, (err, authData) => {
        if(err) {
           res.sendStatus(403);
        } else {
            db.addArticle(req.body.ArticleName, req.body.ArticleText)
                .then(dbres => {
                    console.log("DB rows affected: " + dbres.affectedRows);
                    if (dbres.affectedRows == 1) {
                        console.log("DB success: " + JSON.stringify(dbres));
                    }
                    else {
                        console.log("DB error: wrong number rows affected");
                    }
                    res.end(JSON.stringify(dbres));
                })
                .catch(err => "*** Error from getAccount: " + err)
                .finally(console.log("Back from addArticle()"));
        }
    })
});

//move this to helper functions
function checkForToken(req, res, next) {
    console.log("*************************************************")
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