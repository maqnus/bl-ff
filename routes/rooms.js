var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET users listing. */
router.get('/', async (req, res) => {
  console.log('/rooms <get>');

  const user = await firebase.auth().currentUser;

  if (user) {
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
    console.log(rooms);
    res.render('rooms', { title: 'Jugeper - rooms', user, rooms });
  } else {
    res.redirect('/')
  }
});

module.exports = router;
