import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { React, useState, setState } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import axios from "../../axios";
import Timestamp from "react-timestamp";
import { useStoreContext } from "../../utils/GlobalStore";

function Chat({ messages }) {
  const [input, setInput] = useState("");
  const [{ name, token }, dispatch] = useStoreContext();

  function test() {
    console.log({ name, token });
  }
  const timeElapsed = Date.now();
  const today = new Date(timeElapsed);
  const ATM = today.toUTCString();

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("/messages/new", {
      message: input,
      name: `${name}`,
      timestamp: `${ATM}`,
      received: false,
      roomName: `${name}`,
    });
    setInput("");
  };
  return (
    <>
      <button onClick={test}>testttt</button>
      <Sidebar />
      <div className="chat">
        <div className="chatHeader">
          <Avatar />
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
              return (
                <p
                  className={`chatMessage ${
                    message.received && "chatReceiver"
                  }`}
                >
                  <span className="chatName">{message.name}</span>
                  {message.message}
                  <span className="chatTimestamp">{message.timestamp}</span>
                </p>
              );
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
}

export default Chat;
