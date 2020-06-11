import React, { Component } from "react";
import NavigationBar from "component/bars/NavigationBar";
import SideBar from "component/bars/SideBar";
import Content from "./components/content/Content";
import AddProductModal from "./components/modal/AddProductModal";
import "./AdminPage.sass";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class AdminPage extends Component {
  render() {
    return (
      <div className="adminPage">
        <div className="navbar">
          <NavigationBar />
        </div>

        <div className="main">
          <SideBar />
          <Content />
        </div>

        {this.props.modalAdd && <AddProductModal />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    modalAdd: state.admin.btn.modalAdd,
  };
};

const mapDispatchToProps = () => {
  return {
    swithModalAdd: adminActions.swithModalAdd,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AdminPage);
