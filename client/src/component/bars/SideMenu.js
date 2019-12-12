import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./Side.css";

class SideMenu extends Component {
  render() {
    console.log(this.props.toggleOn);
    return (
      <a>
        {this.props.toggleOn === true ? (
          <aside className="sidemain-menu sidemain">
            <div></div>
          </aside>
        ) : (
          <div></div>
        )}
      </a>
    );
  }
}

export default SideMenu;
