import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlusSquare,
  faPenSquare,
  faMinusSquare,
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
  faTimes
} from "@fortawesome/free-solid-svg-icons";
import "./Table.css";

class ProductInfoTable extends Component {
  constructor() {
    super();

    this.state = {
      pageIndex: 1,
      pageCount: 10,
      loadData: false,
      productInfo: [],
      CompanyNameFilterIcon: faSort,
      TrapIDFilterIcon: faSortAmountUp,
      AvailabilityFilterIcon: faSort
    };

    this.handleAlphaFilter = this.handleAlphaFilter.bind(this);
    this.handleAmountFilter = this.handleAmountFilter.bind(this);
    this.handleAvailabilityFilter = this.handleAvailabilityFilter.bind(this);

    this.handlePaginationStart = this.handlePaginationStart.bind(this);
    this.handlePaginationPre = this.handlePaginationPre.bind(this);
    this.handlePaginationNext = this.handlePaginationNext.bind(this);
    this.handlePaginationEnd = this.handlePaginationEnd.bind(this);
  }

  componentDidMount(e) {
    let order = "";
    if (this.state.CompanyNameFilterIcon === faSort) {
      order =
        this.state.TrapIDFilterIcon === faSortAmountUp
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

    fetch("/data/fetchProductInfo", {
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
          productInfo: data,
          pageCount: resPageCount,
          loadData: false
        });
      });
  }

  componentDidUpdate(loadData) {
    if (this.state.loadData === true) {
      let order = "";
      if (this.state.TrapIDFilterIcon !== faSort) {
        order =
          this.state.TrapIDFilterIcon === faSortAmountUp
            ? "AmountUp"
            : "AmountDown";
      } else if (this.state.CompanyNameFilterIcon !== faSort) {
        order =
          this.state.CompanyNameFilterIcon === faSortAlphaUp
            ? "AlphaUp"
            : "AlphaDown";
      } else {
        order =
          this.state.AvailabilityFilterIcon === faCheckCircle
            ? "Available"
            : "Unavailable";
      }

      let pageInfo = {
        pageNum: this.state.pageIndex,
        order: order
      };

      console.log(pageInfo);

      fetch("/data/fetchProductInfo", {
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
            productInfo: data,
            pageCount: resPageCount,
            loadData: false
          });
        });
    }
  }

  handleAlphaFilter(e) {
    // console.log(this.state.CompanyNameFilterIcon.iconName);
    this.setState({
      TrapIDFilterIcon: faSort,
      AvailabilityFilterIcon: faSort
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
      CompanyNameFilterIcon: faSort,
      AvailabilityFilterIcon: faSort
    });
    switch (this.state.TrapIDFilterIcon.iconName) {
      case "sort":
        this.setState({
          TrapIDFilterIcon: faSortAmountUp
        });
        break;
      case "sort-amount-up":
        this.setState({
          TrapIDFilterIcon: faSortAmountDown
        });
        break;
      case "sort-amount-down":
        this.setState({
          TrapIDFilterIcon: faSortAmountUp
        });
        break;
    }
    this.setState({
      loadData: true
    });
  }

  handleAvailabilityFilter(e) {
    e.preventDefault();
    this.setState({
      CompanyNameFilterIcon: faSort,
      TrapIDFilterIcon: faSort
    });
    switch (this.state.AvailabilityFilterIcon.iconName) {
      case "sort":
        this.setState({
          AvailabilityFilterIcon: faCheckCircle
        });
        break;
      case "check-circle":
        this.setState({
          AvailabilityFilterIcon: faTimesCircle
        });
        break;
      case "times-circle":
        this.setState({
          AvailabilityFilterIcon: faCheckCircle
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

  render() {
    const data = this.state.productInfo;

    return (
      <div className="box product-box">
        <div className="box-header">
          <h3 className="box-title">User Data Table</h3>
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
                    onClick={this.handleAmountFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.TrapIDFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
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
                  Status{" "}
                  <button
                    className="btn-filter"
                    onClick={this.handleAvailabilityFilter}
                  >
                    <FontAwesomeIcon
                      icon={this.state.AvailabilityFilterIcon}
                    ></FontAwesomeIcon>
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
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
              onClick={this.props.handleAddBtn}
            >
              <FontAwesomeIcon icon={faPlusSquare}></FontAwesomeIcon>
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

export default ProductInfoTable;
