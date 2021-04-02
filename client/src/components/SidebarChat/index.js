import React from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat, name }) {
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
