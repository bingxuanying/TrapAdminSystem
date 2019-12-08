import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from "react-router-dom";
import SignUpForm from "./component/homePage/SignUpForm";
import SignInForm from "./component/homePage/SignInForm";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App_Aside"></div>
          <div className="App_Form">
            <div className="PageSwitcher">
              <a href="/" className="PageSwitcher_Item">
                Sign In
              </a>
              <a
                href="/"
                className="PageSwitcher_Item PageSwitcher_Item--Active"
              >
                Sign Up
              </a>
            </div>
            <div className="FormTitle">
              <Link to="/sign-in" className="FormTitle_Link">
                Sign In
              </Link>
              or
              <Link
                exact
                to="/"
                className="FormTitle_Link FormTitle_Link--Active"
              >
                Sign Up
              </Link>
            </div>
            <Route exact path="/" Component={SignUpForm}></Route>
            <Route path="/sign-in" Component={SignUpForm}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
