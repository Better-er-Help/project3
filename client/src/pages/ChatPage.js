import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Chat from "../components/Chat";

import "./App.css";

// import axios from "axios";

function ChatPage() {
  //settign states
  const [messages, setMessages] = useState([]);

  //setting axios calls to get messages from db
  useEffect(async () => {
    const res = await axios.get("/messages");
    setMessages(res.data);
  }, []);

  // this is the realtime mongo hookup.
  console.log(messages);
  useEffect(() => {
    const pusher = new Pusher("19b49e3760d87d26f1b4", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      // alert(JSON.stringify(data));
      setMessages([...messages, data]);
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  return (
    <>
      <div className="app">
        <div className="appbody">
          <Chat messages={messages} />
        </div>
      </div>
    </>
  );
}

export default ChatPage;
