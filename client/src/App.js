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
  constructor() {
    super();
    this.state = {
      page: <HomeLayout />
    };
  }

  componentDidMount(e) {
    fetch("/jwtAuth", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        if (!data.err) {
          switch (data.role) {
            case "administrator":
              this.setState({
                page: <AdminLayout />
              });
              break;
            case "user":
              this.setState({
                page: <UserLayout />
              });
              break;
          }
        }
      });
  }

  render() {
    return <div>{this.state.page}</div>;
  }
}

export default App;
