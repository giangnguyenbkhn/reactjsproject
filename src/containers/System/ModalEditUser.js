import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
//xu li mang va object bang cu phap ngan gon hon = lodash(giong jquery)
import _ from "lodash";
class ModalEditUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.currentUser;
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hard code",
        firstName: user.firstName,
        lastName: user.lastName,
        gender: user.gender,
        address: user.address,
      });
    }
  }
  //   componentDidUpdate() {
  //     console.log("didupdate edit modal:", this.props.currentUser);
  //   }
  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
    console.log(this.state.gender);
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter :` + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    // let userUpdateId = this.props.currentUser.id;
    if (isValid === true) {
      //call api update user model
      // userUpdateId
      this.props.editUser(this.state);
    }
  };

  toggle = () => {
    this.props.toggleUserEditModal();
  };

  render() {
    // console.log(this.props);
    // console.log(this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>Edit a user </ModalHeader>{" "}
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container form-group">
              <label htmlFor=""> Email </label>{" "}
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "email")}
                value={this.state.email}
                disabled
              />{" "}
            </div>{" "}
            <div className="input-container form-group">
              <label htmlFor=""> Password </label>{" "}
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "password")
                }
                value={this.state.password}
                disabled
              />{" "}
            </div>{" "}
            <div className="input-container form-group">
              <label htmlFor=""> First name </label>{" "}
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />{" "}
            </div>{" "}
            <div className="input-container form-group">
              <label htmlFor=""> Last name </label>{" "}
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />{" "}
            </div>{" "}
            <div className="input-container form-group">
              <label htmlFor="">Gender</label>
              {/* <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "gender")}
                value={this.state.lastName}
              /> */}

              <select
                name=""
                className="select-gender"
                id="gender"
                onChange={(event) => this.handleOnchangeInput(event, "gender")}
                value={this.state.gender}
              >
                <option value="2">Unknown</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>
            <div className="input-container form-group  ">
              <label htmlFor=""> Address </label>{" "}
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "address")}
                value={this.state.address}
              />{" "}
            </div>{" "}
          </div>{" "}
        </ModalBody>{" "}
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleSaveUser()}
          >
            Save changes{" "}
          </Button>{" "}
          <Button
            color="secondary"
            className="px-3 "
            onClick={() => this.toggle()}
          >
            Close{" "}
          </Button>{" "}
        </ModalFooter>{" "}
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
