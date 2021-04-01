require("dotenv").config();

const { user } = require("./models/index");
const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Messages = require("./models/dbMessages.js");
const Pusher = require("pusher");
const cors = require("cors");

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
app.use(express.static("./client/build"));

// setting headers
app.use(cors());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   next();
// });

const connectionUrl =
  "mongodb+srv://admin:paws12345@cluster0.nlzcv.mongodb.net/paws?retryWrites=true&w=majority";

mongoose.connect(process.env.MONGODB_URI || connectionUrl, {
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

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.user,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
      });
    } else {
      console.log("error triggering pusher");
    }
  });
});

app.use(require("./api/router.js"));

// app.get("*", (req, res) => {
//   console.log("[HTML GET]: Get React app");
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

app.listen(PORT, function () {
  console.log(`Listening on port ${PORT}`);
});
