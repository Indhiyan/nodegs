var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var userModel = require('../models/user');
var userController = require('../controllers/user');

// List all users
router.get('/list', function (req, res) {
	userController.listUser(req, res);
});

// Add form
router.get('/add', function (req, res) {
	res.render('user/add', {userDocs: ''});
});

// Add new user
router.post('/add', function (req, res) {
	userController.addUser(req, res);
});

// Edit user form
router.get('/edit/:id', function (req, res) {
	userController.getUser(req, res);
});

// Update existing user
router.post('/edit/:id', function (req, res) {
	userController.addUser(req, res);
});

// Delete user
router.get('/delete/:id', function (req, res) {
	userController.deleteUser(req, res);
});

// 400 page route.
router.get('/*', function (req, res) {
  res.render('400');
});


module.exports = router;