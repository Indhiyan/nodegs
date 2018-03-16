var bodyParser = require("body-parser");
var flash = require('express-flash-messages');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('../config/db');
var userModel = require('../models/user');
var Q = require('q');
var expressValidator = require('express-validator');

var userController = function(req, res) {

	this.addUser = function(req, res, gateway = '') {

		// We can also use, check Model - addUser
		// Q(userModel.addUser(req.body))
		// .then(function (result) {
		//     console.log("res",result);
		// })
		// .catch(function (err) {
		//     console.log("err",err);
		// });

		req.checkBody('name', 'Name is required').notEmpty();
		req.checkBody('email', 'Incorrect Email').isEmail();
		req.checkBody('password', 'Password is required').notEmpty();
		// req.checkBody('photo', 'Photo is required').notEmpty();

		var errors = req.validationErrors();

		if (errors) {
	      	req.session.errors = errors;
	      	req.session.success = false;
	      	var renderTemplate = 'register';

	      	if (gateway != 'register')	 
	      		renderTemplate  = 'user/add';

	      	res.render(renderTemplate, { success: req.session.success, errors: req.session.errors , userDocs:''});
	   	} else {
		    req.session.success = true;

		    Q(userModel.addUser(req, res))
			.done(function (result) {
		    	if (result['status'] == 'ok') {
		    		if (!req.body.hidden_user_id)
		    			req.flash('success', 'User created successfully!');
		    		else
		    			req.flash('success', 'User updated successfully!');
				} else {
					req.flash('error', 'Model/Database error! Please try again');
				}
				res.redirect('list');
			});
	   	}
		
	},

	this.getUser = function(req, res) {
		
		Q(userModel.getUser(req.params.id))
		.done(function (result) {
	    	if (result['status'] == 'ok') {
	    		var userDocs = result['userDocs'];
				res.render('user/add', {userDocs: userDocs});
			} else {
				res.render('user/add', {userDocs: ''});
				req.flash('error', 'Model/Database error! Please try again');
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
				req.flash('error', 'Model/Database error! Please try again');
				res.render('user/list', {listData: ''});
			}
		});
	},

	this.deleteUser = function(req, res) {
		
		Q(userModel.deleteUser(req.params.id))
		.done(function (result) {
	    	if (result['status'] == 'ok') {	    
	    		req.flash('error', 'User deleted successfully!');		
			} else {
				req.flash('error', 'Model/Database error! Please try again');
			}
			res.redirect('/user/list');
		});
	},

	this.login = function(req, res) {

		Q(userModel.login(req.body))
		.done(function (result) {
			var loggedUser = result['userDocs'];
	    	if (result['status'] == 'ok' && loggedUser.length > 0) {
	    		req.flash('success', 'You have successfully logged!');
				res.redirect('/user/list');
			} else {
				req.flash('error', 'Incorrect email or password!');
				res.redirect('/login');
			}
		});
	}
}

module.exports = new userController;