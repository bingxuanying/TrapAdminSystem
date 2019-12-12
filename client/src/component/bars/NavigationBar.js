import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {
  render() {
    let logoLarge = (
      <span className="logo-large">
        <b>UC</b>
        Davis
      </span>
    );
    let logoSmall = (
      <span className="logo-small">
        <b>UCD</b>
      </span>
    );
    return (
      <nav className="navmain">
        <a className="logo">
          {this.props.toggleOn === true ? logoLarge : logoSmall}
        </a>

        <div className="navbar">
          <div
            className="sidebar-toggle"
            role="button"
            onClick={this.props.handleToggle}
          >
            <FontAwesomeIcon icon={faBars} size="1x"></FontAwesomeIcon>
          </div>

          <div className="navbar-menu">
            <ul className="navbar-nav">
              <li className="section-message"></li>
              <li className="section-notification"></li>
              <li className="section-task"></li>
              <li className="section-user">
                <img
                  src="./adminSample.png"
                  className="user-image"
                  alt="User Image"
                ></img>
                <span className="user-info">Administrator</span>
              </li>
              <li className="section-logout">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  size="lg"
                ></FontAwesomeIcon>
                <span className="logout">Logout</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
