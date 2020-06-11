import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./infoBox.sass";

import { connect } from "react-redux";
import { userActions } from "store/actions";

class infoBox extends Component {
  render() {
    var enable = this.props.currentTrap.id !== null ? true : false;
    var { id, num, data } = this.props.currentTrap;
    return (
      <div className="infoBox">
        {/* Header */}
        <div className="box-header">
          <h3 className="box-title">
            Trap #{id + 1} Data - {num + 1}
          </h3>
        </div>

        {/* Info */}
        <div className="infoBox-main">
          {/* Image */}
          <div className="infoBox-img">
            <div className="infoBox-pic"></div>
          </div>
          {/* Data */}
          <div className="infoBox-data">
            <div className="infoBox-row">
              <div className="row-title">Timestamp</div>
              <div className="row-content">{enable && data[num].timeStamp}</div>
            </div>
            <div className="infoBox-row">
              <div className="row-title">Trap Location</div>
              <div className="row-content">
                {enable && data[num].trapLocation}
              </div>
            </div>
            <div className="infoBox-row">
              <div className="row-title">Humidity</div>
              <div className="row-content">{enable && data[num].humidity}</div>
            </div>
            <div className="infoBox-row">
              <div className="row-title">Temperature</div>
              <div className="row-content">
                {enable && data[num].temperature}
              </div>
            </div>
            <div className="infoBox-row">
              <div className="row-title">Insect Count</div>
              <div className="row-content">
                {enable && data[num].particleCount}
              </div>
            </div>
          </div>
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => {
              if (enable) this.props.headTrapData();
            }}
          >
            <FontAwesomeIcon icon={faAngleDoubleLeft} />
          </button>{" "}
          <button
            onClick={() => {
              if (enable) this.props.preTrapData();
            }}
          >
            <FontAwesomeIcon icon={faAngleLeft} />
          </button>{" "}
          <span>
            Page {enable && num + 1} of {enable && data.length - 1}{" "}
          </span>
          <button
            onClick={() => {
              if (enable) this.props.nextTrapData();
            }}
          >
            <FontAwesomeIcon icon={faAngleRight} />
          </button>{" "}
          <button
            onClick={() => {
              if (enable) this.props.endTrapData();
            }}
          >
            <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
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
  return {
    fetchTrapLst: userActions.fetchTrapLst,
    headTrapData: userActions.headTrapData,
    preTrapData: userActions.preTrapData,
    nextTrapData: userActions.nextTrapData,
    endTrapData: userActions.endTrapData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(infoBox);
