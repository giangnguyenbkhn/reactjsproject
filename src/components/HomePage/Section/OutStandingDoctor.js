import React, { Component } from "react";
import { connect } from "react-redux";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";
import { LANGUAGES } from "../../../utils/constant";
//import Slider
import Slider from "react-slick";

// import OutStandingDoctorImg from "../../../assets/OutStandingDoctor/co-xuong-khop.jpg";
import * as actions from "../../../store/actions";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }
  componentDidMount() {
    this.props.loadTopDoctors();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topDocTorRedux !== this.props.topDocTorRedux) {
      this.setState({
        arrDoctor: this.props.topDocTorRedux,
      });
    }
  }
  render() {
    let language = this.props.language;
    let arrDoctor = this.state.arrDoctor;
    console.log(this.props.topDocTorRedux);
    let settings = this.props.settings;
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">
                <FormattedMessage id="homepage.out-standing-doctor" />
              </span>
              <button className="btn-section">
                {" "}
                <span>
                  {" "}
                  <FormattedMessage id="homepage.more-infor" />
                </span>{" "}
              </button>
            </div>
            <div className="section-body ">
              <Slider {...settings}>
                {arrDoctor &&
                  arrDoctor.length > 0 &&
                  arrDoctor.map((item, index) => {
                    let imageBase64 = "";
                    if (item.image) {
                      imageBase64 = new Buffer.from(
                        item.image,
                        "base64"
                      ).toString("binary");
                    }
                    let nameVi = `${item.positionData.valueVi}, ${item.firstName}  ${item.lastName}`;
                    let nameEn = `${item.positionData.valueEn}, ${item.lastName}  ${item.firstName}`;
                    return (
                      <div className="section-customize" key={index}>
                        <div className="outer-bg">
                          <div
                            className="bg-image"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                          />
                        </div>
                        <div className="position text-center">
                          <div>
                            {language === LANGUAGES.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ xương khớp 1</div>
                        </div>
                      </div>
                    );
                  })}
              </Slider>
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
    topDocTorRedux: state.admin.topDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
