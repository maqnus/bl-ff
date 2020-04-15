var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log('/mypage <get>');
    const user = await firebase.auth().currentUser;
    if (user) {
        res.render('mypage', { title: 'Jugepave - rooms', user });
    } else {
        res.redirect('/');
    }
});

module.exports = router;
