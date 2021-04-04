import { React, useState } from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";

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
  const loadChat = () => {
    document.getElementById("currentChat").innerHTML = name;
    setRoom(name);
    console.log("updated chat", name);
  };

  return !addNewChat ? (
    <div onClick={loadChat} className="sidebarChat">
      <Avatar style={{ backgroundColor: "purple" }}>
        {getFirst({ name })}
      </Avatar>
      <div className="sidebarChatInfo">
        <h2>{name}</h2>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}
export default SidebarChat;
