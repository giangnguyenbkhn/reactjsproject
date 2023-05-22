import React, { Component } from "react";
import { connect } from "react-redux";

// import Header from "../containers/Header/Header";

class manageSchedule extends Component {
  render() {
    // const { isLoggedIn } = this.props;
    return (
      <>
        <div>Manage Schedule</div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);
