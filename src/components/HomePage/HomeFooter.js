import React, { Component } from "react";
import { connect } from "react-redux";
// import "./HomeFooter.scss";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";

class HomeFooter extends Component {
  render() {
    return (
      <>
        <div className="home-footer">
          <p>
            &copy; 2023 GNHUST. More Information to{" "}
            <a href="https://gnhust.online/" target="blank">
              gnhust.online
            </a>
          </p>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
