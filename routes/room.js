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

  const room = await admin.database()
    .ref('/room/' + roomId)
    .once('value')
    .then(function(snapshot) {
      console.log(snapshot.val());
      return snapshot.val();
    });
  
  const user = await firebase.auth().currentUser;

  if (roomId !== null && room && room.name) {
    res.render('room', { title: 'Jugeper - ' + room.name, roomId, user });
    res.io.on('connection', function(socket){
      console.log('a user connected');
      socket.on('disconnect', function(){
        console.log('user disconnected');
      });
      socket.on('chat message', function(msg){
        console.log('message: ' + msg);
        res.io.emit('chat message', msg);
      });
    });
  } else {
    res.redirect('/');
  }
});

module.exports = router;
