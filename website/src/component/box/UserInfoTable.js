import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortAlphaUp,
  faSortAlphaDown,
  faSortAmountUp,
  faSortAmountDown,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions/index";

class clientInfoTable extends Component {
  constructor() {
    super();

    this.state = {
      loadData: false,
      clientInfo: [],
    };

    this.selectCompany = this.selectCompany.bind(this);
  }

  componentDidMount(e) {
    this.props.pageStart("userBox", {
      pageIdx: this.props.pageIdx,
      order: this.props.order,
      totalPages: this.props.totalPages,
    });
  }

  selectCompany(e) {
    const company = e.currentTarget.getAttribute("company");
    this.props.selectCompany(company);
  }

  render() {
    return (
      <div className="box user-box">
        <div className="box-header">
          <h3 className="box-title">User Data Table</h3>
        </div>
        <div className="box-body">
          <table>
            <thead>
              <tr>
                <th>
                  Company Name{" "}
                  <button
                    className="btn-filter"
                    onClick={() =>
                      this.props.changeOrder("userBox", {
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
                  Number of Traps{" "}
                  <button
                    className="btn-filter"
                    onClick={() =>
                      this.props.changeOrder("userBox", {
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
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {this.props.clientInfo.map((row) => (
                <tr
                  key={Math.random()}
                  company={row.company}
                  onClick={this.selectCompany}
                  className={
                    this.props.companyInfo.name == row.company
                      ? "active-row"
                      : null
                  }
                >
                  <td>{row.company}</td>
                  <td>{row.totalTraps}</td>
                  <td>
                    {row._id
                      ? row._id.slice(Math.max(row._id.length - 10, 1))
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() =>
                this.props.pageStart("userBox", {
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
                this.props.pagePre("userBox", {
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
                this.props.pageNext("userBox", {
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
                this.props.pageEnd("userBox", {
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
    page: state.admin.btn.page,
    barToggle: state.admin.btn.barToggle,
    pageIdx: state.admin.userBox.pageIdx,
    totalPages: state.admin.userBox.totalPages,
    clientInfo: state.admin.userBox.clientInfo,
    companyInfo: state.admin.companyInfo,
    order: state.admin.userBox.order,
  };
};

const mapDispatchToProps = () => {
  return {
    pageStart: adminActions.pageStart,
    pagePre: adminActions.pagePre,
    pageNext: adminActions.pageNext,
    pageEnd: adminActions.pageEnd,
    selectCompany: adminActions.selectCompany,
    changeOrder: adminActions.changeOrder,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(clientInfoTable);
