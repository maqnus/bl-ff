var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');


/* GET users listing. */
router.get('/', async (req, res, next) => {
  console.log('/about <get>');
  const user = firebase.auth().currentUser;

  const rooms = await admin.database()
    .ref('/room/')
    .once('value')
    .then(snapshot => snapshot.val())
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  
  const dbquest = admin.database()
    .ref('/questions/')
    .on('value', data => data.val());
  res.render('about', { title: 'Om Jugepave', user, rooms, dbquest});
 
});




module.exports = router;
