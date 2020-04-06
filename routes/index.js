var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET home page. */
router.get('/', async (req, res, next) => {
  const user = await firebase.auth().currentUser;
  if (user) {
    const rooms = await firebase.database()
    .ref('/room')
    .once('value')
    .then(function(snapshot) {
        console.log(snapshot.val());
        return snapshot.val();
    });
    res.render('index', { title: 'Jugeper', user, rooms });
  }
  res.render('index', { title: 'Jugeper' });
});


router.post('/new-room', function(req, res) {
  console.log('lag nytt rom');
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

router.post('/login', function(req, res) {
  console.log('index.js');
  console.log(req.body.email + ' prøver å logge inn');
  firebase.auth()
    .signInWithEmailAndPassword(req.body.email, req.body.password)
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      res.redirect('/');
    });

  // console.log(req.params);
  // console.log(req.query);
  res.redirect('/rooms');
  // var requestedRoom = !Object.keys(req.query).length;
  // if (requestedRoom) {
  //   res.redirect('/room/' + req.query);
  // } else {
  //   res.redirect('/rooms');
  // }
});

module.exports = router;
