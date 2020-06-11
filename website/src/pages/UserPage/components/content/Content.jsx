import React, { Component } from "react";
import Lst from "../lst/Lst";
import InfoBox from "../infoBox/infoBox";
import PlotBox from "../plotBox/plotBox";

import "./Content.sass";

import { connect } from "react-redux";
import { userActions } from "store/actions";

class Content extends Component {
  componentDidMount() {
    this.props.fetchTrapLst();
  }

  render() {
    return (
      <div className="user-content-canvas">
        {/* Content Header */}
        <div className="user-content-header">
          <span>Home ></span>
        </div>
        {/* Main Content */}
        <div className="user-content-main">
          <div className="lst">
            <Lst />
          </div>
          <div className="info">
            <div className="trap">
              <InfoBox />
            </div>
            <div className="plot">
              <PlotBox />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trapLst: state.user.trapLst,
  };
};

const mapDispatchToProps = () => {
  return {
    fetchTrapLst: userActions.fetchTrapLst,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Content);
