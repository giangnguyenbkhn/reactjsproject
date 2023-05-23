import React, { Component } from "react";
import { connect } from "react-redux";

// import Header from "../containers/Header/Header";

class manageSchedulevidu extends Component {
  render() {
    // const { isLoggedIn } = this.props;
    return (
      <>
        <div>Manage Schedule vidu</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedulevidu);
