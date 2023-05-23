import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
// import { FormattedMessage } from "react-intl";
//import services
import { handleLogin } from "../../services/userService";
class Login extends Component {
  // trước khi component render sẽ chạy vào hàm tạo constructor
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      errMessage: "",
      isShowPassword: false,
    };
  }
  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  handleLogin = async () => {
    this.setState({
      errMessage: "",
    });
    try {
      // truong hop nhap day du email va password
      //data nhan duoc day du tu api
      let data = await handleLogin(this.state.username, this.state.password);
      //bat su kien nhap sai email, pass,...
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginsuccess(data.user);
        console.log("loggin success");
      }
    } catch (e) {
      // ma loi trong truong hop khong nhap email or password
      if (e.response) {
        if (e.response.data) {
          this.setState({
            errMessage: e.response.data.message,
          });
        }
      }
      console.log(e.response);
    }
  };
  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };
  handleKeyDown = (e) => {
    console.log(e.key);
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };
  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 text-center text-login"> Login </div>{" "}
            <div className="col-12 form-group login-input">
              <label> Username: </label>{" "}
              <input
                type="text"
                placeholder="Enter your username"
                className="form-control"
                value={this.state.username}
                onChange={(event) => this.handleOnChangeUsername(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />{" "}
            </div>{" "}
            <div className="col-12 form-group login-input">
              <label> Password: </label>{" "}
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type={this.state.isShowPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(event) => this.handleOnChangePassword(event)}
                  onKeyDown={(event) => this.handleKeyDown(event)}
                />{" "}
                <span onClick={() => this.handleShowHidePassword()}>
                  {" "}
                  {
                    <i
                      className={
                        this.state.isShowPassword
                          ? "fas fa-eye"
                          : "fas fa-eye-slash"
                      }
                    ></i>
                  }{" "}
                </span>{" "}
              </div>{" "}
            </div>{" "}
            <div className="col-12 " style={{ color: "red" }}>
              {" "}
              {this.state.errMessage}{" "}
            </div>{" "}
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleLogin()}>
                {" "}
                Login{" "}
              </button>{" "}
            </div>{" "}
            <div className="col-12">
              <span className="forgot-password">
                <a href="/"> Forgot your password ? </a>{" "}
              </span>{" "}
            </div>{" "}
            <div className="col-12 text-center mt-3">
              <span> Or Login With </span>{" "}
            </div>{" "}
            <div className="col-12 social-login">
              <span>
                <i class="fab fa-google-plus-g google"> </i>{" "}
              </span>{" "}
              <span>
                <i class="fab fa-facebook-f facebook"> </i>{" "}
              </span>{" "}
              <span>
                <i class="fab fa-instagram instagram"> </i>{" "}
              </span>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
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
  return {
    navigate: (path) => dispatch(push(path)),
    //truyen userInfo cho actions va reducers xu li va duoc luu o localstorage
    userLoginsuccess: (userInfo) =>
      //ham dispatch o duoi tuong duong : dispatch({ type: 'USER_LOGIN_SUCCESS',payload:userInfo })}
      dispatch(actions.userLoginsuccess(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
