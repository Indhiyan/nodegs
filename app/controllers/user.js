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

	this.getUser = function(req, res) {
		
		Q(userModel.getUser(req.params.id))
		.done(function (result) {
	    	if (result['status'] == 'ok') {
	    		var userDocs = result['userDocs'];
	    		console.log("userDocs", typeof userDocs);
				res.render('user/add', {userDocs: userDocs});

			} else {
				res.send('Model/Database error');
			}
		});
	},	

	this.listUser = function(req, res) {

		Q(userModel.listUser())
		.done(function (result) {
	    	if (result['status'] == 'ok') {
	    		var listData = result['userDocs'];
				res.render('user/list', {listData: listData});
			} else {
				res.send('Model/Database error');
			}
		});
	},

	this.deleteUser = function(req, res) {
		
		Q(userModel.deleteUser(req.params.id))
		.done(function (result) {
			console.log("result======result", result);
	    	if (result['status'] == 'ok') {	    		
				res.redirect('/user/list');
			} else {
				res.send('Model/Database error');
			}
		});
	},

	this.login = function(req, res) {

		Q(userModel.login(req.body))
		.done(function (result) {
			var loggedUser = result['userDocs'];
	    	if (result['status'] == 'ok' && loggedUser.length > 0) {
				res.redirect('/user/list');
			} else {
				res.send('Incorrect email or password!');
			}
		});
	}
}

module.exports = new userController;