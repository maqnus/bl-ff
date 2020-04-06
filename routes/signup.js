var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Jugeper - Lag bruker' });
});

router.post('/', function(req, res) {
  console.log('signup');
  firebase.auth()
    .createUserWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
    // ...
  });
  if (req.body.roomId) {
    res.redirect('/room/' + req.body.roomId);
  }
  res.redirect('/');
})

module.exports = router;
