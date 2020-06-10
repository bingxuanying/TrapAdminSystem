import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faTachometerAlt } from "@fortawesome/free-solid-svg-icons";
import UserInfoTable from "../box/UserInfoTable";
import ProductInfoTable from "../box/ProductInfoTable";
import OperatingFloor from "../box/OperatingFloor";
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
      <div className="content-canvas">
        {/* Content Header */}
        <div className="content-header">
          <span>Home ></span>
        </div>
        {/* Main Content */}
        <div className="content">
          <div className="content-row">
            <UserInfoTable />
            <ProductInfoTable />
          </div>
          <div className="content-row">
            <OperatingFloor />
          </div>
        </div>
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
