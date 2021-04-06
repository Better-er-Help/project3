import { BrowserRouter as Router, Route } from "react-router-dom";

import { StoreProvider } from "./utils/GlobalStore";

import Chat from "./components/Chat";

import Signup from "./components/Signup/signup";
import { React, useState } from "react";
import Header from "./components/Header";
import Section from "./components/Section.js";
import Homepage from "./pages/Homepage";
import AidSelection from './pages/AidSelection'
import Map from "./components/map"
import "./App.css";

function App() {
  const [rightMarg, setRightMarg] = useState(false);

  function toggleMenu() {
    rightMarg === false ? setRightMarg(true) : setRightMarg(false);
  }

  return (
    <StoreProvider>
      <Router>
        <Header toggleMenu={toggleMenu}>
          <Section />
        </Header>
        <div
          className="app"
          style={{
            backgroundColor: rightMarg
              ? "rgba(37, 150, 190, 0.4)"
              : "rgb(37, 150, 190)",
          }}
        >
          <div
            className="appbody"
            style={{ marginRight: rightMarg ? "250px" : "0" }}
          >
            <Route exact path="/" component={Homepage} />
            <Route exact path="/physical" component={Map} />
            <Route exact path="/selection" component={AidSelection}/>
            <Route exact path="/publicChat" component={Chat} />
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
