import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSortAlphaUp,
  faSortAlphaDown,
  faSortAmountUp,
  faSortAmountDown
} from "@fortawesome/free-solid-svg-icons";
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
        var extra = data.length == 5 ? 5 : 5 - data.length;
        for (var i = 0; i < extra; i++) {
          data.push({});
        }
        console.log(data);
        this.setState({ userInfo: data });
      });
  }

  render() {
    const data = this.state.userInfo;

    return (
      <div className="box user-box">
        <div className="box-header">
          <h3 className="box-title">User Data Table</h3>
        </div>
        <div className="box-body">
          <table>
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Number of Traps</th>
                <th>ID</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.company}>
                  <td>{row.company ? row.company : null}</td>
                  <td>{row.totalTraps ? row.totalTraps : null}</td>
                  <td>
                    {row._id
                      ? row._id.slice(Math.max(row._id.length - 10, 1))
                      : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default UserInfoTable;
