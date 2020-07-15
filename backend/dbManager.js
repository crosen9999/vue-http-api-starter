const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'nodejs', 
    password: 'db',
    connectionLimit: 5,
    database: 'dev'
});

function validateUser(userID, password) {
    return new Promise( (res, rej) => {
        res({userID: "123", userName: "John"});
    });
}

function getAllArticles() {
    return new Promise( (res, rej) => {
        pool.getConnection()
            .then(conn => {              
                conn.query("select * from Article")
                    .then((rows) => {
                        console.log("Rows returned: " + rows.length);
                        res(rows);
                        console.log("Connection state: " + conn.state);
                        conn.release();
                })
                .catch(err => {
                    console.log("*** Query did not execute: " + err);
                    conn.release();
                    rej("Query did not execute");
                })
            }).catch(err => {
                console.log("DB Connection error");
                conn.release();
                rej("DB Connection error");
            });
    })
}

function getArticle(ArticleID) {
    return new Promise( (res, rej) => {
        pool.getConnection()
            .then(conn => {              
                conn.query("select * from Article where ArticleID = " + ArticleID)
                    .then((rows) => {
                        console.log("Rows returned: " + rows.length);
                        res(rows);
                        console.log("Connection state: " + conn.state);
                        conn.release();
                })
                .catch(err => {
                    console.log("DB Query Error: " + err);
                    conn.release();
                    rej("Query did not execute");
                })
            }).catch(err => {
                console.log("DB Connection error");
                conn.release();
                rej("DB Connection error");
            });
    })
}

module.exports.validateUser = validateUser;
module.exports.getAllArticles = getAllArticles;
module.exports.getArticle = getArticle;
