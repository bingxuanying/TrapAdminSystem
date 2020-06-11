import React, { Component } from "react";
import UserInfoTable from "../box/UserInfoTable";
import ProductInfoTable from "../box/ProductInfoTable";
import OperatingFloor from "../box/OperatingFloor";
import "./Content.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions";

class Content extends Component {
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
