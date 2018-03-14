'use strict';
var mongoose = require('../config/db');
var Q = require('q');
var bodyParser = require("body-parser");
var flash = require('express-flash-messages');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* User Schema */
var UserSchema = mongoose.Schema({
	name: {
		type: String,
		index: true,
		required: true
	},
	email: {
		type: String,
		email: true,
		required: true
	},
	password: {
		type: String,
		email: true,
		required: true
	}
});

var userModel =  mongoose.model("User", UserSchema);

/* Login authentication - Start */

passport.serializeUser(function(user, done) {
  	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  	userModel.findById(id, function(err, user) {
    	done(err, user);
  	});
});

passport.use(new LocalStrategy({
	    usernameField: 'email',
	    passwordField: 'password'
	},

  	function(username, password, done) {

	    userModel.findOne({ email: username, password: password }, function(err, user) {
	      	if (err) { return done(err); }
	      	if (!user) {
	        	return done(null, false, { message: 'Incorrect username or password.' });
	      	}
	      	// if (!user.validPassword(password)) {
	       //  	return done(null, false, { message: 'Incorrect password.' });
	      	// }
	      	return done(null, user);
	    });
  	}
));

/* Login authentication - End */

module.exports.addUser = function(userReqData) {
	
	var deferred = Q.defer();
	var userData = { name: userReqData.name, email: userReqData.email, password: userReqData.password }	
	var user = new userModel(userData);
	
	if (!userReqData.hidden_user_id) {
		user.save(function (err, userDocs) {

			// Use resolve and reject when using .then and .catch in controller

	        if (err) {           
	            deferred.resolve({status: 'error'});
	        } else {
	        	deferred.resolve({ status: 'ok', userDocs: userDocs});
	        }	                
	    });
	} else {
		
		userModel.findByIdAndUpdate(userReqData.hidden_user_id, userData, {new: true}, function (err, userDocs) {

			// Use resolve and reject when using .then and .catch in controller

	        if (err) {           
	            deferred.resolve({status: 'error'});
	        } else {
	        	deferred.resolve({ status: 'ok', userDocs: userDocs});
	        }	                
	    });
	}

    return deferred.promise;

};

module.exports.getUser = function(id) {

	var deferred = Q.defer();
	userModel.findById(id, function (err, userDocs) {
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', userDocs: userDocs});
        }                
    });

    return deferred.promise;
};

module.exports.listUser = function() {

	var deferred = Q.defer();
	userModel.find({}, function (err, userDocs) {
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', userDocs: userDocs});
        }                
    });

    return deferred.promise;
};

module.exports.deleteUser = function(id) {
	
	var deferred = Q.defer();		
	userModel.findByIdAndRemove(id, function (err, listData) {
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', listData: ''});
        }                
    });

    return deferred.promise;
};

module.exports.login = function(userReqData) {
	
	var deferred = Q.defer();
	var userData = { email: userReqData.email, password: userReqData.password }	

	userModel.find(userData, function (err, userDocs) {		
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', userDocs: userDocs});
        }	                
    });

    return deferred.promise;

};

module.exports.userModel = userModel;
