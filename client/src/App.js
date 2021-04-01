import { BrowserRouter as Router, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import Chat from "./components/Chat";
import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import "./App.css";
import ChatPage from "./pages/ChatPage";

function App() {
  return (
    <>
      <Router>
        <Login />
        <div className="app">
          <div className="appbody">
            <Route exact path="/" component={ChatPage} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
