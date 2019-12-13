import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faCircle,
  faAngleLeft,
  faCamera,
  faChartPie
} from "@fortawesome/free-solid-svg-icons";
import "./Side.css";

class SideBar extends Component {
  render() {
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
        {/* Main Menue */}
        <ul className="mainmenu">
          {/* --- Header --- */}
          <li
            className="header"
            style={
              this.props.toggleOn === true ? { width: 230 } : { width: 70 }
            }
          >
            <span>
              {this.props.toggleOn === true ? (
                <div>MAIN NAVIGATION</div>
              ) : (
                <div>MAIN</div>
              )}
            </span>
          </li>
          {/* #1 Home */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-home-lg"
                : "mainmenu-home-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faHome}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Dashboard</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="xs"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #2 Monitoring */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-home-lg"
                : "mainmenu-home-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCamera}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Monitoring</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="xs"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #3 Data Plot */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-home-lg"
                : "mainmenu-home-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faChartPie}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Data Plot</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="xs"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
        </ul>
      </aside>
    );
  }
}

export default SideBar;
