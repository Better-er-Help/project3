import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { StoreProvider } from "./utils/GlobalStore";

import Chat from "./components/Chat";

import Signup from "./components/Signup/signup";
import { React, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section.js";
import Homepage from "./pages/Homepage";
import AidSelection from './pages/AidSelection'
import ChatSelection from './pages/ChatSelection'
import Chat2 from './components/Chat2'
import "./App.css";

function App() {
  const [rightMarg, setRightMarg] = useState(false);

  function toggleMenu() {
    rightMarg === false ? setRightMarg(true) : setRightMarg(false);
  }
  function closeMenu(){
    setRightMarg(false)
  }

  const name = localStorage.getItem('email')

  return (
    <StoreProvider>
      <Router>
        <Header 
        toggleMenu={toggleMenu}
        closeMenu={closeMenu}
        >
          <Section />
        </Header>
        <div
          className="app"
          style={{
            opacity: rightMarg
              ? "0.4"
              : "1",
          }}
        >
          <div
            className="appbody"
            style={{ marginRight: rightMarg ? "250px" : "0" }}
          >
            <Route exact path="/" component={Homepage} />
            <Route exact path="/selection" component={AidSelection}/>
            <Route exact path="/chatselection" component={ChatSelection}/>
            <Route exact path="/publicChat" component={Chat2}/>
            <Route exact path="/privateChat" component={Chat}>{name === null ? <Redirect to='/signup'/> : <Chat/>}</Route>
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
