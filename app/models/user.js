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

var userModel = module.exports = mongoose.model("User", UserSchema);

module.exports.addUser = function(data) {

	var deferred = Q.defer();	
	var user = new userModel(data);

	user.save(function (err, result) {

		// Use resolve and reject when using .then and .catch in controller

        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', insertId: result});
        }
                
    });
    return deferred.promise;

};

module.exports.listUser = function(data) {

	var deferred = Q.defer();	
	var user = new userModel();

	user.find({},function (err, list) {
		console.log("list", list);
        // if (err) {           
        //     deferred.resolve({status: 'error'});
        // } else {
        // 	deferred.resolve({ status: 'ok', list: list});
        // }
                
    });
    return deferred.promise;

};
