var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/:roomId', async (req, res, next) => {
  console.log('/:roomId <get>');
  const roomId = req.params.roomId;

  const rooms = await admin.database()
    .ref('/room/')
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });

  const room = await admin.database()
    .ref('/room/' + roomId)
    .once('value')
    .then(function(snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    });

  const user = await firebase.auth().currentUser;
  var name, email, photoUrl, uid, emailVerified;

  if (user != null) {
    name = user.displayName;
    email = user.email;
    photoUrl = user.photoURL;
    emailVerified = user.emailVerified;
    uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                    // this value to authenticate with your backend server, if
                    // you have one. Use User.getToken() instead.
    console.log('user.uid', user.uid);
  }

  if (roomId !== null && room && room.name) {
    res.render('room', { title: 'Jugepave - ' + room.name, roomId, user, rooms });
  } else {
    res.redirect('/');
  }

  if (user && roomId !== null && room && room.name) {
    const nsp = res.io.of('/' + roomId);
    nsp.once('connection', function(socket){
      console.log('someone connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        nsp.emit('chat message', msg);
      });
    });
  }
});

module.exports = router;
