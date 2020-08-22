import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
} from "react-router-dom";
import SignUpForm from "./components/logIO/SignUpForm";
import SignInForm from "./components/logIO/SignInForm";
import "./HomePage.sass";

class HomePage extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App_Aside"></div>
          <div className="App_Form">
            <div className="PageSwitcher">
              <NavLink
                exact
                to="/"
                activeClassName="PageSwitcher_Item-Active"
                className="PageSwitcher_Item"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/register"
                activeClassName="PageSwitcher_Item-Active"
                className="PageSwitcher_Item "
              >
                Sign Up
              </NavLink>
            </div>

            <div className="FormTitle">
              <NavLink
                exact
                to="/"
                activeClassName="FormTitle_Link-Active"
                className="FormTitle_Link"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                to="/register"
                activeClassName="FormTitle_Link-Active"
                className="FormTitle_Link"
              >
                Sign Up
              </NavLink>
            </div>

            <Route exact path="/" component={SignInForm} />
            <Route path="/register" component={SignUpForm} />
            <Redirect to="/" />
          </div>
        </div>
      </Router>
    );
  }
}

export default HomePage;
