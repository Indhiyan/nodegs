'use strict';
var mongoose = require('../config/db');
var Q = require('q');
var bodyParser = require("body-parser");

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

module.exports.addUser = function(userReqData) {
	console.log("=============modedata==============", userReqData);
	var deferred = Q.defer();
	var userData = { name: userReqData.name, email: userReqData.email, password: userReqData.password }	
	var user = new userModel(userData);
	// var mode = 'Add';
	// // console.log("datadatadata", data);
	// userModel.find(data, function (err, checkUserDoc) {
	// 	if (err)
	// 		deferred.resolve({status: 'error'});

	// 	if (checkUserDoc.length > 0)
	// 		mode = 'Edit';
	// });
	// console.log("req.mode",mode);
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
		console.log("reqParams.params.id",userReqData.hidden_user_id);
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

		// Use resolve and reject when using .then and .catch in controller

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

	// userModel.find({}, {}, { limit: 4 }, function (err, list) {
	userModel.find({}, function (err, userDocs) {
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', userDocs: userDocs});
        }
                
    });
    return deferred.promise;

};
