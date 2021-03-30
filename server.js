require("dotenv").config();

const { user, Paws } = require("./models/index");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Messages = require("./models/paws.js");
const Pusher = require("pusher");

const PORT = process.env.PORT || 3001;

const pusher = new Pusher({
  appId: "1180680",
  key: "6a551e7e6add33942128",
  secret: "2f84d3a8422684dc5cdf",
  cluster: "us2",
  useTLS: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("./client/build"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/paws", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("a change occured: ", change);

    if (change.opperationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

app.use(require("./api/router.js"));

app.get("*", (req, res) => {
  console.log("[HTML GET]: Get React app");
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.get("/", (req, res) => res.status(200).send("helloworld"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

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
