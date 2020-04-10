var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.redirect('/');
});

router.get('/:roomId', async (req, res, next) => {
  const roomId = req.params.roomId;
  const io = req.app.locals.io;

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
  } else {
    res.redirect('/');
  }

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
    });
  })
});

module.exports = router;
