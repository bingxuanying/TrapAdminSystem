import React, { Component } from "react";
import "./Lst.sass";

import { connect } from "react-redux";
import { userActions } from "store/actions";

class Lst extends Component {
  render() {
    return (
      <div className="traplst">
        <div className="traplst-title">Trap List</div>
        <div className="traplst-main">
          {this.props.trapLst.map((item) => (
            <div
              className="trap"
              style={
                item === this.props.curid ? { backgroundColor: "#dbdbdb" } : {}
              }
              onClick={() => this.props.fetchTrapData(item)}
            >
              {item + 1}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    trapLst: state.user.trapLst,
    curid: state.user.currentTrap.id,
  };
};

const mapDispatchToProps = () => {
  return {
    fetchTrapData: userActions.fetchTrapData,
  };
};

export default connect(mapStateToProps, mapDispatchToProps())(Lst);
