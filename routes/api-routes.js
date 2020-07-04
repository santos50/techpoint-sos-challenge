const express = require('express');
const router = express.Router();
const db = require('../models');
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



router.get("/example", (req, res) => {
    res.send("message from backend: success");
});

router.get("/all", (req, res) => {
    db.ToDo.find().then(todos => res.send(todos));
});

router.post("/new", (req, res) => {
    db.ToDo.create({text: req.body.text}).then(todo => res.send(todo));
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
            id: user.id
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
              token
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
            id: user.id
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
              token
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