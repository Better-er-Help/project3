import React from "react";
import "./style.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  return (
    <div className="sidebarChat">
      <Avatar />
      <div className="sidebarChatInfo">
        <h2>Room</h2>
        <p>This is the last message</p>
      </div>
    </div>
  );
}
export default SidebarChat;
