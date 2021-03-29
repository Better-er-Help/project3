import { DonutLarge } from "@material-ui/icons";
import React from "react";
import "./index.css";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarHeaderRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
export default Sidebar;
