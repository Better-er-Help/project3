import React from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat }) {
  const createChat = () => {
    const roomName = prompt("please enter chat name");

    if (roomName) {
      // do something with data base
    }
  };

  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChatInfo">
        <h2>Room</h2>
        <p>This is the last message</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}
export default SidebarChat;
