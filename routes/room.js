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
