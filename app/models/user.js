var mongoose = require('../config/db');
var Q = require('q');
var bodyParser = require("body-parser");

/* User Schema */
var UserSchema = mongoose.Schema({
	// name: {
	// 	type: String,
	// 	index: true,
	// 	required: true
	// },
	first_name: {
		type: String
	},
	last_name: {
		type: String
	},
	// confirmPassword: {
	// 	type: String
	// }
});

var userModel = mongoose.model("User", UserSchema);

module.exports.createUser = function(data) {
	var deferred = Q.defer();
	console.log("req", data);
	var user = new userModel(data);
	user.save(function (err, result) {
        if (err) {           
            deferred.resolve({status: 'error'});
        } else {
        	deferred.resolve({ status: 'ok', insertId: result});
        }
                
    });
    return deferred.promise;

};
// module.exports = userModel;
