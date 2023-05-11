import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";
class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
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
  }

  render() {
    const { language } = this.props;
    // console.log(this.state);
    const genders = this.state.genderArr;
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
                  <input
                    className="form-control"
                    type="text"
                    placeholder="RoleId"
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.position" />
                  </label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Position"
                  />
                </div>
                <div className="col-4">
                  <label htmlFor="">
                    {" "}
                    <FormattedMessage id="manage-user.image" />
                  </label>
                  <input className="form-control" type="text" />
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
