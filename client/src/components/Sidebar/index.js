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

  function getRooms() {
    return axios.get("/rooms");
  }

  useEffect(async () => {
    const data = await getRooms();
    setRooms(data.data);
    console.log(rooms);
  }, []);
  function loadChat(id) {
    console.log(id);
  }
  return (
    <div className="sidebar">
      <div className="sidebarHeader">
        <div className="sidebarHeaderRight">
          <h2>Chats</h2>
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
        {/* <button onClick={log}>here </button>; */}
        {rooms.map((room) => {
          console.log(room);
          return <SidebarChat name={room} onClick={loadChat(room)} />;
        })}
      </div>
    </div>
  );
}
export default Sidebar;
