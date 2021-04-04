import { BrowserRouter as Router, Route } from "react-router-dom";

import { StoreProvider } from "./utils/GlobalStore";

import Chat from "./components/Chat";

import Signup from "./components/Signup/signup";
import Login from "./components/Login/login";
import "./App.css";

import Header from "./components/Header";
import Section from "./components/Section";

// import axios from "axios";

function App() {
  return (
    <StoreProvider>
      <Router>
        <Header>
          <Section />
        </Header>
        <Login />
        <div className="app">
          <div className="appbody">
            <Chat />
            {/* <Route exact path="/" component={Chat({ messages })} /> */}
            <Route exact path="/signup" component={Signup} />
          </div>
        </div>
      </Router>
    </StoreProvider>
  );
}

export default App;
