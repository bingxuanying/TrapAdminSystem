import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import SignUpForm from "./logIO/SignUpForm";
import SignInForm from "./logIO/SignInForm";
import "..//App.css";

class HomeLayout extends Component {
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

export default HomeLayout;
