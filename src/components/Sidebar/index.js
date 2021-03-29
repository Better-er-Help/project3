import { DonutLarge } from "@material-ui/icons";
import React from "react";
import "./index.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";

function Sidebar() {
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
    </div>
  );
}
export default Sidebar;
