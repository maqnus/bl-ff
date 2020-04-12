var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log('/reset-password <get>');
    res.render('reset-password', { title: 'Jugeper' });
});

router.post('/', async (req, res) => {
  const {
    emailAddress
  } = req.body;
  const auth = await firebase.auth();
  auth.sendPasswordResetEmail(emailAddress)
    .then(function() {
      console.log('reset email sent.');
    }).catch(function(error) {
      console.log(error);
    });
})

module.exports = router;
