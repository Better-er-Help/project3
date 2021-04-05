import Pusher from "pusher-js";

import { React, useState, useEffect } from "react";
import "./style.css";

import axios from "../../axios";

import { useStoreContext } from "../../utils/GlobalStore";

import BothChat from "../BothChat";
const admin = "admin@admin.com";

function Chat() {
  //settign states
  //const [admin, setAdmin] = useState("admin@admin.com");
  const [messages, setMessages] = useState([]);
  const [authedMessages, setAuthedMessages] = useState([])
  const [{ name, token }, dispatch] = useStoreContext();
  const [color, setColor] = useState([]);

  //setting axios calls to get messages from db
  useEffect(async () => {
    const res = await axios.get("/messages/public");
    // const authed = await axios.get("/messages/auth")
    setMessages(res.data);
    // setAuthedMessages(authed.data)
  }, [name]);

  useEffect(async () => {
    const res = await axios.get(`/users/${name}`).then();
    setColor(res.data.color);
  }, []);

  // this is the realtime mongo hookup.
  useEffect(() => {
    const pusher = new Pusher("19b49e3760d87d26f1b4", {
      cluster: "us2",
    });
    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      setMessages([...messages, data]);
      setAuthedMessages([...authedMessages, data])
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
  return <BothChat messages={messages} color={color} />;

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
