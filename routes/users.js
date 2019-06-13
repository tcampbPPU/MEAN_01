const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const credentials = require('../credentials');
const connect = require('../connect');
const db = require('../db');

const requireAuth = passport.authenticate('jwt', {session: false});
require('../passport')(passport);

// Generate our salt
const salt = bcrypt.genSaltSync(10);

// Register
router.post('/register', (req, res, next) => {
  connect(function(con) {
    var passwordData = bcrypt.hashSync(req.body.password, salt);
    var q = "insert into TABLE (`TABLE.ATTRIBUTE`, `TABLE.ATTRIBUTE`, `TABLE.ATTRIBUTE`, `TABLE.ATTRIBUTE`, `TABLE.ATTRIBUTE`) values (?, ?, ?, ?, ?)";
    var values = [req.body.first_name, req.body.last_name, req.body.email, req.body.username, passwordData];
    try {
     con.query(q, values, function (err, result, fields) {
       if (err) {
         res.json({success: false, msg: 'Failed to register', error: err});
       }else{
         res.json({success: true, msg: 'User registered'});
       }
     });
    }catch(err) {
      console.log(`ERROR: registering a new user, ${err}`);
    }
  });
});


// Authenticate
router.post('/authenticate', (req, res, next) => {
  db.findUser({
    username: req.body.username
  }, function (response) {
      // Store Found user info in Obj
      var user = {
        user_id: response.id,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email,
        username: response.username
      };
      bcrypt.compare(req.body.password, response.password, function(err, answer) {
        if (err) throw err;
        if (answer == true) { // give our token
          var token = jwt.sign(user, credentials.cookieSecret, {
            expiresIn: 10800 // in seconds, 3 hours
          });
          res.status(200).json({
            success: true,
            token: 'JWT ' + token,
            user: user
          });
        }else {
          res.json({
            success: false,
            msg: 'Authentication failed. Passwords did not match.',
            status: 401
          });
        }
      });
  }, function (err) {
      res.json({
        success: false,
        msg: 'Authentication failed. User not found.',
        status: 401
      });
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  res.json({user: req.user});
});


module.exports = router;
