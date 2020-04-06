var express = require('express');
var router = express.Router();
const firebase = require('../config/admin');

/* GET users listing. */
router.get('/', (req, res, next) => {
    const user = firebase.auth().currentUser;
    console.log(user);
    res.render('rooms', { title: 'Jugeper - rooms', user });
});
router.get('/:roomId', async (req, res, next) => {
    const roomId = req.params.roomId;

    const room = await firebase.database()
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
});

module.exports = router;
