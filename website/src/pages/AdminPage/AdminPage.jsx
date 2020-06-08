import React, { Component } from "react";
import NavigationBar from "component/bars/NavigationBar";
import SideBar from "component/bars/SideBar";
import Content from "component/content/Content";
import AddProductModal from "component/modal/AddProductModal";

class AdminPage extends Component {
  constructor() {
    super();

    this.state = {
      toggleOn: true,
      addBtnOn: false,
      pageName: "Dashboard",
      productLoading: false,
      userLoading: false,
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.handleLoading = this.handleLoading.bind(this);
  }

  handleToggle(e) {
    this.setState({
      toggleOn: !this.state.toggleOn,
    });
  }

  handleAddBtn(e) {
    this.setState({
      addBtnOn: !this.state.addBtnOn,
    });
  }

  handleLoading(e) {
    this.setState({
      productLoading: true,
      userLoading: true,
    });
  }

  render() {
    return (
      <div>
        <NavigationBar />
        <SideBar />
        <Content
          toggleOn={this.state.toggleOn}
          handleAddBtn={this.handleAddBtn}
          pageName={this.state.pageName}
        />

        {this.state.addBtnOn && (
          <AddProductModal handleAddBtn={this.handleAddBtn} />
        )}
      </div>
    );
  }
}

export default AdminPage;
