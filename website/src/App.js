import React, { Component } from "react";
import "App.css";

import { connect } from "react-redux";
import { userActions } from "store/actions/index";
import axios from "axios";

import HomePage from "pages/HomePage/HomePage";
// import AdminPage from "pages/AdminPage/AdminPage";
// import UserPage from "pages/UserPage/UserPage";

class App extends Component {
  componentDidMount() {
    axios
      .get("/jwtAuth")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.err) this.props.updatePage(data.role);
        else this.props.updatePage("home");
      });
  }

  render() {
    return (
      <>
        {this.props.page === "home" ? (
          <HomePage />
        ) : this.props.page === "administrator" ? (
          <HomePage />
        ) : (
          <HomePage />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    page: state.user.userInfo.page,
  };
};

const mapDispatchToProps = () => {
  return {
    updatePage: userActions.updatePage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
