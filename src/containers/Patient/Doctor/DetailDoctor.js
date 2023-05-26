import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "../../../components/HomePage/HomeHeader";
import "./DetailDoctor.scss";
import { getDetailDoctorService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import DoctorSchedule from "./doctorSchedule";
// import { convert } from "html-to-text";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let response = await getDetailDoctorService(id);
      if (response && response.response.errCode === 0) {
        this.setState({
          detailDoctor: response.response.data,
        });
      }
      // console.log("check detail doctor", response);
    }
  }
  componentDidUpdate(prevProps, prevState) {}
  //   convertHtmlToText = (html) => {
  //     const parser = new DOMParser();
  //     const doc = parser.parseFromString(html, "text/html");
  //     return doc.body.textContent;
  //   };
  render() {
    // console.log(this.state);
    let language = this.props.language;
    let detailDoctor = this.state.detailDoctor;
    let nameVi = "";
    let nameEn = "";
    // const options = {
    //   wordwrap: 130,
    //   // ...
    // };
    // let contentHTML = convert(`${detailDoctor.Markdown.contentHTML}`, options);
    // console.log(contentHTML);
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi}, ${detailDoctor.firstName}  ${detailDoctor.lastName}`;
      nameEn = `${detailDoctor.positionData.valueEn}, ${detailDoctor.lastName}  ${detailDoctor.firstName}`;
    }
    return (
      <>
        <HomeHeader isShowBanner={false} />
        <div className="doctor-detail-container">
          <div className="introduction-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {language === LANGUAGES.VI ? nameVi : nameEn}
              </div>
              <div className="down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule
                doctorId={
                  detailDoctor && detailDoctor.id ? detailDoctor.id : -1
                }
              />
            </div>
            <div className="content-right"></div>
          </div>
          <div className="detail-infor-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                >
                  {/* {this.convertHtmlToText(detailDoctor.Markdown.contentHTML)} */}
                </div>
              )}
          </div>

          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
