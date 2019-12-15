import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faCircle,
  faAngleLeft,
  faCamera,
  faChartPie,
  faCircleNotch
} from "@fortawesome/free-solid-svg-icons";
import "./Side.css";

class SideBar extends Component {
  render() {
    return (
      <aside
        className="sidemain"
        style={
          this.props.toggleOn === true ? { width: "230px" } : { width: "70px" }
        }
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
              <p>Bingxuan Ying</p>
              <div className="user-panel-info-online">
                <FontAwesomeIcon icon={faCircle} size="xs"></FontAwesomeIcon>{" "}
                <span>Online</span>
              </div>
            </div>
          )}
        </div>
        {/* Main Menue */}
        <ul className="mainmenu">
          {/* --- MAIN Header --- */}
          <li
            className="header"
            style={
              this.props.toggleOn === true
                ? { width: "230px" }
                : { width: "70" }
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
          {/* #0 Home */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faHome}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Home</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="s"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #1 Dashboard */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faTachometerAlt}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Dashboard</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="s"
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
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
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
                      size="s"
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
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
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
                      size="s"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* --- LABEL Header --- */}
          <li
            className="header"
            style={
              this.props.toggleOn === true
                ? { width: "230px" }
                : { width: "70px" }
            }
          >
            LABELS
          </li>
          {/* #1 LABEL */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCircleNotch}
                style={{ color: "#00a65a" }}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">New Message</span>
                </div>
              )}
            </a>
          </li>
          {/* #2 LABEL */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCircleNotch}
                style={{ color: "#00c0ef" }}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Information</span>
                </div>
              )}
            </a>
          </li>
          {/* #3 LABEL */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCircleNotch}
                style={{ color: "#39c12 " }}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Warning</span>
                </div>
              )}
            </a>
          </li>
          {/* #4 LABEL */}
          <li
            className={
              this.props.toggleOn === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCircleNotch}
                style={{ color: "#dd4b39  " }}
              ></FontAwesomeIcon>
              {this.props.toggleOn && (
                <div>
                  <span className="mainmenu-middle">Important</span>
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
