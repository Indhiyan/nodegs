var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var router = express.Router();
var indexRoute = require('./app/routes');
var userRoute = require('./app/routes/user');
var pathConfig = require('./app/config/path-config');
var mongoose = require('./app/config/db');
var userModel = require('./app/models/user');

var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", function(callback) {
    console.log("Connection succeeded.");
});

var app = express();

/* BodyParser Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(pathConfig.publicDirPath));
// app.use(express.static('public'));

app.set("views", pathConfig.appDirPath +  "/views");
app.set('view engine', 'pug');

app.use('/', indexRoute);
app.use('/user', userRoute);

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});