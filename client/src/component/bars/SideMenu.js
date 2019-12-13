import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./Side.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

class SideMenu extends Component {
  render() {
    console.log(this.props.toggleOn);
    return (
      <a>
        {this.props.toggleOn === true ? (
          <aside className="sidemain-menu sidemain">
            <div className="user-panel">
              <div className="user-panel-info">
                <p>Alexander Pierce</p>
                <div className="user-panel-info-online">
                  <FontAwesomeIcon icon={faCircle} size="xs"></FontAwesomeIcon>{" "}
                  <span>Online</span>
                </div>
              </div>
            </div>
            <ul className="mainmenu">
              <li class="header-text"></li>
            </ul>
          </aside>
        ) : (
          <div></div>
        )}
      </a>
    );
  }
}

export default SideMenu;
