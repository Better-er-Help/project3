require("dotenv").config();

const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Messages = require("./models/dbMessages.js");
const Users = require("./models/user");
const Pusher = require("pusher");
const cors = require("cors");
const auth = require("./api/auth");
const auth2 = require('./api/auth2')

const PORT = process.env.PORT || 3001;

const pusher = new Pusher({
  appId: "1181172",
  key: "19b49e3760d87d26f1b4",
  secret: "6d5750574c9e674d70dc",
  cluster: "us2",
  useTLS: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setting headers
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

const connectionUrl =
  "mongodb+srv://admin:paws12345@cluster0.nlzcv.mongodb.net/paws?retryWrites=true&w=majority";

  if(process.env.NODE_ENV==="production"){
    app.use(express.static("client/build"))
  }
  
  mongoose.connect(process.env.MONGODB_URI || connectionUrl, {
      useNewUrlParser: true,
      useCreateIndex: true,
  });

const db = mongoose.connection;
db.once("open", () => {
  console.log("db connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    if (change.operationType == "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        roomName: messageDetails.roomName,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

app.use(require("./api/router.js"));

// api routes that we are using for messages
app.get("/", (req, res) => {
  if (res.status(200)) {
    res.send("hello world");
  } else {
    console.log("fail");
  }
});

app.get("/users/:name", (req, res) => {
  Users.findOne({ email: req.params.name }).then((data) => {
    res.status(200).send(data);
  });
});

app.get("/messages/public", (req, res) => {
  Messages.find({auth:false}).then((data) => {
    res.status(200).send(data);
  });
});

app.get(("/messages/auth"), auth2, (req, res) => {
  Messages.find({}).then((data) => {
    res.status(200).send(data);
  });
});

app.get("/rooms", (req, res) => {
  Users.distinct("email").then((data) => {
    res.status(200).send(data);
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

app.post("/messages/auth", auth, (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(`new message created: \n ${data}`);
    }
  });
});


// app.get("*", (req, res) => {
//   console.log("[HTML GET]: Get React app");
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
