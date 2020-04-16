var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('signup', { title: 'Jugepave - Lag bruker' });
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

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('signed in');
      user.updateProfile({
        displayName: req.body.name,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      }).then(function() {
        // Update successful.
      }).catch(function(error) {
        // An error happened.
      });
    } else {
      // No user is signed in.
      console.log('not signed in');
    }
  });

  if (req.body.roomId) {
    res.redirect('/room/' + req.body.roomId);
  }
  res.redirect('/');
})

module.exports = router;
