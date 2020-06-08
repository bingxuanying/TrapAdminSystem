import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faToolbox,
  faBuilding,
} from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class AddProductModal extends Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    let formData = new FormData(e.target);
    let _formData = Array.from(formData);
    let data = [];

    for (let i = 0; i < _formData.length; i += 2) {
      let dataSet = [];
      dataSet[0] = parseInt(_formData[i][1], 10);
      dataSet[1] = _formData[i + 1][1];
      data.push(dataSet);
    }

    this.props.submitNewProds(data);
  }

  render() {
    return (
      <div className="submit-modal">
        <div className="addProduct-box">
          <button
            className="close-btn"
            type="button"
            onClick={this.props.swithModalAdd}
          >
            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
          </button>
          <div className="addProduct-header">
            <span>Create Account</span>
          </div>
          <div className="addProduct-content">
            <form onSubmit={this.handleSubmit}>
              <ol>
                {this.props.products.map((row) => (
                  <li key={row.id}>
                    <input
                      name={row.id}
                      type="number"
                      placeholder="Prodcut ID"
                      required
                      pattern="^[0-9]\d*$"
                    />
                    <div className="addProduct-content-img addProduct-img1">
                      <FontAwesomeIcon
                        className="addProduct-content-fa"
                        icon={faToolbox}
                      ></FontAwesomeIcon>
                    </div>
                    <input
                      name={row.company}
                      type="text"
                      placeholder="Company (Optional: fill NA instead)"
                      required
                      pattern=".*\S.*"
                    />
                    <div className="addProduct-content-img addProduct-img2">
                      <FontAwesomeIcon
                        className="addProduct-content-fa"
                        icon={faBuilding}
                      ></FontAwesomeIcon>
                    </div>
                  </li>
                ))}
              </ol>
              <button
                className="addProduct-add-btn"
                type="button"
                onClick={this.props.modalAddRow}
              >
                ADD NEW
              </button>
              <button className="addProduct-submit-btn" type="submit">
                SUBMIT
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state.plan[0].home);
  return {
    modalAdd: state.admin.btn.modalAdd,
    products: state.admin.modal.products,
  };
};

const mapDispatchToProps = () => {
  return {
    swithModalAdd: adminActions.swithModalAdd,
    modalAddRow: adminActions.modalAddRow,
    submitNewProds: adminActions.submitNewProds,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(AddProductModal);
