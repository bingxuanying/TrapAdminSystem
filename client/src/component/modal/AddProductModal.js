import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faToolbox,
  faBuilding,
  faPlusSquare
} from "@fortawesome/free-solid-svg-icons";
import "./Modal.css";
import NewProductStore from "../../stores/NewProductStore";
import * as NewProductActions from "../../actions/NewProductActions";

class AddProductModal extends Component {
  constructor() {
    super();
    this.state = {
      newProducts: NewProductStore.getAll()
    };

    this.getNewProducts = this.getNewProducts.bind(this);
    this.createNew = this.createNew.bind(this);
  }

  componentWillMount() {
    NewProductStore.on("change", this.getNewProducts);
  }

  componentWillUnmount() {
    NewProductStore.removeListener("change", this.getNewProducts);
  }

  getNewProducts() {
    this.setState({
      newProducts: NewProductStore.getAll()
    });
  }

  createNew() {
    NewProductActions.createNew();
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
                  <li key={Math.random()}>
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
              <button
                className="addProduct-add-btn"
                type="button"
                onClick={this.createNew}
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

export default AddProductModal;
