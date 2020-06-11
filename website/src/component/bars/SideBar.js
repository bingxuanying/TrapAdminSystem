import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faTachometerAlt,
  faCircle,
  faAngleLeft,
  faCamera,
  faChartPie,
  faCircleNotch,
} from "@fortawesome/free-solid-svg-icons";
import "./SideBar.css";
import adminSample from "assets/adminSample.jpg";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class SideBar extends Component {
  render() {
    return (
      <div
        className="sidemain"
        style={!this.props.barToggle ? { width: "70px" } : {}}
      >
        {/* User Panel */}
        <div className="user-panel">
          <img src={adminSample} className="user-image-side" alt="User Image" />
          {this.props.barToggle && (
            <div className="user-panel-info">
              <p>{this.props.userInfo.username}</p>
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
              this.props.barToggle === true
                ? { width: "230px" }
                : { width: "70" }
            }
          >
            <span>
              {this.props.barToggle === true ? (
                <div>MAIN NAVIGATION</div>
              ) : (
                <div>MAIN</div>
              )}
            </span>
          </li>
          {/* #0 Home */}
          <li
            className={
              this.props.barToggle === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faHome}
              ></FontAwesomeIcon>
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Home</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="sm"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #1 Dashboard */}
          <li
            className={
              this.props.barToggle === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faTachometerAlt}
              ></FontAwesomeIcon>
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Dashboard</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="sm"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #2 Monitoring */}
          <li
            className={
              this.props.barToggle === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCamera}
              ></FontAwesomeIcon>
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Monitoring</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="sm"
                    ></FontAwesomeIcon>
                  </span>
                </div>
              )}
            </a>
          </li>
          {/* #3 Data Plot */}
          <li
            className={
              this.props.barToggle === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faChartPie}
              ></FontAwesomeIcon>
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Data Plot</span>
                  <span className="mainmenu-right">
                    <FontAwesomeIcon
                      icon={faAngleLeft}
                      size="sm"
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
              this.props.barToggle === true
                ? { width: "230px" }
                : { width: "70px" }
            }
          >
            LABELS
          </li>
          {/* #1 LABEL */}
          <li
            className={
              this.props.barToggle === true
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
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">New Message</span>
                </div>
              )}
            </a>
          </li>
          {/* #2 LABEL */}
          <li
            className={
              this.props.barToggle === true
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
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Information</span>
                </div>
              )}
            </a>
          </li>
          {/* #3 LABEL */}
          <li
            className={
              this.props.barToggle === true
                ? "mainmenu-sub-lg"
                : "mainmenu-sub-sm"
            }
          >
            <a href="#">
              <FontAwesomeIcon
                className="mainmenu-fa"
                icon={faCircleNotch}
                style={{ color: "#f39c12 " }}
              ></FontAwesomeIcon>
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Warning</span>
                </div>
              )}
            </a>
          </li>
          {/* #4 LABEL */}
          <li
            className={
              this.props.barToggle === true
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
              {this.props.barToggle && (
                <div>
                  <span className="mainmenu-middle">Important</span>
                </div>
              )}
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    barToggle: state.admin.btn.barToggle,
    userInfo: state.home.userInfo,
  };
};

const mapDispatchToProps = () => {
  return {
    switchBarToggle: adminActions.switchBarToggle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(SideBar);
