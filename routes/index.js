var express = require('express');
var router = express.Router();
const firebase = require('../config/firebase');
const admin = require('../config/admin');

/* GET home page. */
router.get('/', async (req, res, next) => {
  console.log('/ <get>');

  const rooms = [];
  const user = await firebase.auth().currentUser;
  res.render('index', { title: 'Jugeper', user, rooms });
});

router.post('/login', function(req, res) {
  console.log('/login <post>');
  const {
    email,
    password
  } = req.body;
  const rooms = [];

  console.log(email + ' prøver å logge inn');

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('logged in successfully');
      if (req.query.room) {
        console.log('redirect to room: ' + req.query.room);
        res.redirect('/room/' + req.query.room);
      } else {
        res.redirect('/');
      }
    })
    .catch((error) => {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      res.redirect('/');
    });
});

router.post('/logout', function(req, res) {
  firebase.auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log('user signed out');
      res.redirect('/');
    }).catch(function(error) {
      // An error happened.
    });
});

router.post('/new-room', function(req, res) {
  console.log('/new-room <post>');
  function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  const roomId = uuidv4();
  console.log('roomId: ' + roomId);
  console.log('req.body.name: ' + req.body.name);

  admin.database()
    .ref('room/' + roomId)
    .set({
      name: req.body.name,
      startTime: new Date()
    })
  res.redirect('/room/' + roomId);
});


router.post('/updateprofile', function (req, res) {
  console.log('/mypage <post>');
  const {
      email,
      password,
      name
  } = req.body;
  console.log("Nytt navn: " , name)
  const user = firebase.auth().currentUser;
  if (user) {
      
      user.updateProfile({ 
              displayName: name,
          }).then(function () {
          console.log("user profile updated")
          res.redirect('/mypage');
      }).catch(function (error) {
          console.log(error)
          res.redirect('/');
      });
  } else {
      res.redirect('/');
  }
});



router.post('/addquestion', function (req,res){
  console.log("/addquestion <post>");
  const {
    question,
    answer
  } = req.body;
 
    admin.database().ref('questions/').push({
      q: question,
      a: answer,
      author:"..."
    }).then((data)=>{
      res.redirect('/about')
      console.log("question added")
    });
  
})

module.exports = router;
