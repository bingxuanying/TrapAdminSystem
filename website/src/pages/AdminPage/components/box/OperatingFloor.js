import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faCheckSquare,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

import { connect } from "react-redux";
import { adminActions } from "store/actions";

class OperatingFloor extends Component {
  constructor() {
    super();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    let req = {
      addTrapNum: this.props.addTrapNum,
      company: this.props.companyInfo.name,
    };

    this.props.assignTrapsOPRT(
      req,
      {
        pageIdx: this.props.userBox.pageIdx,
        order: this.props.userBox.order,
      },
      {
        pageIdx: this.props.productBox.pageIdx,
        order: this.props.productBox.order,
      },
      this.props.companyInfo.name
    );
  }

  render() {
    var { companyInfo } = this.props;
    var pageCount = Math.ceil(companyInfo.productInfo.length / 6);

    return (
      <div className="box opFloor-box">
        <div className="box-header">
          <h3 className="box-title">Company Detailed Info Panel</h3>
        </div>
        {/* Left Box - Info Box */}
        <div className="box-body-left box-body">
          <div className="info-card">
            <div className="info-card-header">Basic Info</div>

            <div className="info-card-body">
              {companyInfo.name === "default" ? null : (
                <div>
                  <h5 className="info-card-title">{companyInfo.name}</h5>
                  <p className="info-card-text">
                    Username: {companyInfo.username}
                  </p>
                  <p className="info-card-text">
                    Owned Products: {companyInfo.numOfProduct}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="box-body-line"></div>
        {/* Right Box - Product Table */}
        <div className="box-body-right box-body">
          <table>
            <thead>
              <tr>
                <th>Trap ID</th>
                <th>Current Location</th>
              </tr>
            </thead>
            <tbody>
              {companyInfo.productInfo
                .slice(this.props.pageIdx * 6 - 6, this.props.pageIdx * 6)
                .map((row) => (
                  <tr
                    key={Math.random()}
                    onClick={() =>
                      this.props.selectTrap(row === -1 ? null : row)
                    }
                    className={this.props._trapid === row ? "active-row" : null}
                  >
                    <td>{row === -1 ? null : row}</td>
                    <td>{row === -1 ? null : "Location"}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          {/* Table Tools */}
          <div className="tools">
            <button
              className={
                this.props.addBtn
                  ? "tools-btn tools-add tools-add-active"
                  : "tools-btn tools-add"
              }
              onClick={() => {
                if (this.props.companyInfo.name !== "default")
                  this.props.switchOPRTAdd();
              }}
            >
              <FontAwesomeIcon icon={faPlusSquare} />
            </button>{" "}
            {this.props.addBtn && (
              <form className="tool-form" onSubmit={this.handleSubmit}>
                <input
                  name="addNewNum"
                  type="text"
                  placeholder="( ex: 1, 2 - 4 )"
                  required
                  pattern="\d*([,-]?\d+[,]?)+"
                  value={this.props.addTrapNum}
                  onChange={(e) => {
                    this.props.onChangeOPRT("addTrapNum", e.target.value);
                  }}
                />
                <button className="tools-btn tools-check" type="submit">
                  <FontAwesomeIcon icon={faCheckSquare} />
                </button>
              </form>
            )}
            {this.props._trapid && (
              <button
                className="tools-btn tools-delete"
                onClick={() =>
                  this.props.unassignTrapsOPRT(
                    {
                      trap_id: this.props._trapid,
                      company: this.props.companyInfo.name,
                    },
                    {
                      pageIdx: this.props.userBox.pageIdx,
                      order: this.props.userBox.order,
                    },
                    {
                      pageIdx: this.props.productBox.pageIdx,
                      order: this.props.productBox.order,
                    }
                  )
                }
              >
                <FontAwesomeIcon icon={faMinusSquare} />
              </button>
            )}{" "}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button
              onClick={() =>
                this.props.pageStart("operatingBox", {
                  pageIdx: this.props.pageIdx,
                  totalPages: pageCount,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleDoubleLeft} />
            </button>{" "}
            <button
              onClick={() =>
                this.props.pagePre("operatingBox", {
                  pageIdx: this.props.pageIdx,
                  totalPages: pageCount,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleLeft} />
            </button>{" "}
            <span>
              Page {this.props.pageIdx} of {pageCount}{" "}
            </span>
            <button
              onClick={() =>
                this.props.pageNext("operatingBox", {
                  pageIdx: this.props.pageIdx,
                  totalPages: pageCount,
                })
              }
            >
              <FontAwesomeIcon icon={faAngleRight} />
            </button>{" "}
            <button
              onClick={() =>
                this.props.pageEnd("operatingBox", {
                  pageIdx: this.props.pageIdx,
                  totalPages: pageCount,
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
    userBox: state.admin.userBox,
    productBox: state.admin.productBox,
    pageIdx: state.admin.operatingBox.pageIdx,
    totalPages: state.admin.operatingBox.totalPages,
    clientInfo: state.admin.operatingBox.clientInfo,
    companyInfo: state.admin.companyInfo,
    _trapid: state.admin.operatingBox._trapid,
    addBtn: state.admin.operatingBox.addBtn,
    addTrapNum: state.admin.operatingBox.addTrapNum,
  };
};

const mapDispatchToProps = () => {
  return {
    pageStart: adminActions.pageStart,
    pagePre: adminActions.pagePre,
    pageNext: adminActions.pageNext,
    pageEnd: adminActions.pageEnd,
    selectTrap: adminActions.selectTrap,
    switchOPRTAdd: adminActions.switchOPRTAdd,
    unassignTrapsOPRT: adminActions.unassignTrapsOPRT,
    onChangeOPRT: adminActions.onChangeOPRT,
    assignTrapsOPRT: adminActions.assignTrapsOPRT,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(OperatingFloor);
