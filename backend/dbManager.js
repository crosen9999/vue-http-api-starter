const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: 'localhost', 
    user:'nodejs', 
    password: 'db',
    connectionLimit: 5,
    database: 'dev'
});

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
                    console.log(err);
                    conn.release();
                })
            }).catch(err => {
                console.log("DB Connection error");
                conn.release();
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
                    console.log(err);
                    conn.release();
                })
            }).catch(err => {
                console.log("DB Connection error");
                conn.release();
            });
    })
}

module.exports.getAllArticles = getAllArticles;
module.exports.getArticle = getArticle;
