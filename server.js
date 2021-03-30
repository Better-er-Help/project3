require("dotenv").config();

const { user, Paws } = require("./models/index");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Messages = require("./models/paws.js");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/paws", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(require("./api/router.js"));

app.get("*", (req, res) => {
  console.log("[HTML GET]: Get React app");
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/", (req, res) => res.status(200).send("helloworld"));

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
