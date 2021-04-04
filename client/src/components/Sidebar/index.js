import { DonutLarge } from "@material-ui/icons";
import { React, useState, useEffect } from "react";
import "./index.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "../SidebarChat";
import axios from "axios";

function Sidebar({ addNewChat }) {
  const [rooms, setRooms] = useState([]);


  const createChat = () => {
    const roomName = prompt("please enter chat name");
  }

  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <Avatar src="https://www.lomsnesvet.ca/wp-content/uploads/sites/21/2019/08/Kitten-Blog-683x1024.jpg" />
        <div className="sidebarHeaderRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebarSearch">
        <div className="sidebarSeachContainer">
          <SearchIcon />
          <input placeholder="search or start a new chat" type="text"></input>
        </div>
      </div>
      <div className="sidebarChat">
        <SidebarChat addNewChat />
      </div>
    </div>
  );
}
export default Sidebar;
