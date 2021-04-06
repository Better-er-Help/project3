import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import Chat from "./components/Chat";
import About from './pages/aboutme'
import Signup from "./components/Signup/signup";
import { React, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section.js";
import Homepage from "./pages/Homepage";
import AidSelection from "./pages/AidSelection";
import ChatSelection from "./pages/ChatSelection";
import Chat2 from "./components/Chat2";
import "./App.css";
import { useStoreContext } from "./utils/GlobalStore";
import Emergency from "./pages/Emergency.js";

function App() {
  const [{ rightMarg }, dispatch] = useStoreContext();

  function toggleMenu() {
    rightMarg === false
      ? dispatch({ type: "NAV_OPEN" })
      : dispatch({ type: "NAV_CLOSE" });
  }
  function closeNav() {
    dispatch({ type: "NAV_CLOSE" });
  }

  const name = localStorage.getItem("email");

  return (
    <Router>
      <Header toggleMenu={toggleMenu} closeNav={closeNav}>
        <Section />
      </Header>
      <div
        className="app"
        style={{
          opacity: rightMarg ? "0.4" : "1",
        }}
        onMouseDown={() => dispatch({ type: "NAV_CLOSE" })}
      >
        <div className="appBg">
        <div
          className="appbody"
          style={{ marginRight: rightMarg ? "250px" : "0" }}
        >
            <Route exact path="/" component={Homepage} />
            <Route exact path="/about" component={About}/>
            <Route exact path="/selection" component={AidSelection}/>
            <Route exact path="/chatselection" component={ChatSelection}/>
            <Route exact path="/publicChat" component={Chat2}/>
            <Route exact path="/privateChat" component={Chat}>{name === null ? <Redirect to='/signup'/> : <Chat/>}</Route>
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/emergency" component={Emergency} />
            </div>
          
        </div>
      </div>
      </Router>
  );
}

export default App;
