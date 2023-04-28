import React, { Component } from "react";
import { connect } from "react-redux";
import "./Medicalfacility.scss";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";
//import Slider
import Slider from "react-slick";
import { divide } from "lodash";
// import MedicalfacilityImg from "../../../assets/Medicalfacility/co-xuong-khop.jpg";

class Medicalfacility extends Component {
  render() {
    let settings = this.props.settings;
    return (
      <>
        <div className="section-share section-medical-facility">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Cơ sở y tế nổi bật</span>
              <button className="btn-section">
                {" "}
                <span>Xem thêm</span>{" "}
              </button>
            </div>
            <div className="section-body ">
              <Slider {...settings}>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 1</h3>
                </div>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 2</h3>
                </div>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 3</h3>
                </div>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 4</h3>
                </div>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 5</h3>
                </div>
                <div className="section-customize">
                  <div className="bg-image" />
                  <h3>Hệ thống y tế Thu Cúc 6</h3>
                </div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Medicalfacility);
