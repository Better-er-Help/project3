require("dotenv").config();

const router = require("express").Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/index.js");

router.post('/signup', (req,res) => {
  User.find({email: req.body.email})
      .exec()
      .then(user => {
          if (user.length > 0) {
              return res.status(409).json({
                  message: 'Mail exists'
              })
          } else {
          bcrypt.hash(req.body.password, 10, (err, hash) => {
              if (err) {
                  return res.status(500).json({
                      error: err
                  })
              } else {
                  const user = new User({
                      _id: mongoose.Types.ObjectId(),
                      email: req.body.email,
                      password: hash,
                      color: req.body.color
                  })
                  user
                      .save()
                      .then( result => {
                          console.log(result)
                          res.status(201).json({
                              message: 'User created'
                          })
                      })
                      .catch(err => {
                          console.log(err);
                          res.status(500).json({
                              message:'EMAIL'
                          })
                      })
                  }
              })
          }
      })
})

router.post('/login', (req,res) => {
  User.find({ email: req.body.email })
  .exec()
  .then(user => {
      if (user.length < 1) {
          return res.status(401).json({
              message: 'No such being!'
          })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result)=> {
      if (err) {
        return res.status(401).json({
          message:'Wrong password'
        })
      }
      if (result) {
        const token = jwt.sign(
          {
            email: user[0].email,
            userId: user[0]._id,
          },
          process.env.JWT_KEY,
          {
            expiresIn: "1h",
          }
        );
        return res.status(200).json({message: "Auth successful", token, email: req.body.email})
        
      }
      res.status(401).json({
        message: 'Auth failed'
      })
    });
  })
  .catch((err) => {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  });
})

router.delete("/:userId", (req, res, next) => {
  User.remove({ _id: req.params.userId })

    .exec()
    .then((result) => {
      res.status(200).json({
        message: "User deleted",
      });
    })

    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

module.exports = router;
