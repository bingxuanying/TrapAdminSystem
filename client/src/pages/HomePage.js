import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import SignUpForm from "../component/logIO/SignUpForm";
import SignInForm from "../component/logIO/SignInForm";
import "..//App.css";

class HomePage extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App_Aside"></div>
          <div className="App_Form">
            <div className="PageSwitcher">
              <NavLink
                to="/sign-in"
                activeClassName="PageSwitcher_Item-Active"
                className="PageSwitcher_Item"
              >
                Sign In
              </NavLink>
              <NavLink
                exact
                to="/"
                activeClassName="PageSwitcher_Item-Active"
                className="PageSwitcher_Item "
              >
                Sign Up
              </NavLink>
            </div>

            <div className="FormTitle">
              <NavLink
                to="/sign-in"
                activeClassName="FormTitle_Link-Active"
                className="FormTitle_Link"
              >
                Sign In
              </NavLink>{" "}
              or{" "}
              <NavLink
                exact
                to="/"
                activeClassName="FormTitle_Link-Active"
                className="FormTitle_Link"
              >
                Sign Up
              </NavLink>
            </div>

            <Route exact path="/" component={SignUpForm}></Route>
            <Route path="/sign-in" component={SignInForm}></Route>
          </div>
        </div>
      </Router>
    );
  }
}

export default HomePage;
