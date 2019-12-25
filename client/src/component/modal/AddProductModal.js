import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faToolbox,
  faBuilding,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";
import NewProducts from "../../stores/NewProductStore";

class AddProductModal extends Component {
  constructor() {
    super();
    this.state = {
      newProducts: NewProducts.getAll()
    };
  }

  render() {
    const { newProducts } = this.state;

    return (
      <div className="submit-modal">
        <div className="addProduct-box">
          <button className="close-btn" onClick={this.props.handleAddBtn}>
            <FontAwesomeIcon icon={faTimesCircle}></FontAwesomeIcon>
          </button>
          <div className="addProduct-header">
            <span>Create Account</span>
          </div>
          <div className="addProduct-content">
            <form>
              <ol>
                {newProducts.map(row => (
                  <li key={row.id + row.company}>
                    <input
                      name="product_id"
                      type="number"
                      placeholder={row.id}
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
                      name="company"
                      type="text"
                      placeholder={row.company}
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
              <button className="addProduct-add-btn" type="button">
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

export default AddProductModal;
