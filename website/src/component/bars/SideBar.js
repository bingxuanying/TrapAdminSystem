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
import { adminActions, homeActions } from "store/actions/index";

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
        <div className="mainmenu">
          {/* --- MAIN Header --- */}
          <div className="mainmenu-header">
            <span>
              {this.props.barToggle === true ? (
                <div>MAIN NAVIGATION</div>
              ) : (
                <div>MAIN</div>
              )}
            </span>
          </div>
          {/* #1 Almond */}
          <div
            className="mainmenu-row"
            onClick={() => this.props.updateSection("Almond")}
          >
            <FontAwesomeIcon
              className="mainmenu-fa"
              icon={faHome}
            ></FontAwesomeIcon>
            {this.props.barToggle && (
              <div>
                <span className="mainmenu-middle">Almond</span>
                <span className="mainmenu-right">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    size="sm"
                  ></FontAwesomeIcon>
                </span>
              </div>
            )}
          </div>
          {/* #2 Dashboard */}
          <div
            className="mainmenu-row"
            onClick={() => this.props.updateSection("Grain")}
          >
            <FontAwesomeIcon
              className="mainmenu-fa"
              icon={faTachometerAlt}
            ></FontAwesomeIcon>
            {this.props.barToggle && (
              <div>
                <span className="mainmenu-middle">Grain</span>
                <span className="mainmenu-right">
                  <FontAwesomeIcon
                    icon={faAngleLeft}
                    size="sm"
                  ></FontAwesomeIcon>
                </span>
              </div>
            )}
          </div>
          {/* --- LABEL Header --- */}
          <div
            className="mainmenu-header"
            style={
              this.props.barToggle === true
                ? { width: "230px" }
                : { width: "70px" }
            }
          >
            LABELS
          </div>
          {/* #1 LABEL */}
          <div className="mainmenu-row">
            <FontAwesomeIcon
              className="mainmenu-fa"
              icon={faCircleNotch}
              style={{ color: "#f39c12 " }}
            ></FontAwesomeIcon>
            {this.props.barToggle && (
              <div>
                <span className="mainmenu-middle">Insect Detected</span>
              </div>
            )}
          </div>
          {/* #2 LABEL */}
          <div className="mainmenu-row">
            <FontAwesomeIcon
              className="mainmenu-fa"
              icon={faCircleNotch}
              style={{ color: "#dd4b39  " }}
            ></FontAwesomeIcon>
            {this.props.barToggle && (
              <div>
                <span className="mainmenu-middle">Severe Infestation</span>
              </div>
            )}
          </div>
        </div>
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
    updateSection: homeActions.updateSection,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(SideBar);
