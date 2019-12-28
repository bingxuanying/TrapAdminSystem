import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import HomeLayout from "./component/HomeLayout";
import AdminLayout from "./component/AdminLayout";
import UserLayout from "./component/UserLayout";

class App extends Component {
  componentDidMount(e) {
    fetch("/jwtAuth", {
      method: "GET"
    });
  }

  render() {
    return (
      <div>
        <HomeLayout />
      </div>
    );
  }
}

export default App;
