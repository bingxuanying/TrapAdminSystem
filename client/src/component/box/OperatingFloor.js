import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {} from "@fortawesome/free-solid-svg-icons";
import CompanyInfoStore from "../../stores/CompanyInfoStore";
import "./OperatingFloor.css";

class OperatingFloor extends Component {
  constructor() {
    super();

    this.state = {
      companyInfo: CompanyInfoStore.getInfo()
    };

    this.getCompanyInfo = this.getCompanyInfo.bind(this);
  }

  componentWillMount() {
    CompanyInfoStore.on("change", this.getCompanyInfo);
  }

  componentWillUnmount() {
    CompanyInfoStore.removeListener("change", this.getCompanyInfo);
  }

  getCompanyInfo() {
    this.setState({
      companyInfo: CompanyInfoStore.getInfo()
    });
  }

  render() {
    const { companyInfo } = this.state;

    console.log(companyInfo);

    return (
      <div className="box opFloor">
        <h1>info</h1>
        <ul>
          <li>{companyInfo.name}</li>
          <li>{companyInfo.username}</li>
          <li>{companyInfo.numOfProduct}</li>
        </ul>
      </div>
    );
  }
}

export default OperatingFloor;
