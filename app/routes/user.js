var express = require('express');
var router = express.Router();
var bodyParser = require("body-parser");
var userModel = require('../models/user');
var userController = require('../controllers/user');

// Home page route.
router.get('/list', function (req, res) {
	// res.render('user/list');
	userController.listUser(req, res);
});

// Add page route.
router.get('/add', function (req, res) {
	res.render('user/add', {userDocs: ''});
});

// Add page route.
router.post('/add', function (req, res) {
	userController.addUser(req, res);
});

// Edit page route.
router.get('/:id', function (req, res) {
	// res.render('user/add');
	userController.getUser(req, res);
});

router.post('/:id', function (req, res) {
	userController.addUser(req, res);
	// userController.editUser(req, res);
});


// 400 page route.
router.get('/*', function (req, res) {
  res.render('400');
});


module.exports = router;