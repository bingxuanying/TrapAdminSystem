import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import ReactTable from "react-table";
// import "react-table/react-table.css";
import "./Table.css";

class UserInfoTable extends Component {
  constructor() {
    super();

    this.state = {
      userInfo: []
    };
  }

  componentDidMount(e) {
    fetch("/data/fetchUserInfo", {
      method: "GET"
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.setState({ userInfo: data });
      });
  }

  render() {
    const columns = [
      {
        Header: "ID",
        accessor: "_id"
      },
      {
        Header: "Company Name",
        accessor: "company"
      },
      {
        Header: "Number of Traps",
        accessor: "totalTraps"
      }
    ];

    return (
      <div className="box user-box">
        <div className="box-header">
          <h3 className="box-title">User Data Table</h3>
        </div>
        <div className="box-body">
          {/* <ReactTable columns={columns} data={this.state.userInfo}></ReactTable> */}
        </div>
      </div>
    );
  }
}

export default UserInfoTable;
