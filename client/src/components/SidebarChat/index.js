import { React, useState, useEffect } from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";
import axios from "../../axios";

function SidebarChat({ addNewChat, name }) {
  function getFirst(name) {
    const first = name.name.split("");
    const firstLet = first[0];
    return firstLet;
    // const letters = name.split("");
    // return letters[0];
  }

  // function getColor() {
  //   const colors = ["blue", "red", "orange", "green", "purple", "pink"];
  //   const randomColor = colors[Math.floor(Math.random() * colors.length)];
  //   return randomColor;
  // }

  const createChat = () => {
    const roomName = prompt("please enter chat name");
    if (roomName) {
      // do something with data base
    }
  };
  const [room, setRoom] = useState("");
  const [color, setColor] = useState([]);
  const loadChat = () => {
    document.getElementById("currentChat").innerHTML = name;
    setRoom(name);
  };
  useEffect(async () => {
    const res = await axios.get(`/users/${name}`).then();
    setColor(res.data.color);
  }, []);

  return !addNewChat ? (
    <div>
      <div onClick={loadChat} className="sidebarChat">
        <Avatar style={{ backgroundColor: `${color}` }}>
          {getFirst({ name })}
        </Avatar>
        <div className="sidebarChatInfo">
          <h3>{name}</h3>
        </div>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}
export default SidebarChat;
