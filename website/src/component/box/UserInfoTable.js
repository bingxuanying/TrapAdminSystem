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
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
import * as CompanyInfoActions from "../../actions/CompanyInfoActions";
import CompanyInfoStore from "../../stores/CompanyInfoStore";
import "./Table.css";

class UserInfoTable extends Component {
  constructor() {
    super();

    this.state = {
      companyInfo: CompanyInfoStore.getInfo(),
      pageIndex: 1,
      pageCount: 10,
      loadData: false,
      userInfo: [],
      CompanyNameFilterIcon: faSortAlphaUp,
      TrapNumFilterIcon: faSort
    };

    this.getCompanyInfo = this.getCompanyInfo.bind(this);

    this.handleAlphaFilter = this.handleAlphaFilter.bind(this);
    this.handleAmountFilter = this.handleAmountFilter.bind(this);

    this.handlePaginationStart = this.handlePaginationStart.bind(this);
    this.handlePaginationPre = this.handlePaginationPre.bind(this);
    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationEnd = this.handlePaginationEnd.bind(this);

    this.selectCompany = this.selectCompany.bind(this);
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
      pageIndex: 1
    });
  }

  componentDidMount(e) {
    let order = "";
    if (this.state.CompanyNameFilterIcon === faSort) {
      order =
        this.state.TrapNumFilterIcon === faSortAmountUp
          ? "AmountUp"
          : "AmountDown";
    } else {
      order =
        this.state.CompanyNameFilterIcon === faSortAlphaUp
          ? "AlphaUp"
          : "AlphaDown";
    }

    let pageInfo = {
      pageNum: this.state.pageIndex,
      order: order
    };

    fetch("/data/fetchUserInfo", {
      method: "POST",
      body: JSON.stringify(pageInfo),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        let resPageCount = data.pop().pageCount;
        let extra = 6 - data.length;
        for (let i = 0; i < extra; i++) {
          data.push({});
        }
        // console.log(this.state.CompanyNameFilterIcon === faSortAlphaUp);
        this.setState({
          userInfo: data,
          pageCount: resPageCount,
          loadData: false
        });
      });
  }

  componentDidUpdate(loadData) {
    if (this.state.loadData === true) {
      let order = "";
      if (this.state.CompanyNameFilterIcon === faSort) {
        order =
          this.state.TrapNumFilterIcon === faSortAmountUp
            ? "AmountUp"
            : "AmountDown";
      } else {
        order =
          this.state.CompanyNameFilterIcon === faSortAlphaUp
            ? "AlphaUp"
            : "AlphaDown";
      }

      let pageInfo = {
        pageNum: this.state.pageIndex,
        order: order
      };

      fetch("/data/fetchUserInfo", {
        method: "POST",
        body: JSON.stringify(pageInfo),
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          let resPageCount = data.pop().pageCount;
          let extra = 6 - data.length;
          for (let i = 0; i < extra; i++) {
            data.push({});
          }

          this.setState({
            userInfo: data,
            pageCount: resPageCount,
            loadData: false
          });
        });
    }
  }

  handleAlphaFilter(e) {
    // console.log(this.state.CompanyNameFilterIcon.iconName);
    this.setState({
      TrapNumFilterIcon: faSort
    });
    switch (this.state.CompanyNameFilterIcon.iconName) {
      case "sort":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaUp
        });
        break;
      case "sort-alpha-up":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaDown
        });
        break;
      case "sort-alpha-down":
        this.setState({
          CompanyNameFilterIcon: faSortAlphaUp
        });
        break;
    }
    this.setState({
      loadData: true
    });
  }

  handleAmountFilter(e) {
    e.preventDefault();
    this.setState({
      CompanyNameFilterIcon: faSort
    });
    switch (this.state.TrapNumFilterIcon.iconName) {
      case "sort":
        this.setState({
          TrapNumFilterIcon: faSortAmountUp
        });
        break;
      case "sort-amount-up":
        this.setState({
          TrapNumFilterIcon: faSortAmountDown
        });
        break;
      case "sort-amount-down":
        this.setState({
          TrapNumFilterIcon: faSortAmountUp
        });
        break;
    }
    this.setState({
      loadData: true
    });
  }

  handlePaginationStart(e) {
    if (this.state.pageIndex > 1) {
      this.setState({
        pageIndex: 1,
        loadData: true
      });
    }
  }

  handlePaginationPre(e) {
    let prePage = this.state.pageIndex - 1;

    if (prePage > 0) {
      this.setState({
        pageIndex: prePage,
        loadData: true
      });
    }
  }

  handlePaginationNext(e) {
    let nextPage = this.state.pageIndex + 1;

    if (nextPage <= this.state.pageCount) {
      this.setState({
        pageIndex: nextPage,
        loadData: true
      });
    }
  }

  handlePaginationEnd(e) {
    if (this.state.pageIndex < this.state.pageCount) {
      this.setState({
        pageIndex: this.state.pageCount,
        loadData: true
      });
    }
  }

  selectCompany(e) {
    const company = e.currentTarget.getAttribute("company");
    CompanyInfoActions.selectCompany(company);
  }

  render() {
    const data = this.state.userInfo;
    var { companyInfo } = this.state;

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
                    onClick={this.handleAlphaFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.CompanyNameFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
                <th>
                  Number of Traps{" "}
                  <button
                    className="btn-filter"
                    onClick={this.handleAmountFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.TrapNumFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
                <th>User ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr
                  key={Math.random()}
                  company={row.company}
                  onClick={this.selectCompany}
                  className={
                    companyInfo.name == row.company ? "active-row" : null
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
            <button onClick={this.handlePaginationStart}>
              <FontAwesomeIcon icon={faAngleDoubleLeft}></FontAwesomeIcon>
            </button>{" "}
            <button onClick={this.handlePaginationPre}>
              <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
            </button>{" "}
            <span>
              Page {this.state.pageIndex} of {this.state.pageCount}{" "}
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

export default UserInfoTable;
