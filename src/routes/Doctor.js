import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";

import Header from "../containers/Header/Header";
import manageSchedule from "../containers/System/Doctor/manageSchedule";
import manageSchedulevidu from "../containers/System/Doctor/manageSchedulevidu";

class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={manageSchedule}
              />
              <Route
                path="/doctor/manage-schedule-vidu"
                component={manageSchedulevidu}
              />
            </Switch>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    DoctorMenuPath: state.app.DoctorMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);
// dieu huong 2
