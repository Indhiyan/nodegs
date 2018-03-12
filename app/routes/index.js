var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

// Home page route.
router.get('/', function (req, res) {
  res.render('index');
});

// Login form
router.get('/login', function (req, res) {
  	res.render('login');
});

// Login form
router.post('/login', function (req, res) {
  	userController.login(req, res);
});

// // 400 page route.
// router.get('/*', function (req, res) {
//   res.render('400');
// });

module.exports = router;