import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import NavigationBar from "./bars/NavigationBar";
import SideBar from "./bars/SideBar";
import SideMenu from "./bars/SideMenu";

class AdminLayout extends Component {
  constructor() {
    super();

    this.state = {
      toggleOn: true
    };

    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle(e) {
    this.setState({
      toggleOn: !this.state.toggleOn
    });
  }

  render() {
    return (
      <div>
        <NavigationBar
          handleToggle={this.handleToggle}
          toggleOn={this.state.toggleOn}
        />
        <SideBar />
        <SideMenu toggleOn={this.state.toggleOn} />
      </div>
    );
  }
}

export default AdminLayout;
