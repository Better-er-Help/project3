import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { StoreProvider } from "./utils/GlobalStore";
import Pusher from "pusher-js";
import Chat from "./components/Chat";
import UserChat from "./components/UserChat";
import AdminChat from "./components/AdminChat";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import "./App.css";
import axios from "./axios";
// import axios from "axios";

function App() {
  return (
    <>
      <StoreProvider>
        <Router>
          <Login />
          <div className="app">
            <div className="appbody">
              <Chat />
              {/* <UserChat messages={messages} /> */}
              {/* <Chat messages={messages} /> */}
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
