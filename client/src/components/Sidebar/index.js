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

  //rooms.map((room) => console.log(room));
  // useEffect(() => {
  //   db;
  // }, []);

  // function log() {
  //   console.log(data);
  // }
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
        {/* <button onClick={log}>here </button>; */}
        {rooms.map((room) => {
          console.log(room);
          return <SidebarChat name={room} />;
        })}
      </div>
    </div>
  );
}
export default Sidebar;
