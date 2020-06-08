import React, { Component } from "react";
import NavigationBar from "component/bars/NavigationBar";
import SideBar from "component/bars/SideBar";
import Content from "component/content/Content";
import AddProductModal from "component/modal/AddProductModal";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class AdminPage extends Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <SideBar />
        <Content
        // toggleOn={this.state.toggleOn}
        // handleAddBtn={this.handleAddBtn}
        />

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
