import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

class AddProductModal extends Component {
  render() {
    return (
      <div className="submit-modal">
        <div className="addProduct-content">
          <button className="close" onClick={this.props.handleAddBtn}>
            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
          </button>
          <h1>Create Account</h1>
          <form action="/register" method="POST">
            <input
              className="info-box"
              name="username"
              type="text"
              placeholder="Account Name"
            />
            <input
              className="info-box"
              name="password"
              type="text"
              placeholder="Password"
            />
            <input
              className="info-box"
              name="reEnterPassword"
              type="text"
              placeholder="Reenter Password"
            />
            <input
              className="register-btn"
              type="submit"
              name=""
              value="register"
            />
          </form>
        </div>
      </div>
    );
  }
}

export default AddProductModal;
