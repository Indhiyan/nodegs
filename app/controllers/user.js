var bodyParser = require("body-parser");
var mongoose = require('../config/db');
var userModel = require('../models/user');
var Q = require('q');

var userController = function(req, res){

	this.createUser = function(req, res){
		// console.log("userModel",req.body);
		Q(userModel.createUser(req.body))
		// .then(function (data) {
		//     // Do something with data
		// })
		// .catch(function (error) {
		//     // Handle any error from all above steps
		// })
		.done(function(result){
			console.log("userModelRES",result);
			if(result['status'] == 'ok'){
				res.redirect('list');
			}else{
				res.send(err);
			}
		})
		// var user = new userModel(req.body);
		// user.save(function (err) {
	 //        if (err) {
	 //            res.send(err);
	 //        }
	 //        res.redirect('list');
	 //    });
	}
}

module.exports = new userController;