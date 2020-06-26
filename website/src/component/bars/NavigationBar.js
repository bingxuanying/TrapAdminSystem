import React, { Component } from "react";
import "./NavigationBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import adminSample from "assets/adminSample.jpg";

import Cookies from "js-cookie";

import { connect } from "react-redux";
import { homeActions, adminActions } from "store/actions/index";

class NavigationBar extends Component {
  constructor() {
    super();
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(e) {
    console.log(document.cookie.length);
    Cookies.remove("token");
    this.props.updatePage({ role: "home", username: null, company: null });
  }

  render() {
    let logoLarge = (
      <div className="position-center">
        <span>
          <b>UC</b>
          Davis
        </span>
      </div>
    );
    let logoSmall = (
      <div className="position-center">
        <span>
          <b>UCD</b>
        </span>
      </div>
    );
    return (
      <nav className="navmain">
        <a
          className="logo"
          style={
            this.props.barToggle === true
              ? { width: "14.5rem" }
              : { width: "70px" }
          }
        >
          {this.props.barToggle === true ? logoLarge : logoSmall}
        </a>

        <div
          className="sidebar-toggle"
          role="button"
          onClick={this.props.switchBarToggle}
        >
          <FontAwesomeIcon
            className="position-center"
            icon={faBars}
            size="1x"
          />
        </div>

        <div className="section-logout" onClick={this.handleLogout}>
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" />
          <span className="logout">Logout</span>
        </div>

        <div className="section-user">
          <img src={adminSample} className="user-image" alt="User Image"></img>
          <span className="user-info">{this.props.username}</span>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    barToggle: state.admin.btn.barToggle,
    username: state.home.userInfo.username,
  };
};

const mapDispatchToProps = () => {
  return {
    switchBarToggle: adminActions.switchBarToggle,
    updatePage: homeActions.updatePage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(NavigationBar);
