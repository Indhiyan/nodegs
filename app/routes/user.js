var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var multer = require('multer');
var router = express.Router();
var pathConfig = require('../config/path-config');
var userController = require('../controllers/user');

// Login form
router.get('/login', function (req, res) {
  	res.render('login');
});

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

/* File upload */
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, pathConfig.publicDirPath + '/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.png');
    }
});

var photoUpload = multer({ storage: storage }).single('photo');

router.post('/add', authenticated, function (req, res) {
    
    photoUpload(req, res, function (err) {
        if (err) {
          // An error occurred when uploading 
          userController.addUser(req, res);
        }
        userController.addUser(req, res);
    });
});

// // Add new user
// router.post('/add', authenticated, function (req, res) {
// 	 userController.addUser(req, res);
// });

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

// /* File upload */
// var fileStorage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, pathConfig.publicDirPath + '/uploads');
//     },
//     filename: function (req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + '.png');
//     }
// });

// var upload = multer({ storage: fileStorage }).single('fileToUpload');

// router.get('/upload', function (req, res) {
//     res.render('user/fileupload');
// });

// router.post('/upload', function (req, res) {
//     upload(req, res, function (err) {
//         if (err) {
//           // An error occurred when uploading 
//           res.json({success: false, message: 'File not uploaded!'});
//         }
//         res.json({success: true, message: 'File uploaded!'});
 
//         // Everything went fine 
//     });
// });

module.exports = router;