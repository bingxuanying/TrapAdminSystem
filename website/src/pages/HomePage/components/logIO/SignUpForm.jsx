import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { homeActions } from "store/actions/index";

class SignUpForm extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      username: this.props.username,
      password: this.props.password,
      rePassword: this.props.rePassword,
    };

    this.props.proceedRegister(data);
  }

  render() {
    return (
      <div className="FormCenter">
        <form onSubmit={this.handleSubmit} className="FormFields">
          <div className="FormField">
            <label className="FormField_Label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="FormField_Input"
              placeholder="Enter your username"
              name="username"
              value={this.props.username}
              onChange={(e) => this.props.updateRegisterUsr(e.target.value)}
            />
          </div>
          <div className="FormField">
            <label className="FormField_Label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="FormField_Input"
              placeholder="Enter your password"
              name="password"
              value={this.props.password}
              onChange={(e) =>
                this.props.updateRegisterPassword(e.target.value)
              }
            />
          </div>
          <div className="FormField">
            <label className="FormField_Label" htmlFor="rePassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="rePassword"
              className="FormField_Input"
              placeholder="Reenter your password"
              name="rePassword"
              value={this.props.rePassword}
              onChange={(e) =>
                this.props.updateRegisterRePassword(e.target.value)
              }
            />
          </div>

          <div className="FormField">
            <button className="FormField_Button mr-20">Sign Up</button>{" "}
            <Link to="/sign-in" className="FormField_Link">
              I'm already member
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    username: state.home.registerInfo.username,
    password: state.home.registerInfo.password,
    rePassword: state.home.registerInfo.rePassword,
  };
};

const mapDispatchToProps = () => {
  return {
    updateRegisterUsr: homeActions.updateRegisterUsr,
    updateRegisterPassword: homeActions.updateRegisterPassword,
    updateRegisterRePassword: homeActions.updateRegisterRePassword,
    proceedRegister: homeActions.proceedRegister,
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps())(SignUpForm)
);
