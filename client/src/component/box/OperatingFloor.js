import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faMinusSquare,
  faCheckSquare,
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import CompanyInfoStore from "../../stores/CompanyInfoStore";
import "./Table.css";

class OperatingFloor extends Component {
  constructor() {
    super();

    this.state = {
      companyInfo: CompanyInfoStore.getInfo(),
      pageIndex: 1,
      addBtnActive: false,
      addNewNum: "",
      trapSelected: false,
      selectTrapId: -1
    };

    this.getCompanyInfo = this.getCompanyInfo.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.handlePaginationStart = this.handlePaginationStart.bind(this);
    this.handlePaginationPre = this.handlePaginationPre.bind(this);
    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationEnd = this.handlePaginationEnd.bind(this);
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.selectTrap = this.selectTrap.bind(this);
  }

  componentWillMount() {
    CompanyInfoStore.on("change", this.getCompanyInfo);
  }

  componentWillUnmount() {
    CompanyInfoStore.removeListener("change", this.getCompanyInfo);
  }

  getCompanyInfo() {
    this.setState({
      companyInfo: CompanyInfoStore.getInfo(),
      pageIndex: 1,
      trapSelected: false,
      selectTrapId: -1
    });
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    let data = {
      addNewNum: this.state.addNewNum,
      company: this.state.companyInfo.name
    };

    fetch("/data/AssignProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      // this.props.history.push("/sign-in");
      console.log(res.status);
      this.setState({
        addBtnActive: false,
        addNewNum: ""
      });
    });
  }

  handleDelete(e) {
    e.preventDefault();
    let data = {
      trap_id: this.state.selectTrapId,
      company: this.state.companyInfo.name
    };

    fetch("/data/UnassignProduct", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(res => {
      // this.props.history.push("/sign-in");
      console.log(res.status);
    });
  }

  handlePaginationStart(e) {
    if (this.state.pageIndex > 1) {
      this.setState({
        pageIndex: 1
      });
    }
  }

  handlePaginationPre(e) {
    let prePage = this.state.pageIndex - 1;

    if (prePage > 0) {
      this.setState({
        pageIndex: prePage
      });
    }
  }

  handlePaginationNext(e) {
    let nextPage = this.state.pageIndex + 1;

    if (nextPage <= this.state.companyInfo.productInfo.length / 6) {
      this.setState({
        pageIndex: nextPage
      });
    }
  }

  handlePaginationEnd(e) {
    if (this.state.pageIndex < this.state.companyInfo.productInfo.length / 6) {
      this.setState({
        pageIndex: this.state.companyInfo.productInfo.length / 6
      });
    }
  }

  handleAddBtn(e) {
    if (this.state.companyInfo.name !== "default") {
      this.setState({
        addBtnActive: !this.state.addBtnActive
      });
    }
  }

  async selectTrap(e) {
    let trap_id = parseInt(e.currentTarget.getAttribute("trap_id"), 10);
    await this.setState({
      trapSelected: true,
      selectTrapId: trap_id
    });
    console.log(this.state.trapSelected, this.state.selectTrapId);
  }

  render() {
    var { companyInfo } = this.state;
    var pageCount = this.state.companyInfo.productInfo.length / 6;

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
                .slice(this.state.pageIndex * 6 - 6, this.state.pageIndex * 6)
                .map(row => (
                  <tr
                    key={Math.random()}
                    trap_id={row === -1 ? null : row}
                    onClick={this.selectTrap}
                    className={
                      this.state.selectTrapId === row ? "active-row" : null
                    }
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
                this.state.addBtnActive
                  ? "tools-btn tools-add tools-add-active"
                  : "tools-btn tools-add"
              }
              onClick={this.handleAddBtn}
            >
              <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
            </button>{" "}
            {this.state.addBtnActive && (
              <form className="tool-form" onSubmit={this.handleSubmit}>
                <input
                  name="addNewNum"
                  type="text"
                  placeholder="( ex: 1, 2 - 4 )"
                  required
                  pattern="\d*([,-]?\d+[,]?)+"
                  value={this.state.addNewNum}
                  onChange={this.handleChange}
                />
                <button className="tools-btn tools-check" type="submit">
                  <FontAwesomeIcon icon={faCheckSquare}></FontAwesomeIcon>
                </button>
              </form>
            )}
            {this.state.trapSelected && (
              <button
                className="tools-btn tools-delete"
                onClick={this.handleDelete}
              >
                <FontAwesomeIcon icon={faMinusSquare}></FontAwesomeIcon>
              </button>
            )}{" "}
          </div>
          {/* Pagination */}
          <div className="pagination">
            <button onClick={this.handlePaginationStart}>
              <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
            </button>{" "}
            <button onClick={this.handlePaginationPre}>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>{" "}
            <span>
              Page {this.state.pageIndex} of {pageCount}{" "}
            </span>
            <button onClick={this.handlePaginationNext}>
              <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
            </button>{" "}
            <button onClick={this.handlePaginationEnd}>
              <FontAwesomeIcon icon={faAngleDoubleRight}></FontAwesomeIcon>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default OperatingFloor;
