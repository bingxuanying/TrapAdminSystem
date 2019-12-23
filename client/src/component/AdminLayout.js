import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import NavigationBar from "./bars/NavigationBar";
import SideBar from "./bars/SideBar";
import Content from "./content/Content";
import AddProductModal from "./modal/AddProductModal";

class AdminLayout extends Component {
  constructor() {
    super();

    this.state = {
      toggleOn: true,
      addBtnOn: false,
      pageName: "Dashboard"
    };

    this.handleToggle = this.handleToggle.bind(this);
    this.handleAddBtn = this.handleAddBtn.bind(this);
  }

  handleToggle(e) {
    this.setState({
      toggleOn: !this.state.toggleOn
    });
  }

  handleAddBtn(e) {
    this.setState({
      addBtnOn: !this.state.addBtnOn
    });
  }

  render() {
    return (
      <div>
        <NavigationBar
          handleToggle={this.handleToggle}
          toggleOn={this.state.toggleOn}
        />
        <SideBar toggleOn={this.state.toggleOn} />
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

export default AdminLayout;
