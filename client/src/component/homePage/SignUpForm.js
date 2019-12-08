import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  render() {
    return (
      <div className="FormCenter">
        <form className="FormFields" onSubmit={this.handleSubmit}>
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
            />
          </div>
          <div className="FormField">
            <label className="FormField_Label" htmlFor="reenterPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="reenterPassword"
              className="FormField_Input"
              placeholder="Reenter your password"
              name="reenterPassword"
            />
          </div>

          <div className="FormField">
            <label className="FormField_CheckboxLabel">
              <input
                className="FormField_Checkbox"
                type="checkbox"
                name="hasAgreed"
              />{" "}
              I agree all statements in{" "}
              <a href="" className="FormField_TermsLink">
                terms of service
              </a>
            </label>
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

export default SignUpForm;
