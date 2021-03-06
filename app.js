var express = require('express');
var path = require('path');
var bodyParser = require("body-parser");
var router = express.Router();
var flash = require('express-flash-messages');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var expressValidator = require('express-validator');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;

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
var sessionStore = new session.MemoryStore;
/* BodyParser Middleware */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(pathConfig.publicDirPath));
// app.use(express.static('public'));

app.set("views", pathConfig.appDirPath +  "/views");
app.set('view engine', 'pug');

app.use(cookieParser('secret'));
app.use(session({
    cookie: { maxAge: 60000 },
    store: sessionStore,
    saveUninitialized: true,
    resave: 'true',
    secret: 'secret'
}));
// if (app.get('env') === 'production') {
//   app.set('trust proxy', 1) // trust first proxy
//   sess.cookie.secure = true // serve secure cookies
// }
app.use(flash());
app.use(expressValidator());

/* Login authentication middleware - Start */
app.use(passport.initialize());
app.use(passport.session());
/* Login authentication middleware - Start */

// passport.serializeUser(function(user, done) {
//   	done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   	userModel.findById(id, function(err, user) {
//     	done(err, user);
//   	});
// });

// passport.use(new LocalStrategy({
// 	    usernameField: 'email',
// 	    passwordField: 'password'
// 	},
//   	function(username, password, done) {
// 	    userModel.findOne({ username: username }, function(err, user) {
// 	      	if (err) { return done(err); }
// 	      	if (!user) {
// 	        	return done(null, false, { message: 'Incorrect username.' });
// 	      	}
// 	      	if (!user.validPassword(password)) {
// 	        	return done(null, false, { message: 'Incorrect password.' });
// 	      	}
// 	      	return done(null, user);
// 	    });
//   	}
// ));

app.use('/', indexRoute);
app.use('/user', userRoute);

var server = app.listen(3000, function () {
    console.log('Node server is running..');
});