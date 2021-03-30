import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from "./components/Chat";
import Signup from "./components/Signup/signup"
import Login from './components/Login/login'
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  return (
    <>
    <Router>
      <Login/>
      <div className="app">
        <div className="appbody">
          <Route exact path='/' component={Chat}/>
          <Route exact path='/signup' component={Signup}/>
        </div>
      </div>
    </Router>
    </>
  );
}

export default App;
