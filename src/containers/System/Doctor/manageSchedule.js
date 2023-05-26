import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./manageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES, dateFormat } from "../../../utils";
// import Header from "../containers/Header/Header";
//date picker
import DatePicker from "../../../components/Input/DatePicker";
//moment giup format qua lai kieu du lieu thoi gian
import moment from "moment";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
import { saveBulkScheduleDoctor } from "../../../services/userService";
// import FormattedDate from "../../../components/Formating/FormattedDate";

class manageSchedule extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.fetchAllScheduleHours("TIME");
  }
  buildDataInputSelect = (inputData) => {
    let result = [];
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let obj = {};
        let labelVi = `${item.firstName} ${item.lastName}`;
        let labelEn = `${item.lastName} ${item.firstName}`;
        obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
        obj.value = item.id;
        result.push(obj);
      });
    }
    return result;
  };
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors);
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.scheduleTimes !== this.props.scheduleTimes) {
      let data = this.props.scheduleTimes;
      console.log(this.props.scheduleTimes);
      //them thuoc tinh isSelected cho danh sach schedulesTimes
      if (data && data.length > 0) {
        data.map((item) => {
          item.isSelected = false;
          return item;
        });
      }
      this.setState({
        rangeTime: this.props.scheduleTimes,
      });
    }
  }
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor }, () =>
      console.log(`Option selected:`, this.state.selectedDoctor)
    );
  };
  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    // tim xem phan tu time click la phan tu nao cua rangeTime de thay doi isSelected
    if (rangeTime && rangeTime.length > 0) {
      rangeTime.map((item) => {
        if (item.id === time.id) {
          item.isSelected = !item.isSelected;
          return item;
        }
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };
  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];
    if (selectedDoctor && isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor !");
      return;
    }
    if (!currentDate) {
      toast.error("Invalid selected Date !");
      return;
    }
    // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    //convert qua kieu du lieu timestamp
    let formatDate = new Date(currentDate).getTime();
    // let formatDate = moment(currentDate).unix();
    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((item) => {
          let obj = {};
          obj.doctorId = selectedDoctor.value;
          obj.date = formatDate;
          obj.timeType = item.keyMap;
          result.push(obj);
        });
        console.log("day la data gui ve backend", result);
        // return result;
      } else {
        toast.error("Invalid selected Time ");
        return;
      }
    }
    let response = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      date: formatDate,
    });
    console.log("check response save", response);
  };
  render() {
    // const { isLoggedIn } = this.props;
    // console.log(this.props);

    let { rangeTime } = this.state;
    let language = this.props.language;
    var date = new Date();
    return (
      <>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.choose-doctor" />
                </label>
                <Select
                  value={this.state.selectedDoctor}
                  onChange={this.handleChangeSelect}
                  options={this.state.listDoctor}
                />
              </div>
              <div className="col-6 form-group">
                <label htmlFor="">
                  <FormattedMessage id="manage-schedule.choose-date" />
                </label>
                <DatePicker
                  onChange={(date) => this.handleOnchangeDatePicker(date)}
                  className="form-control"
                  value={this.state.currentDate}
                  minDate={date.setDate(date.getDate() - 1)}
                  // defaultDate={new Date()}
                  // value={this.state.currentDate}
                />
              </div>

              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button
                        className={
                          item.isSelected === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                        key={index}
                        onClick={() => this.handleClickBtnTime(item)}
                      >
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button
                  className="btn btn-primary btn-save-schedule"
                  onClick={() => this.handleSaveSchedule()}
                >
                  <FormattedMessage id="manage-schedule.save" />
                </button>
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
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    scheduleTimes: state.admin.scheduleTimes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    fetchAllScheduleHours: (type) =>
      dispatch(actions.fetchAllScheduleHours(type)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(manageSchedule);
