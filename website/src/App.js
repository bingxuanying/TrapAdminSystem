import React, { Component } from "react";
import "App.css";

import { connect } from "react-redux";
import { homeActions } from "store/actions/";
import axios from "axios";

import HomePage from "pages/HomePage/HomePage";
import AdminPage from "pages/AdminPage/AdminPage";
import UserPage from "pages/UserPage/UserPage";

class App extends Component {
  componentDidMount() {
    axios.get("/auth/jwtAuth").then((res) => {
      console.log(res);
      if (!res.err) this.props.updatePage(res.data);
      else
        this.props.updatePage({ role: "home", username: null, company: null });
    });
  }

  render() {
    return (
      <>
        {this.props.page === "home" ? (
          <HomePage />
        ) : this.props.page === "administrator" ? (
          <AdminPage />
        ) : (
          <UserPage />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    page: state.home.userInfo.page,
  };
};

const mapDispatchToProps = () => {
  return {
    updatePage: homeActions.updatePage,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(App);
