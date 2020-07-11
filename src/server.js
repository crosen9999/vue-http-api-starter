var express = require("express");
var app = express();

app.use(express.static('dist'))

console.log("Starting server...");
app.listen(8000)
console.log("Server started.")


