import React, { Component } from "react";
import { connect } from "react-redux";
//FormattedMessage convert qua lai ngon ngu
import { FormattedMessage } from "react-intl";
//import Slider
import Slider from "react-slick";
import { divide } from "lodash";
// import OutStandingDoctorImg from "../../../assets/OutStandingDoctor/co-xuong-khop.jpg";

class OutStandingDoctor extends Component {
  render() {
    let settings = this.props.settings;
    return (
      <>
        <div className="section-share section-outstanding-doctor">
          <div className="section-container">
            <div className="section-header">
              <span className="title-section">Bác sĩ nổi bật tuần qua</span>
              <button className="btn-section">
                {" "}
                <span>Xem thêm</span>{" "}
              </button>
            </div>
            <div className="section-body ">
              <Slider {...settings}>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 1</div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 2</div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 3</div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 4</div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 5</div>
                  </div>
                </div>
                <div className="section-customize">
                  <div className="outer-bg">
                    <div className="bg-image" />
                  </div>
                  <div className="position text-center">
                    <div>Giáo sư, tiến sĩ ABC</div>
                    <div>Cơ xương khớp 6</div>
                  </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
