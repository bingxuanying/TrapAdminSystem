import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faSort,
  faSortAlphaUp,
  faSortAlphaDown,
  faSortAmountUp,
  faSortAmountDown,
  faCheckCircle,
  faTimesCircle,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class ProductInfoTable extends Component {
  componentDidMount() {
    this.props.pageStart("productBox", {
      pageIdx: this.props.pageIdx,
      order: this.props.order,
      totalPages: this.props.totalPages,
    });
  }

  render() {
    return (
      <div className="box product-box">
        <div className="box-header">
          <h3 className="box-title">Product Data Table</h3>
        </div>
        <div className="box-body">
          {/* Main Table */}
          <table>
            <thead>
              <tr>
                <th>
                  Product ID{" "}
                  <button
                    className="btn-filter"
                    onClick={() =>
                      this.props.changeOrder("productBox", {
                        pageIdx: this.props.pageIdx,
                        order: this.props.order,
                        filter: "trap",
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        this.props.order === "AmountUp"
                          ? faSortAmountUp
                          : this.props.order === "AmountDown"
                          ? faSortAmountDown
                          : faSort
                      }
                    />
                  </button>
                </th>
                <th>
                  Company Name{" "}
                  <button
                    className="btn-filter"
                    onClick={() =>
                      this.props.changeOrder("productBox", {
                        pageIdx: this.props.pageIdx,
                        order: this.props.order,
                        filter: "company",
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        this.props.order === "AlphaUp"
                          ? faSortAlphaUp
                          : this.props.order === "AlphaDown"
                          ? faSortAlphaDown
                          : faSort
                      }
                    />
                  </button>
                </th>
                <th>
                  Status{" "}
                  <button
                    className="btn-filter"
                    onClick={() =>
                      this.props.changeOrder("productBox", {
                        pageIdx: this.props.pageIdx,
                        order: this.props.order,
                        filter: "availability",
                      })
                    }
                  >
                    <FontAwesomeIcon
                      icon={
                        this.props.order === "Available"
                          ? faCheckCircle
                          : this.props.order === "Unavailable"
                          ? faTimesCircle
                          : faSort
                      }
                    />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {this.props.productInfo.map((row) => (
                <tr key={Math.random()}>
                  <td>{row.product_id}</td>
                  <td>{row.company}</td>
                  <td>
                    {row.company &&
                      (row.company === "N/A" ? (
                        <div className="status-asg">available</div>
                      ) : (
                        <div className="status-unasg">assigned</div>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Table Tools */}
          <div className="tools">
            <button
              className="tools-btn tools-add"
              onClick={this.props.swithModalAdd}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </button>{" "}
            {/* <button className="tools-btn tools-edit">
              <FontAwesomeIcon icon={faPenSquare}></FontAwesomeIcon>
            </button>{" "}
            <button className="tools-btn tools-delete">
              <FontAwesomeIcon icon={faMinusSquare}></FontAwesomeIcon>
            </button>{" "} */}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() =>
                this.props.pageStart("productBox", {
                  pageIdx: this.props.pageIdx,
                  order: this.props.order,
                  totalPages: this.props.totalPages,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>{" "}
            <button
              onClick={() =>
                this.props.pagePre("productBox", {
                  pageIdx: this.props.pageIdx,
                  order: this.props.order,
                  totalPages: this.props.totalPages,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>{" "}
            <span>
              Page {this.props.pageIdx} of {this.props.totalPages}{" "}
            </span>
            <button
              onClick={() =>
                this.props.pageNext("productBox", {
                  pageIdx: this.props.pageIdx,
                  order: this.props.order,
                  totalPages: this.props.totalPages,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>{" "}
            <button
              onClick={() =>
                this.props.pageEnd("productBox", {
                  pageIdx: this.props.pageIdx,
                  order: this.props.order,
                  totalPages: this.props.totalPages,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    pageIdx: state.admin.productBox.pageIdx,
    totalPages: state.admin.productBox.totalPages,
    productInfo: state.admin.productBox.productInfo,
    order: state.admin.productBox.order,
  };
};

const mapDispatchToProps = () => {
  return {
    pageStart: adminActions.pageStart,
    pagePre: adminActions.pagePre,
    pageNext: adminActions.pageNext,
    pageEnd: adminActions.pageEnd,
    changeOrder: adminActions.changeOrder,
    swithModalAdd: adminActions.swithModalAdd,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(ProductInfoTable);
