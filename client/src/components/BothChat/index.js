import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { React, useState, setState, useEffect, useRef } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import axios from "../../axios";

import { useStoreContext } from "../../utils/GlobalStore";

const admin = "admin@admin.com";
const adminColor = "purple";

function BothChat({ messages }) {
  const [color, setColor] = useState([]);

  //setting axios calls to get messages from db

  const [input, setInput] = useState("");
  const [{ name, token }, dispatch] = useStoreContext();
  const nameRef = useRef();

  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const ATM = today.toUTCString();

  useEffect(async () => {
    const res = await axios.get(`/users/${name}`).then();
    setColor(res.data.color);
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (name === admin) {
      await axios.post("/messages/new", {
        message: input,
        name: `${name}`,
        timestamp: `${ATM}`,
        received: true,
        roomName: getCurrentChat(),
        token: localStorage.getItem("token"),
        auth: "false",
      });
    } else if (name !== "" && name !== admin) {
      await axios.post("/messages/auth", {
        message: input,
        name: `${name}`,
        timestamp: `${ATM}`,
        received: true,
        roomName: getCurrentChat(),
        token: localStorage.getItem("token"),
        auth: "true",
      });
    } else {
      await axios.post("/messages/new", {
        message: input,
        name: `${name}`,
        timestamp: `${ATM}`,
        received: false,
        roomName: `${name}`,
        token: localStorage.getItem("token"),
        auth: "false",
      });
    }

    setInput("");
  };

  function getCurrentChat() {
    let thisChat = nameRef.current.innerHTML;
    return thisChat;
  }
  // getting first letter of email for avatar
  function getFirst(name) {
    const first = name.name.split("");
    const firstLet = first[0];
    return firstLet;
  }
  //
  //   function getColor() {
  //     const colors = ["blue", "red", "orange", "green", "purple", "pink"];
  //     const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //     return randomColor;
  //   }

  if (name === "admin@admin.com") {
    return (
      <>
        <Sidebar />
        <div className="chat">
          <div className="chatHeader">
            <Avatar style={{ backgroundColor: adminColor }}>
              {getFirst({ name })}
            </Avatar>
            <div className="chatHeaderInfo">
              <h3 id="currentChat" ref={nameRef}>
                {name}
              </h3>
            </div>
            <div className="chatHeaderRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="chatBody">
            {messages.map((message) => {
              if (message.roomName === getCurrentChat()) {
                if (message.name === "admin@admin.com") {
                  return (
                    <p className={`chatMessage chatReceiver`} key={message._id}>
                      <span className="chatName">{message.name}</span>
                      {message.message}
                      <span className="chatTimestamp">{message.timestamp}</span>
                    </p>
                  );
                } else {
                  return (
                    <p className="chatMessage" key={message._id}>
                      <span className="chatName">{message.name}</span>
                      {message.message}
                      <span className="chatTimestamp">{message.timestamp}</span>
                    </p>
                  );
                }
              }
            })}
          </div>
          <div className="chatFooter">
            <InsertEmoticon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send Message
              </button>
            </form>
            <MicIcon />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="userchat">
          <div className="chatHeader">
            <Avatar style={{ backgroundColor: `${color}` }}>
              {getFirst({ name })}
            </Avatar>
            <div className="chatHeaderInfo">
              <h3>{name}</h3>
            </div>
            <div className="chatHeaderRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>

          <div className="chatBody">
            {messages.map((message) => {
              if (message.roomName === `${name}`) {
                if (message.name === "admin@admin.com") {
                  return (
                    <p className={`chatMessage `} key={message._id}>
                      <span className="chatName">{message.name}</span>
                      {message.message}
                      <span className="chatTimestamp">{message.timestamp}</span>
                    </p>
                  );
                } else if (message.auth === true) {
                  return (
                    <p className={`chatMessage chatReceiver`}>
                      <span className="chatName">{message.name}</span>
                      {message.message}
                      <span className="chatTimestamp">{message.timestamp}</span>
                    </p>
                  );
                } else {
                  return (
                    <p className={`chatMessage chatReceiver`}>
                      <span className="chatName">{message.name}</span>
                      {message.message}
                      <span className="chatTimestamp">{message.timestamp}</span>
                    </p>
                  );
                }
              }
            })}
          </div>
          <div className="chatFooter">
            <InsertEmoticon />
            <form>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message"
                type="text"
              />
              <button onClick={sendMessage} type="submit">
                Send Message
              </button>
            </form>
            <MicIcon />
          </div>
        </div>
        <div style={{ display: "none" }} ref={nameRef}>
          {name}
        </div>
      </>
    );
  }
}

export default BothChat;
