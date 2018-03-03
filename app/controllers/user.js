var bodyParser = require("body-parser");
var mongoose = require('../config/db');
var userModel = require('../models/user');
var Q = require('q');

var userController = function(req, res) {

	this.addUser = function(req, res) {

		// We can also use, check Model - addUser
		// Q(userModel.addUser(req.body))
		// .then(function (result) {
		//     console.log("res",result);
		// })
		// .catch(function (err) {
		//     console.log("err",err);
		// });

		Q(userModel.addUser(req.body))
		.done(function (result) {
	    	if (result['status'] == 'ok') {
				res.redirect('list');
			} else {
				res.send('Model/Database error');
			}
		});
	},

	this.listUser = function(req, res) {

		Q(userModel.listUser())
		.done(function (result) {
			console.log("result", result);
	    	if (result['status'] == 'ok') {
				res.redirect('list');
			} else {
				res.send('Model/Database error');
			}
		});
	}
}

module.exports = new userController;