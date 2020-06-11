import React, { Component } from "react";
import NavigationBar from "component/bars/NavigationBar";
import SideBar from "component/bars/SideBar";
import Content from "./components/content/Content";
import "./UserPage.sass";
class UserPage extends Component {
  render() {
    return (
      <div className="userPage">
        <div className="navbar">
          <NavigationBar />
        </div>

        <div className="main">
          <SideBar />
          <Content />
        </div>
      </div>
    );
  }
}

export default UserPage;
