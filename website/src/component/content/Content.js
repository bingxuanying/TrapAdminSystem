import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
// import UserInfoTable from "../box/UserInfoTable";
// import ProductInfoTable from "../box/ProductInfoTable";
// import OperatingFloor from "../box/OperatingFloor";
import "./Content.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class Content extends Component {
  constructor() {
    super();

    this.fabSwitch = this.fabSwitch.bind(this);
  }

  fabSwitch(page) {
    switch (page) {
      case "Home":
        return faHome;
      case "Dashboard":
        return faTachometerAlt;
      default:
        return null;
    }
  }

  render() {
    return (
      <div
        className="content-canvas"
        style={
          this.props.barToggle === true
            ? { margin: " 0 0 0 230px", width: "calc(100% - 230px)" }
            : { margin: " 0 0 0 70px", width: "calc(100% - 70px)" }
        }
      >
        {/* Content Header */}
        <section className="content-header">
          <h1>
            {this.props.page}
            <small>Version 1.0</small>
          </h1>
          <ol className="content-header-route">
            <li>
              <a href="#">
                <FontAwesomeIcon
                  className="content-header-fa"
                  icon={this.fabSwitch(this.props.page)}
                  size="xs"
                ></FontAwesomeIcon>{" "}
                Home
              </a>
            </li>
            <li className="end-route">{this.props.page}</li>
          </ol>
        </section>
        {/* Main Content */}
        <section className="content">
          <div className="row">
            {/* <UserInfoTable /> */}
            {/* <ProductInfoTable {...this.props} /> */}
          </div>
          <div className="row">{/* <OperatingFloor /> */}</div>
          <div className="row"></div>
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    page: state.admin.btn.page,
    barToggle: state.admin.btn.barToggle,
  };
};

const mapDispatchToProps = () => {
  return {
    switchBarToggle: adminActions.switchBarToggle,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Content);
