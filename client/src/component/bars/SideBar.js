import React, { Component } from "react";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import "./Side.css";

class SideBar extends Component {
  render() {
    return <aside className="sidemain-bar sidemain"></aside>;
  }
}

export default SideBar;
