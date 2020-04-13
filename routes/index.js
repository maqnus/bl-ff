var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log('/ <get>');

  const user = await firebase.auth().currentUser;
  const rooms = [];
  if (user) {
    console.log('user logged in');
  }
  res.render('index', { title: 'Jugepave', user, rooms });
});

router.post('/login', function(req, res) {
  console.log('/login <post>');
  const {
    email,
    password
  } = req.body;
  const rooms = [];

  console.log(email + ' prøver å logge inn');

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('logged in successfully');
      if (req.query.room) {
        console.log('redirect to room: ' + req.query.room);
        res.redirect('/room/' + req.query.room);
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.redirect('/');
    });
});

router.post('/logout', function(req, res) {
  firebase.auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('user signed out');
      res.redirect('/');
    }).catch(function(error) {
      // An error happened.
    });
});

router.post('/new-room', function(req, res) {
  console.log('/new-room <post>');
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const roomId = uuidv4();
  console.log('roomId: ' + roomId);
  console.log('req.body.name: ' + req.body.name);

  admin.database()
    .ref('room/' + roomId)
    .set({
      name: req.body.name,
      startTime: new Date()
    })
  res.redirect('/room/' + roomId);
});

module.exports = router;
