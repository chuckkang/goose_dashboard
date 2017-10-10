var express = require("express");
var ejd = require("ejs");
var bodyParser = require("body-parser");
var path = require("path");
// var session = require("express-session");

var app = express();
// app.use(session({ secret: 'codingdojorocks' }));
app.use(bodyParser.urlencoded({ extended: true }));
//static content
app.use(express.static(path.join(__dirname, "./static")));
//setup views folder
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

var server = app.listen(8000, function () {
	console.log("listening on port 8000");
});

var route = require("./routes/routes.js")(app, server);