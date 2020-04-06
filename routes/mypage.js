var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', (req, res, next) => {
    const user = firebase.auth().currentUser;
    console.log(user);
    res.render('mypage', { title: 'Jugeper - rooms', user });
});

module.exports = router;
