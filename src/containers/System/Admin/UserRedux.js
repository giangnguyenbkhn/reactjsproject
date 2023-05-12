import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
//zoom image
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // console.log("day la didmout");
    // try {
    //   let response = await getAllCodeService("gender");
    //   if (response && response.data && response.data.errCode === 0) {
    //     this.setState({
    //       genderArr: response.data.data,
    //     });
    //   }
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  //componentDidUpdate luon chay, de no k chay de 1 dieu kien trong do(if sau do moi goi ham)
  //didmount chay trc va didupate se chay sau
  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.log("day la didupdate");
    //chay render trc => sau do didupdate
    //hien tai(this) va qua khu(prev)
    if (prevProps.gendersRedux !== this.props.gendersRedux) {
      this.setState({
        genderArr: this.props.gendersRedux,
      });
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      this.setState({
        positionArr: this.props.positionsRedux,
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      this.setState({
        roleArr: this.props.rolesRedux,
      });
    }
  }
  //thay doi file anh
  handleOnChangeImage = (event) => {
    let file = event.target.files[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
      });
    }
  };
  //zoom anh
  openPreviewImage = () => {
    if (this.state.previewImgURL === "") {
      return;
    }
    this.setState({ isOpen: true });
  };
  render() {
    let { language } = this.props;
    console.log(this.state);
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.state.isLoadingGender;
    let previewImgURL = this.state.previewImgURL;

    return (
      <>
        <div className="user-redux-container">
          <div className="title">User Redux GNHUST</div>

          <div className="user-redux-body">
            <div className="container">
              <div className="row">
                <div className="col-12 text-center">
                  <FormattedMessage id="manage-user.add" />
                </div>
                {/*test bat dong bo*/}
                <div className="col-12">
                  {isLoadingGender === true ? "Loading genders" : ""}
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.email" />
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    <FormattedMessage id="manage-user.password" />
                  </label>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.first-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="FirstName"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.last-name" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="LastName"
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.phone-number" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Phone Number"
                  />
                </div>
                <div className="col-6">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.address" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Address"
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select id="inputState" class="form-control">
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option value="" key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.role" />
                  </label>
                  <select id="inputState" class="form-control">
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option value="" key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <select id="inputState" class="form-control">
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option value="" key={index}>
                            {language === LANGUAGES.VI
                              ? item.valueVi
                              : item.valueEn}
                          </option>
                        );
                      })}
                  </select>
                </div>
                <div className="col-4">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <div className="preview-img-container">
                    <input
                      id="previewImg"
                      type="file"
                      hidden
                      onChange={(e) => this.handleOnChangeImage(e)}
                    />
                    <label className="label-upload" htmlFor="previewImg">
                      Tải ảnh
                      <i className="fas fa-upload"></i>
                    </label>
                    <div
                      className="preview-image"
                      style={{ backgroundImage: `url(${previewImgURL})` }}
                      onClick={() => this.openPreviewImage()}
                    ></div>
                  </div>
                </div>
                <div className="col-12">
                  {" "}
                  <button className="btn btn-primary mt-3">
                    {" "}
                    <FormattedMessage id="manage-user.save" />
                  </button>
                </div>
              </div>
            </div>
            ;
            {this.state.isOpen === true && (
              <Lightbox
                mainSrc={this.state.previewImgURL}
                onCloseRequest={() => this.setState({ isOpen: false })}
              />
            )}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    gendersRedux: state.admin.genders,
    rolesRedux: state.admin.roles,
    positionsRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
