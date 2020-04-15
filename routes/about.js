var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');

/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log('/about <get>');
    
    const rooms = [];
    const user = await firebase.auth().currentUser;
  
    res.render('about', { title: 'Om Jugepave', user, rooms});
 
});

module.exports = router;
