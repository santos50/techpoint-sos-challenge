const express = require('express');
const router = express.Router();
const db = require('../models');
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Twit = require('twit');
require('dotenv').config();

//Twitter Connection
const T = new Twit ({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token: process.env.ACCESS_TOKEN,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
});

var stream = T.stream('statuses/filter', {track: '#IndianapolisColts'})


/*ADMIN ENDS GAME*/
router.post("/endGame", async (req, res) => {
  //fetch game
  let game = await db.Game.find().sort({_id:-1}).limit(1)

  //sets game to expired
  db.Game.findOneAndUpdate(
    { _id: game[0]._id }, 
    { $set: { expired: true } },
   function (error, success) {
         if (error) {
          return res.status(400).json({
            message: "Not able to post question"
          });
         } else {
          return res.status(200).json();
         }
     });
}) 


/* GETS TWITTER FEED */
router.post('/getTweets', (req,res) => {

  var params = {
    q: '#colts',
    count: 5,
    result_type: 'recent',
    lang: 'en'
  }

  T.get('search/tweets', params, function(err, data, response) {
  if (!err) {
    res.send(data.statuses)
  } else {
    console.log(err)
  }
  })
});


/* GETS GAME DETAILS FOR PLAYER*/
router.post("/getPlayerQuestions", async (req, res) => {
  let game = await db.Game.find({}, {password: 0}).sort({_id:-1}).limit(1);
  res.send(game[0]);
});


/* GETS CURRENT QUESTION INDEX FROM GAME */
router.post("/getCurrentQuestion", async (req, res) => {
  let game = await db.Game.find().sort({_id:-1}).limit(1)
  res.send(game[0]);
});


/* ADMIN CREATES GAME SESSION */
router.post("/addGame", (req, res) => {
  const { title, admin, currentQuestion } = req.body;

  db.Game.create({
          title,
          admin,
          currentQuestion,
          // password,
          // questions,
          // answers,
          // rightAnswers,
          // questionPointValues,
          // expired
        }, ).then(game => res.send(game));
});


/* GETS TOP 5 PLAYERS BASED ON HIGHEST SCORE */
router.post("/getLeaderboard", (req, res) => {
var leaderboard = db.User.find( {score: {$exists: true}} ).sort({score : -1}).limit(5)
  .then(leaderboard => {
    res.send(leaderboard)});
;
});


/* ADMIN POSTS NEW QUESTION */
router.post("/postQuestion", async (req, res) => {
  const { question, answers, answerPointValues } = req.body;

  //fetch game
  let game = await db.Game.find().sort({_id:-1}).limit(1)

  //update game in database with new question/answer
  db.Game.findOneAndUpdate(
    { _id: game[0]._id }, 
    { $push: { questions: question, answers: answers, answerPointValues: answerPointValues } },
   function (error, success) {
         if (error) {
          return res.status(400).json({
            message: "Not able to post question"
          });
         } else {

          return res.status(200).json();
         }
     });
});

/* UPDATES PLAYER'S WHISTLE SCORE */
router.post('/updateUserScore', async (req, res) => {
  const { username, score} = req.body;
  try {
    let user = db.User.findOneAndUpdate(
      {username: username}, 
      { 
          $set: {score: score}
      },
      {
          returnNewDocument: true
      }
  , function( error, result){
    if (!user)
    return res.status(400).json({
      message: "User Not Exist"
    });
  });
    } catch (e) {
      console.error(e);
      res.status(500).json({
        message: "Server Error"
      });
    }
return res.status(200).json();
});


/* ADMIN POSTS CORRECT ANSWER AFTER PLAY */
router.post("/postCorrectAnswer", async (req, res) => {
  const {rightAnswer, currQuestion} = req.body;

  //fetch game
  let game = await db.Game.find().sort({_id:-1}).limit(1)

  //update game in database with right answer and current question index
  db.Game.findOneAndUpdate(
    { _id: game[0]._id }, 
    { $push: { rightAnswers: rightAnswer }, $set: {currentQuestion: currQuestion} },
   function (error, success) {
         if (error) {
          return res.status(400).json({
            message: "Not able to post right answer"
          });
         } else {
           //success
           console.log('in success')
          return res.status(200).json();
         }
     });
});


/* UPDATED USER LOCATION BEFORE, NOW JUST CHECKS FOR ADMIN PASSWORD */
router.post("/userLocation",async (req, res) => {
    // db.ToDo.create({text: req.body.text}).then(todo => res.send(todo));
    const { username, atHome, password } = req.body;

    // try {
    //   db.User.findOneAndUpdate(
    //     {username: username}, 
    //     { 
    //         $set: {atHome: atHome}
    //     },
    //     {
    //         returnNewDocument: true
    //     }
    // , function( error, result){
    //   if (error)
    //   return res.status(400).json({
    //     message: "User Not Exist"
    //   });
    // });
    //   } catch (e) {
    //     console.error(e);
    //     res.status(500).json({
    //       message: "Server Error"
    //     });
    //   }

      try {
        let game = await db.Game.find().sort({_id:-1}).limit(1)

        //console.log(game.password)
        var isMatch = false;

        if (game[0].password === password) {
          isMatch = true;
        } else {
          isMatch = false;
        }

        if (!isMatch) {
          return res.status(400).json({
            message: "Incorrect Password !"
          });
        } else {

          db.Game.findOneAndUpdate(
            {_id: game[0]._id}, 
            { 
                $set: {admin: username}
            },
            {
                returnNewDocument: true
            }
        , function( error, result){
          if (error)
          return res.status(400).json({
            message: "Game does not Exist"
          });
        });

          db.User.findOneAndUpdate(
          {username: username}, 
          { 
              $set: {admin: true}
          },
          {
              returnNewDocument: true
          });
          return res.send(game[0].expired);
        }

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
});


/* ADDS NEW USER AFTER REGISTRATION */
router.post("/add", async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
      
      const { username, email, password } = req.body;
      try {
        let user = await db.User.findOne({
          email
        });
        if (user) {
          return res.status(400).json({
            msg: "User Already Exists"
          });
        }
  
        user = new db.User({
          username,
          email,
          password
        });
  
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
  
        await user.save();
  
        const payload = {
          user: {
            id: user.username
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {

            expiresIn: 10000
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token: token
            });
          }
        );
      } catch (err) {
        console.log(err.message);
        res.status(500).send("Error in Saving");
      }
    }
  );


/* LOGS USER IN BASED ON CORRECT PASSWORD */
router.post("/login", async (req, res) => {
    console.log("in login");
    console.log(req.body)
      const errors = validationResult(req);
  
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array()
        });
      }
  
      const { username, password } = req.body;
      
      try {
        let user = await db.User.findOne({
          username
        });
        if (!user)
          return res.status(400).json({
            message: "User Not Exist"
          });
  
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch)
          return res.status(400).json({
            message: "Incorrect Password !"
          });
  
        const payload = {
          user: {
            id: user.username
          }
        };
  
        jwt.sign(
          payload,
          "randomString",
          {
            expiresIn: 3600
          },
          (err, token) => {
            if (err) throw err;
            res.status(200).json({
              success: true,
              token: token
            });
          }
        );
      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }
    }
  );

module.exports = router;