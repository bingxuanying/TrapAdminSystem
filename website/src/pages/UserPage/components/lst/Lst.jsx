import React, { Component } from "react";
import "./Lst.sass";

import { connect } from "react-redux";
import { userActions } from "store/actions";

class Lst extends Component {
  render() {
    return (
      <div className="traplst">
        <div className="box-header">
          <h3 className="box-title">Trap List</h3>
        </div>
        <div className="traplst-main">
          {this.props.trapLst.map((trapid) => {
            if (this.props.section === "Grain") {
              return (
                <div
                  className="trap"
                  style={
                    trapid === this.props.curid
                      ? { backgroundColor: "#3c8dbc" }
                      : {}
                  }
                  onClick={() => this.props.fetchTrapData(trapid)}
                >
                  {trapid}
                </div>
              );
            } else if (this.props.section === "Almond") {
              return trapid === 1 || trapid == 2 ? (
                <div
                  className="trap"
                  style={
                    trapid === this.props.curid
                      ? { backgroundColor: "#3c8dbc" }
                      : {}
                  }
                  onClick={() => this.props.fetchTrapData(trapid)}
                >
                  {trapid}
                </div>
              ) : (
                <></>
              );
            }
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trapLst: state.user.trapLst,
    curid: state.user.currentTrap.id,
    section: state.home.userInfo.section,
  };
};

const mapDispatchToProps = () => {
  return {
    fetchTrapData: userActions.fetchTrapData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Lst);
