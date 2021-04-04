import { Avatar, IconButton } from "@material-ui/core";
import Pusher from "pusher-js";
import {
  AttachFile,
  InsertEmoticon,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import MicIcon from "@material-ui/icons/Mic";
import { React, useState, useEffect, setState } from "react";
import "./style.css";
import Sidebar from "../Sidebar";
import axios from "../../axios";
import { getColor, getFirst } from "../SidebarChat";
import Timestamp from "react-timestamp";
import { useStoreContext } from "../../utils/GlobalStore";
import UserChat from "../UserChat";
import AdminChat from "../AdminChat";
import BothChat from "../BothChat";
const admin = "admin@admin.com";

function Chat() {
  //settign states
  //const [admin, setAdmin] = useState("admin@admin.com");
  const [messages, setMessages] = useState([]);
  const [{ name, token }, dispatch] = useStoreContext();

  //setting axios calls to get messages from db
  useEffect(async () => {
    const res = await axios.get("/messages");
    setMessages(res.data);
  }, []);

  // this is the realtime mongo hookup.
  useEffect(() => {
    const pusher = new Pusher("19b49e3760d87d26f1b4", {
      cluster: "us2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
    });
    //clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  // let chatMessages;

  // if (name === admin) {
  //   chatMessages = <AdminChat messages={messages} />;
  // } else if (name !== admin) {
  //   chatMessages = <UserChat messages={messages} />;
  // }
  return <BothChat messages={messages} />;

  //   function() {
  //     if (name === admin) {
  //       return <AdminChat messages={messages} />;
  //     } else {
  //       return <UserChat messages={messages} />;
  //     }
  //   },
  // };
}

export default Chat;
