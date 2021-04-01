require("dotenv").config();

const { user } = require("./models/index");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Messages = require("../models/dbMessages.js");
const Pusher = require("pusher");
const cors = require("cors");
const router = require("express").Router();

// api routes that we are using for messages
router.get("/", (req, res) => {
  if (res.status(200)) {
    res.send("hello world");
  } else {
    console.log("fail");
  }
});

router.get("/messages", (req, res) => {
  Messages.find({}).then((data) => {
    console.log("data: ", data);
    res.status(200).send(data);
  });
});

router.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

module.exports = router;
