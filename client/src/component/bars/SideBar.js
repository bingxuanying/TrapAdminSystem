import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCircle,
  faAngleLeft
} from "@fortawesome/free-solid-svg-icons";
import "./Side.css";

class SideBar extends Component {
  render() {
    let barHeaderLarge = <li className="header-lg">MAIN NAVIGATION</li>;
    let barHeaderSmall = <li className="header-sm">MAIN</li>;
    return (
      <aside
        className="sidemain"
        style={this.props.toggleOn === true ? { width: 230 } : { width: 70 }}
      >
        {/* User Panel */}
        <div className="user-panel">
          <img
            src="./adminSample.jpg"
            className="user-image-side"
            alt="User Image"
          ></img>
          {this.props.toggleOn && (
            <div className="user-panel-info">
              <p>Alexander Pierce</p>
              <div className="user-panel-info-online">
                <FontAwesomeIcon icon={faCircle} size="xs"></FontAwesomeIcon>{" "}
                <span>Online</span>
              </div>
            </div>
          )}
        </div>
      </aside>
    );
  }
}

export default SideBar;
