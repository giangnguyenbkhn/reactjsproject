import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
// import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import "./UserRedux.scss";
//zoom image
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManageUser from "./TableManageUser";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      action: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      userEditId: "",
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
      let arrGender = this.props.gendersRedux;
      this.setState({
        genderArr: arrGender,
        // xet gia tri mac dinh cho gender,position,role
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
      });
    }
    if (prevProps.positionsRedux !== this.props.positionsRedux) {
      let arrPosition = this.props.positionsRedux;
      this.setState({
        positionArr: arrPosition,
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
      });
    }
    if (prevProps.rolesRedux !== this.props.rolesRedux) {
      let arrRole = this.props.rolesRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
      });
    }
    //khi co su thay doi bang listuser(them dc ng dung,xoa ng dung,sua ng dung...) set state ve rong
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGender = this.props.gendersRedux;
      let arrRole = this.props.rolesRedux;
      let arrPosition = this.props.positionsRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGender && arrGender.length > 0 ? arrGender[0].key : "",
        position:
          arrPosition && arrPosition.length > 0 ? arrPosition[0].key : "",
        role: arrRole && arrRole.length > 0 ? arrRole[0].key : "",
        avatar: "",
        action: CRUD_ACTIONS.CREATE,
        userEditId: "",
        previewImgURL: "",
      });
    }
  }
  //thay doi file anh
  handleOnChangeImage = async (event) => {
    let file = event.target.files[0];

    if (file) {
      let base64 = await CommonUtils.getBase64(file);

      let objectUrl = URL.createObjectURL(file);
      // console.log(objectUrl);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
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
  //check validate
  checkValidateInput = () => {
    let isValid = true;
    let arrCheckInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let index = 0; index < arrCheckInput.length; index++) {
      if (!this.state[arrCheckInput[index]]) {
        isValid = false;
        alert("Missing parameter " + [arrCheckInput[index]]);
        break;
      }
    }
    return isValid;
  };
  //bat su thay doi state cua cac input
  onChangeInput = (e, id) => {
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {
        // console.log("onChangeInput", this.state);
      }
    );
  };
  //luu nguoi dung,create/update
  handleSaveUser = () => {
    let checkValidate = this.checkValidateInput();
    if (checkValidate === false) return;
    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      if (checkValidate === true) {
        //fire redux create user
        this.props.createNewUser({
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          address: this.state.address,
          phonenumber: this.state.phoneNumber,
          gender: this.state.gender,
          roleId: this.state.role,
          positionId: this.state.position,
          avatar: this.state.avatar,
        });
      }
    } else if (action === CRUD_ACTIONS.EDIT) {
      //fire redux update user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  handleEditUserFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer.from(user.image, "base64").toString("binary");
      console.log(imageBase64);
    }
    this.setState({
      userEditId: user.id,
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      position: user.positionId,
      role: user.roleId,
      //neu  set gia tri avatar o day la "" thi ben api phai dat truong hop if( truong hop thay doi avatar moi(khac voi giu nguyen)) thi moi cap nhat image
      avatar: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      previewImgURL: imageBase64,
    });
  };
  render() {
    let { language } = this.props;
    // console.log(this.state);
    let genders = this.state.genderArr;
    let roles = this.state.roleArr;
    let positions = this.state.positionArr;
    let isLoadingGender = this.state.isLoadingGender;
    let previewImgURL = this.state.previewImgURL;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      role,
      position,
    } = this.state;
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
                    value={email}
                    onChange={(e) => this.onChangeInput(e, "email")}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
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
                    value={password}
                    onChange={(e) => this.onChangeInput(e, "password")}
                    disabled={this.state.action === CRUD_ACTIONS.EDIT}
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
                    value={firstName}
                    onChange={(e) => this.onChangeInput(e, "firstName")}
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
                    value={lastName}
                    onChange={(e) => this.onChangeInput(e, "lastName")}
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
                    value={phoneNumber}
                    onChange={(e) => this.onChangeInput(e, "phoneNumber")}
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
                    value={address}
                    onChange={(e) => this.onChangeInput(e, "address")}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.gender" />
                  </label>
                  <select
                    id="inputState"
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "gender")}
                    value={gender}
                  >
                    {genders &&
                      genders.length > 0 &&
                      genders.map((item, index) => {
                        return (
                          <option value={item.key} key={index}>
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
                  <select
                    id="inputState"
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "role")}
                    value={role}
                  >
                    {roles &&
                      roles.length > 0 &&
                      roles.map((item, index) => {
                        return (
                          <option value={item.key} key={index}>
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
                  <select
                    id="inputState"
                    class="form-control"
                    onChange={(e) => this.onChangeInput(e, "position")}
                    value={position}
                  >
                    {positions &&
                      positions.length > 0 &&
                      positions.map((item, index) => {
                        return (
                          <option value={item.key} key={index}>
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
                  <button
                    className={
                      this.state.action === CRUD_ACTIONS.EDIT
                        ? "btn btn-warning mt-3"
                        : "btn btn-primary mt-3"
                    }
                    onClick={() => this.handleSaveUser()}
                  >
                    {" "}
                    {this.state.action === CRUD_ACTIONS.EDIT ? (
                      <FormattedMessage id="manage-user.edit" />
                    ) : (
                      <FormattedMessage id="manage-user.save" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <TableManageUser
              handleEditUserFromParent={this.handleEditUserFromParent}
              action={this.state.action}
            />
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
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    //create user redux
    createNewUser: (dataUSer) => dispatch(actions.createNewUser(dataUSer)),
    //read all user redux
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    //update user redux
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
