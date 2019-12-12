import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Link
} from "react-router-dom";
import HomeLayout from "./component/HomeLayout";
import AdminLayout from "./component/AdminLayout";

class App extends Component {
  render() {
    return (
      <div>
        <AdminLayout />
      </div>
    );
  }
}

export default App;
