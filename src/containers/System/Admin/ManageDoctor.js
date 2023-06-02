import React, { Component } from "react";

import "./ManageDoctor.scss";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailDoctorService } from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { compose } from "redux";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //save to markdown table
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
      listDoctor: [],
      hasOldData: false,

      //save doctor infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  //build data theo kieu (label+value) cua react select
  buildDataInputSelect = (inputData, type) => {
    let result = [];
    console.log(type);
    let language = this.props.language;
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item) => {
          let obj = {};
          let labelVi = `${item.firstName} ${item.lastName}`;
          let labelEn = `${item.lastName} ${item.firstName}`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.id;
          result.push(obj);
        });
      } else if (type === "PRICE") {
        inputData.map((item) => {
          let obj = {};
          let labelVi = item.valueVi;
          let labelEn = `${item.valueEn} USD`;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      } else if (type === "PAYMENT" || "PROVINCE") {
        inputData.map((item) => {
          let obj = {};
          let labelVi = item.valueVi;
          let labelEn = item.valueEn;
          obj.label = language === LANGUAGES.VI ? labelVi : labelEn;
          obj.value = item.keyMap;
          result.push(obj);
        });
      }
    }
    return result;
  };
  componentDidMount() {
    this.props.fetchAllDoctors();
    this.props.getRequiredDoctorInfor();
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      this.setState({
        listDoctor: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(
        this.props.allDoctors,
        "USERS"
      );
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;
      if (resPayment && resPrice && resProvince) {
        let dataSelectPrice = this.buildDataInputSelect(resPrice.data, "PRICE");
        let dataSelectPayment = this.buildDataInputSelect(
          resPayment.data,
          "PAYMENT"
        );
        let dataSelectProvince = this.buildDataInputSelect(
          resProvince.data,
          "PROVINCE"
        );
        this.setState({
          listDoctor: dataSelect,
          listPrice: dataSelectPrice,
          listPayment: dataSelectPayment,
          listProvince: dataSelectProvince,
        });
      }
    }

    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice.data, "PRICE");

      let dataSelectPayment = this.buildDataInputSelect(
        resPayment.data,
        "PAYMENT"
      );
      let dataSelectProvince = this.buildDataInputSelect(
        resProvince.data,
        "PROVINCE"
      );
      // console.log(
      //   "data new",
      //   dataSelectPrice,
      //   dataSelectPayment,
      //   dataSelectProvince
      // );
      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
    console.log("handleEditorChange", html, text);
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });

    // handleChangeSelectPrice = async (selectedPrice) => {
    //   this.setState({ selectedPrice }, () =>
    //     console.log(`Option selected:`, this.state.selectedPrice)
    //   );
    //fill thong tin bac si(neu da co khi select bac si)
    let response = await getDetailDoctorService(selectedDoctor.value);
    console.log("thong tin bac si", response);
    if (
      response &&
      response.response.errCode === 0 &&
      response.response.data &&
      (response.response.data.Markdown.description !== null ||
        response.response.data.Markdown.contentHTML !== null ||
        response.response.data.Markdown.contentMarkdown !== null)
    ) {
      let markdown = response.response.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else if (
      response &&
      response.response.errCode === 0 &&
      response.response.data &&
      response.response.data.Markdown.description === null &&
      response.response.data.Markdown.contentHTML === null &&
      response.response.data.Markdown.contentMarkdown === null
    ) {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
  };
  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({ ...stateCopy });
  };
  handleOnchangeText = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({
      ...copyState,
    });
  };
  handleSaveContentMarkdown = () => {
    // console.log(this.state);
    let { hasOldData } = this.state;

    this.props.saveDetailDoctor({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
    this.setState({
      contentHTML: "",
      contentMarkdown: "",
      selectedDoctor: "",
      description: "",
    });
  };
  render() {
    // console.log(this.props.allRequiredDoctorInfor);
    console.log(this.state);

    let hasOldData = this.state.hasOldData;
    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor">
          <div className="content-left form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.select-doctor" />
            </label>
            <Select
              value={this.state.selectedDoctor}
              onChange={this.handleChangeSelect}
              options={this.state.listDoctor}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.select-doctor" />
              }
              name="selectedDoctor"
            />
          </div>
          <div className="content-right form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.intro" />
            </label>
            <textarea
              name=""
              id=""
              cols="6"
              rows="5"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, "description")}
              value={this.state.description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              value={this.state.selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
              name="selectedPrice"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              value={this.state.selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listPayment}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.payment" />
              }
              name="selectedPayment"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              value={this.state.selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={this.state.listProvince}
              placeholder={
                <FormattedMessage id="admin.manage-doctor.province" />
              }
              name="selectedProvince"
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.nameClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, "nameClinic")}
              value={this.state.nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.addressClinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, "addressClinic")}
              value={this.state.addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">
              {" "}
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(e) => this.handleOnchangeText(e, "note")}
              value={this.state.note}
            />
          </div>
        </div>
        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            // truyen props xuong tu cha sang con, 1 function
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "update-content-doctor"
              : "save-content-doctor"
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <FormattedMessage id="admin.manage-doctor.save" />
          ) : (
            <FormattedMessage id="admin.manage-doctor.add" />
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctors: () => dispatch(actions.fetchAllDoctors()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
