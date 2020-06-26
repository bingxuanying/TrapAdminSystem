import React, { Component } from "react";
import "./plotBox.sass";

import {
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  ComposedChart,
  Area,
  Bar,
  ResponsiveContainer,
} from "recharts";

import { connect } from "react-redux";

class plotBox extends Component {
  render() {
    var { id, data } = this.props.currentTrap;
    return (
      <div className="plotBox">
        {/* Header */}
        <div className="box-header">
          <h3 className="box-title">Trap #{id + 1} Data Plot</h3>
        </div>

        <div className="infoBox-main">
          <ResponsiveContainer
            className="infoBox-main-plot"
            width="95%"
            height="90%"
          >
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="5 5" />
              <XAxis dataKey="timeStamp" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="humidity" stroke="#8884d8" />
              <Line type="monotone" dataKey="temperature" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentTrap: state.user.currentTrap,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps())(plotBox);
