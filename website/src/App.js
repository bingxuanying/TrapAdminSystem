import React, { Component } from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store/store";
import axios from "axios";

import HomePage from "./pages/HomePage/HomePage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      page: <HomePage />,
    };
  }

  // componentDidMount() {
  //   axios
  //     .get("/jwtAuth")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       if (!data.err) {
  //         switch (data.role) {
  //           case "administrator":
  //             this.setState({
  //               page: <AdminPage />,
  //             });
  //             break;
  //           case "user":
  //             this.setState({
  //               page: <UserPage />,
  //             });
  //             break;
  //           default:
  //             this.setState({
  //               page: <HomePage />,
  //             });
  //             break;
  //         }
  //       }
  //     });
  // }

  render() {
    return <Provider store={store}>{this.state.page}</Provider>;
  }
}

export default App;
