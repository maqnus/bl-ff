var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');


/* GET users listing. */
router.get('/', async (req, res, next) => {
    console.log('/about <get>');
    const rooms = [];
    const user = await firebase.auth().currentUser;
    
    const dbquest = await admin.database()
    .ref('/questions/')
    .on('value', (data)=>{
        console.log(data.val())
        var dbqa = data.val();

       res.render('about', { title: 'Om Jugepave', user, rooms, dbqa});
    })
  
    // res.render('about', { title: 'Om Jugepave', user, rooms});
  
    
 
});




module.exports = router;
