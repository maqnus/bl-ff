var express = require('express');
var router = express.Router();
const firebase = require('../config/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('prøvde å laste login');
    res.render('index');
});

router.post('/login', function(req, res) {
  console.log('post login.js');
  console.log(req.body.email + ' prøver å logge inn');
  firebase.auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      res.redirect('/');
    });
  
  console.log(req.params);
  console.log(req.query);
  res.redirect('/');
  // if (req.query) {
  //   res.redirect('/room/' + req.query);
  // } else {
  //   res.redirect('/');
  // }
});

module.exports = router;