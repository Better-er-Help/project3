import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoreProvider } from "./utils/GlobalStore";
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

  return (
    <>
      <StoreProvider>
        <Router>
          <Login />
          <div className="app">
            <div className="appbody">
              <Chat messages={messages} />
              {/* <Route exact path="/" component={Chat({ messages })} /> */}
              <Route exact path="/signup" component={Signup} />
            </div>
          </div>
        </Router>
      </StoreProvider>
    </>
  );
}

export default App;
