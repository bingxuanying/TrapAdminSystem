import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./NavigationBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

class NavigationBar extends Component {
  render() {
    let logoLarge = (
      <div className="logo-large">
        <span>
          <b>UC</b>
          Davis
        </span>
      </div>
    );
    let logoSmall = (
      <div className="logo-small">
        <span>
          <b>UCD</b>
        </span>
      </div>
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
              <li className="section-message">
                <a href="#"></a>
              </li>
              <li className="section-notification">
                <a href="#"></a>
              </li>
              <li className="section-task">
                <a href="#"></a>
              </li>
              <li className="section-user">
                <a href="#">
                  <img
                    src="./adminSample.jpg"
                    className="user-image"
                    alt="User Image"
                  ></img>
                  <span className="user-info">Administrator</span>
                </a>
              </li>
              <li className="section-logout">
                <a href="#">
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="lg"
                  ></FontAwesomeIcon>
                  <span className="logout">Logout</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default NavigationBar;
