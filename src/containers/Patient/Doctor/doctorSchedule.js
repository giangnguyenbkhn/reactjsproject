import React, { Component } from "react";
import { connect } from "react-redux";
import "./doctorSchedule.scss";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import moment from "moment";
//import tieng viet tu moment, mac dinh hieu tieng su dung la tieng viet
import localization from "moment/locale/vi";
import { FormattedMessage } from "react-intl";

// import { convert } from "html-to-text";
class doctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
    };
  }
  async componentDidMount() {
    // console.log("moment vi", moment(new Date()).format("dddd DD/MM"));
    // console.log(
    //   "moment en",
    //   moment(new Date()).locale("en").format("ddd DD/MM")
    // );

    //startOf tra ve 00h00p ngay hom do, neu k ham new Date se lay dung gia tri luc chung ta tao arrDate.(vi database luu date luc 0h00)
    // valueO() convert qua kieu timestamp (1 chuoi so dai)
    let arrDate = [];
    for (let i = 0; i < 7; i++) {
      let obj = {};

      let labelVithuong = moment(new Date())
        .add(i, "days")
        .format("dddd DD/MM");
      let labelEnthuong = moment(new Date())
        .add(i, "days")
        .locale("en")
        .format("ddd DD/MM");
      //format bo dddd
      let ddMMVi = moment(new Date()).add(i, "days").format("DD/MM");
      let ddMMEn = moment(new Date())
        .add(i, "days")
        .locale("en")
        .format(" DD/MM");
      //inhoa chu cai dau tien tieng Viet
      let labelViConvert = this.capitalizeFirstLetter(labelVithuong);
      //lay gia tri today dat ten la hom nay
      if (i === 0) {
        obj.labelVi = `Hôm nay - ${ddMMVi}`;
        obj.labelEn = `Today - ${ddMMEn}`;
      } else {
        obj.labelVi = labelViConvert;
        obj.labelEn = labelEnthuong;
      }

      //convert qua kieu timestamp gui qua database
      obj.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      arrDate.push(obj);
    }
    this.setState({
      allDays: arrDate,
    });
    // console.log(arrDate[0]);
  }
  async componentDidUpdate(prevProps, prevState) {
    if (prevProps.doctorId !== this.props.doctorId) {
      //truong hop mac dinh data schedule se lay cua ngay hien tai luon
      if (this.props.doctorId && this.props.doctorId !== -1) {
        let doctorId = this.props.doctorId;
        let response = await getScheduleDoctorByDate(
          doctorId,
          this.state.allDays[0].value
        );
        this.setState({
          allAvailableTime: response.response.data,
        });
        console.log(response);
      }
    }
  }
  //set in hoa chu cai dau tien
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  handleOnChangeSelectDate = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let response = await getScheduleDoctorByDate(doctorId, date);
      if (response && response.response.errCode === 0) {
        this.setState({
          allAvailableTime: response.response.data
            ? response.response.data
            : [],
        });
      }
    }
  };
  render() {
    // let options = [
    //   { label: "Thứ 2", value: "2" },
    //   { label: "Thứ 3", value: "3" },
    //   { label: "Thứ 4", value: "4" },
    // ];
    let { allDays, allAvailableTime } = this.state;
    console.log(allAvailableTime);
    let language = this.props.language;
    return (
      <div className="doctor-schedule-container">
        <div className="all-schedule">
          {/* <Select
            styles={{
              control: () => ({
                width: 200,
              }),
            }}
            options={options}
          /> */}
          <select
            name=""
            id=""
            onChange={(event) => this.handleOnChangeSelectDate(event)}
          >
            {allDays &&
              allDays.length > 0 &&
              allDays.map((item, index) => {
                return (
                  <option value={item.value} key={index}>
                    {language === LANGUAGES.VI ? item.labelVi : item.labelEn}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="all-available-time">
          <div className="text-calender">
            <i class="fas fa-calendar"></i>
            <span>
              <FormattedMessage id="patient.detail-doctor.schedule" />
            </span>
          </div>
          <div className="time-content">
            {allAvailableTime && allAvailableTime.length > 0 ? (
              <>
                <div className="time-content-button">
                  {allAvailableTime.map((item, index) => {
                    return (
                      <button
                        key={index}
                        className={
                          language === LANGUAGES.VI ? "btn-vie" : "btn-eng"
                        }
                      >
                        {language === LANGUAGES.VI
                          ? item.timeTypeData.valueVi
                          : item.timeTypeData.valueEn}
                      </button>
                    );
                  })}
                </div>
                <div className="book-free">
                  <FormattedMessage id="patient.detail-doctor.choose" />{" "}
                  <i className="fas fa-hand-point-up"></i>{" "}
                  <FormattedMessage id="patient.detail-doctor.book-free" />
                </div>
              </>
            ) : (
              <div className="no-schedule">
                <FormattedMessage id="patient.detail-doctor.no-schedule" />
              </div>
            )}
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(doctorSchedule);
