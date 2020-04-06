var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
    console.log('prøvde å laste login');
    res.render('index');
});

router.post('/', function(req, res) {
  console.log('post login.js');
  console.log(req.body.email + ' prøver å logge inn');
  const {
    email,
    password
  } = req.body;

  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });

  res.redirect('/mypage');

  
  // firebase.auth()
  //   .signInWithEmailAndPassword(req.body.email, req.body.password)
  //   .catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     console.log(errorMessage);
  //     res.redirect('/');
  //   });
  
  
  // if (req.query) {
  //   res.redirect('/room/' + req.query);
  // } else {
  //   res.redirect('/');
  // }
});

module.exports = router;