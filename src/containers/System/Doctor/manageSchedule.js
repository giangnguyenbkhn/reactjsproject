import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./manageSchedule.scss";
import * as actions from "../../../store/actions";
import Select from "react-select";
import { LANGUAGES } from "../../../utils";
// import Header from "../containers/Header/Header";
//date picker
import DatePicker from "../../../components/Input/DatePicker";
//moment giup format qua lai kieu du lieu thoi gian
import moment from "moment";
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
  render() {
    // const { isLoggedIn } = this.props;
    // console.log(this.props);
    console.log(this.state);
    let { rangeTime } = this.state;
    let language = this.props.language;
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
                  value={this.state.currentDate[0]}
                  minDate={new Date()}
                  defaultDate={new Date()}
                  // value={this.state.currentDate}
                />
              </div>

              <div className="col-12 pick-hour-container">
                {rangeTime &&
                  rangeTime.length > 0 &&
                  rangeTime.map((item, index) => {
                    return (
                      <button className="btn btn-schedule" key={index}>
                        {language === LANGUAGES.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <div className="col-12">
                <button className="btn btn-primary btn-save-schedule">
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
