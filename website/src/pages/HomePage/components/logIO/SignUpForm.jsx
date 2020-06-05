import React, { Component } from "react";
import { Link } from "react-router-dom";

class SignUpForm extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      reEnterPassword: "",
      hasAgreed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      username: this.state.username,
      password: this.state.password,
      reEnterPassword: this.state.reEnterPassword,
      hasAgreed: this.state.hasAgreed,
    };
    console.log("The form was submitted with the following data:");
    console.log(data);

    fetch("/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        // this.props.history.push("/sign-in");
      });
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
              value={this.state.username}
              onChange={this.handleChange}
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
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="FormField">
            <label className="FormField_Label" htmlFor="reEnterPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="reEnterPassword"
              className="FormField_Input"
              placeholder="Reenter your password"
              name="reEnterPassword"
              value={this.state.reEnterPassword}
              onChange={this.handleChange}
            />
          </div>

          <div className="FormField">
            <label className="FormField_CheckboxLabel">
              <input
                className="FormField_Checkbox"
                type="checkbox"
                name="hasAgreed"
                value={this.state.hasAgreed}
                onChange={this.handleChange}
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
