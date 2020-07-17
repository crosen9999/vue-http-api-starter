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

function updateArticle(articleID, articleName, articleText) {
    return new Promise( (res, rej) => {
        pool.getConnection()
            .then(conn => {
                console.log("Updated article name: " + articleName);
                conn.query("update Article set ArticleName = '" 
                    + articleName + "', ArticleText = '" 
                    + articleText + "' where ArticleID = " + articleID)
                    .then((rows) => {
                        console.log("Rows returned: " + rows.affectedRows);
                        res(rows);
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

function deleteArticle(articleID) {
    dbQueryString = `
                    DELETE
                    FROM article
                    WHERE ArticleID = ${articleID}
                    `
    return new Promise( (res, rej) => {
        pool.getConnection()
            .then(conn => {
                console.log("Deleting article with ID: " + articleID);
                conn.query(dbQueryString)
                    .then((rows) => {
                        console.log("Rows returned: " + rows.affectedRows);
                        res(rows);
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

function addArticle(articleName, articleText) {
    dbQueryString = `
                    INSERT
                    INTO article (ArticleName, ArticleText)
                    VALUES ("${articleName}", "${articleText}")
                    `
    console.log(dbQueryString);
    return new Promise( (res, rej) => {
        pool.getConnection()
            .then(conn => {
                console.log("Updated article name: " + articleName);
                conn.query(dbQueryString)
                    .then((rows) => {
                        console.log("Rows returned: " + rows.affectedRows);
                        res(rows);
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
module.exports.updateArticle = updateArticle;
module.exports.addArticle = addArticle;
module.exports.deleteArticle = deleteArticle;