var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

// Home page route.
router.get('/', function (req, res) {
  res.render('index');
});

module.exports = router;