const express = require('express');
const router = express.Router();
const db = require('../models');
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



// router.get("/example", (req, res) => {
//     res.send("message from backend: success");
// });


router.post("/getPlayerQuestions", async (req, res) => {
  let game = await db.Game.find({}, {password: 0}).sort({_id:-1}).limit(1);
//console.log("in getplayequ")
  //console.log(game[0])
  res.send(game[0]);

});

router.get("/all", (req, res) => {
    db.Game.find().then(todos => res.send(todos));
});

router.post("/addGame", (req, res) => {
  const { admin, password, questions, answers, rightAnswers, questionsPointValues } = req.body;
  db.Game.create({admin, password, questions, answers, rightAnswers, questionsPointValues}, ).then(game => res.send(game));
});

router.post("/postQuestion", async (req, res) => {
  const { question, answers } = req.body;

  //fetch game
  let game = await db.Game.find().sort({_id:-1}).limit(1)

  //update game in database with new question/answer
  db.Game.findOneAndUpdate(
    { _id: game[0]._id }, 
    { $push: { questions: question, answers: answers } },
   function (error, success) {
         if (error) {
          return res.status(400).json({
            message: "Not able to post question"
          });
         } else {
           //success
        //   console.log('in success')
          return res.status(200).json();
         }
     });
});

router.post('/updateUserScore', async (req, res) => {
  const { username, score} = req.body;
console.log(req.body)
console.log(username)
console.log(score)
  //update game in database with new question/answer
  
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


router.post("/postCorrectAnswer", async (req, res) => {
  const {rightAnswer, currQuestion} = req.body;

  //fetch game
  let game = await db.Game.find().sort({_id:-1}).limit(1)

  //update game in database with new question/answer
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


router.post("/userLocation",async (req, res) => {
    // db.ToDo.create({text: req.body.text}).then(todo => res.send(todo));
    const { username, atHome, password } = req.body;

    try {
      let user = db.User.findOneAndUpdate(
        {username: username}, 
        { 
            $set: {atHome: atHome}
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

          let currGame = db.Game.findOneAndUpdate(
            {_id: game[0]._id}, 
            { 
                $set: {admin: username}
            },
            {
                returnNewDocument: true
            }
        , function( error, result){
          if (!currGame)
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
          
          return res.status(200).json();
        }

      } catch (e) {
        console.error(e);
        res.status(500).json({
          message: "Server Error"
        });
      }


});

router.post("/add", async (req, res) => {
    console.log('iN ADDDD');
    console.log(req.body);
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