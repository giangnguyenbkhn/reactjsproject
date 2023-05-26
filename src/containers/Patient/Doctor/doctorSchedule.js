import React, { Component } from "react";
import { connect } from "react-redux";
import "./doctorSchedule.scss";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import Select from "react-select";
import moment from "moment";
//import tieng viet tu moment, mac dinh hieu tieng su dung la tieng viet
import localization from "moment/locale/vi";
// import { convert } from "html-to-text";
class doctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
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

      obj.labelVi = moment(new Date()).add(i, "days").format("dddd DD/MM");

      obj.labelEn = moment(new Date())
        .add(i, "days")
        .locale("en")
        .format("ddd DD/MM");

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
        console.log(response);
      }
    }
  }
  handleOnChangeSelectDate = async (event) => {
    if (this.props.doctorId && this.props.doctorId !== -1) {
      let doctorId = this.props.doctorId;
      let date = event.target.value;
      let response = await getScheduleDoctorByDate(doctorId, date);
      console.log(response);
    }
  };
  render() {
    // let options = [
    //   { label: "Thứ 2", value: "2" },
    //   { label: "Thứ 3", value: "3" },
    //   { label: "Thứ 4", value: "4" },
    // ];
    let { allDays } = this.state;
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
        <div className="all-available-time"></div>
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
