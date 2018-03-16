var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
// var bodyParser = require("body-parser");
// var userModel = require('../models/user');
var userController = require('../controllers/user');

// Login form
router.get('/login', function (req, res) {
  	res.render('login');
});

// Login form
// router.post('/login', function (req, res) {
//   	userController.login(req, res);
// });

/* Authentication & Success & Failure callback */
router.post('/login',
  	passport.authenticate('local', { successRedirect: '/user/list',
                                   failureRedirect: '/user/login',
                                   failureFlash: 'Invalid email or password.',
                                   successFlash: 'You have successfully logged!' })
);

// Login form
router.get('/register', function (req, res) {
    res.render('register', {userDocs: ''});
});

router.post('/register', function (req, res) {
   userController.addUser(req, res, 'register');
});

router.get('/logout', function(req, res){
  	req.logout();
  	res.redirect('/user/login');
});

// Authentication or Session check
function authenticated(req, res, next) {
  // console.log("authenticated", req.user);
    if (req.user) {
        next();
    } else {
        res.redirect('/user/login');
    }
}

// List all users
router.get('/list', authenticated, function (req, res) {
	 userController.listUser(req, res);
});

// Add form
router.get('/add', authenticated, function (req, res) {
	 res.render('user/add', {userDocs: ''});
});

// Add new user
router.post('/add', authenticated, function (req, res) {
	 userController.addUser(req, res);
});

// Edit user form
router.get('/edit/:id', authenticated, function (req, res) {
	 userController.getUser(req, res);
});

// Update existing user
router.post('/edit/:id', authenticated, function (req, res) {
	 userController.addUser(req, res);
});

// Delete user
router.get('/delete/:id', authenticated, function (req, res) {
	userController.deleteUser(req, res);
});

// 400 page route.
router.get('/*', function (req, res) {
  res.render('400');
});

module.exports = router;