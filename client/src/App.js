import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Chat from "./components/Chat";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import "./App.css";
import axios from "./axios";
// import axios from "axios";

function App() {
  //settign states
  const [messages, setMessages] = useState([]);

  //setting axios calls to get messages from db
  useEffect(async () => {
    const res = await axios.get("/messages");
    setMessages(res.data);
  }, []);

  //  useEffect(() => {
  //    async function getData() {
  //      const data = await axios.get("/messages/sync");
  //      setMessages(data);
  //    }
  //  }, []);

  // this is the realtime mongo hookup.
  console.log(messages);
  useEffect(() => {
    const pusher = new Pusher("19b49e3760d87d26f1b4", {
      cluster: "us2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (data) {
      alert(JSON.stringify(data));
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
      <Router>
        <Login />
        <div className="app">
          <div className="appbody">
            <Chat messages={messages} />
            {/* <Route exact path="/" component={Chat{ messages }} /> */}
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
