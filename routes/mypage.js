var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');


/* GET users listing. */
router.get('/', (req, res, next) => {
    console.log('/mypage <get>');
    
    const rooms = [];
    const user = firebase.auth().currentUser;
    // console.log(user.displayName);
    if (user) {
        res.render('mypage', { title: 'Min profil', user, rooms});
    } else {
        res.redirect('/');
    }
});




module.exports = router;
