import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";
//import cac bien mac dinh tu file constant
import { LANGUAGES } from "../../utils";
//import actions
import { changeLanguageApp } from "../../store/actions";
class HomeHeader extends Component {
  changeLanguage = (language) => {
    // alert(language);
    //fire redux event: actions
    this.props.changeLanguageAppRedux(language);
  };
  render() {
    let language = this.props.language;

    console.log(this.props);
    return (
      <>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-header-content">
              <i class="fas fa-bars "></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-header-content">
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.specialty" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.searchdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.heal-facility" />
                  </b>
                </div>
                <div className="sub-title">
                  {" "}
                  <FormattedMessage id="homeheader.select-room" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.selectdoctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.fee" />
                  </b>
                </div>
                <div className="sub-title">
                  <FormattedMessage id="homeheader.check-heal" />
                </div>
              </div>
            </div>
            <div className="right-header-content">
              <div className="support">
                <i class="fas fa-question-circle"></i>
                <span>
                  {" "}
                  <FormattedMessage id="homeheader.support" />
                </span>
              </div>
              <div
                className={
                  language === LANGUAGES.VI
                    ? "language-vi active"
                    : "language-vi"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>{" "}
              </div>
              <div
                className={
                  language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div className="content-up">
            <div className="title1">
              {" "}
              <FormattedMessage id="banner.title1" />
            </div>
            <div className="title2">
              <h1>
                {" "}
                <FormattedMessage id="banner.title2" />
              </h1>
            </div>
            <div className="search">
              <i class="fas fa-search"></i>
              <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
            </div>
          </div>
          <div className="content-down">
            <div className="options">
              <div className="option-child">
                <div className="icon-child one"></div>
                <div className="text-child">
                  {" "}
                  <FormattedMessage id="banner.child1" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child two"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child2" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child three"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child3" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child four"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child4" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child five"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child5" />
                </div>
              </div>
              <div className="option-child">
                <div className="icon-child six"></div>
                <div className="text-child">
                  <FormattedMessage id="banner.child6" />
                </div>
              </div>
            </div>
          </div>
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
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
