import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoreProvider } from "./utils/GlobalStore"
import Pusher from "pusher-js";
import Homepage from './pages/Homepage'
import Signup from './components/Signup/signup'
import Header from './components/Header'
import Section from './components/Section'
import "./App.css";
import axios from "./axios";
import Chat from './components/Chat'
import Sidebar from './components/SidebarChat'

function App() {
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
      alert(JSON.stringify(data));
      setMessages([...messages, data]);
    });
    //clean up function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);
  console.log(messages);

  return (
    
    <>
    <StoreProvider>
      <Router>
        <Header><Section/></Header>
        <div className="app">
          <div className="appbody">
            <Chat messages={messages}/>
            <Route exact path='/' component={Homepage}/>
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </StoreProvider>
    </>
  );
}

export default App;
