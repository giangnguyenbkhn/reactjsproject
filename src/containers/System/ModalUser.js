import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { connect } from "react-redux";
//import emitter
import { emitter } from "../../utils/emitter";
class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      gender: "",
      address: "",
    };
    //listen event emitter
    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        gender: "",
        address: "",
      });
    });
  }
  componentDidMount() {}
  handleOnchangeInput = (event, id) => {
    // bad code
    //khong bao gio duoc modify truc tiep state nhu nay
    // this.state[id] = event.target.value;
    // this.setState(
    //   {
    //     ...this.state,
    //   },
    //   () => {
    //     console.log(this.state);
    //   }
    // );
    //good code
    //modify gian tiep
    //this.state.email=this.state["email"]
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    console.log(copyState);
    this.setState(
      {
        ...copyState,
      }
      // () => console.log(this.state)
    );
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "address",
      "gender",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert(`Missing parameter :` + arrInput[i]);
        break;
      }
    }
    return isValid;
  };
  handleAddNewUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      //call api create model
      this.props.createNewUser(this.state);
      console.log(this.state);
      //set state cho modal ve rong o day cung duoc neu k muon su dung emitter
      // this.setState({
      //   email: "",
      //   password: "",
      //   firstName: "",
      //   lastName: "",
      //   address: "",
      // });
    }
  };

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    // console.log(this.props);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="lg"
      >
        <ModalHeader toggle={() => this.toggle()}>
          Create a new user{" "}
        </ModalHeader>{" "}
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container form-group">
              <label htmlFor="">Email</label>
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "email")}
                value={this.state.email}
              />
            </div>
            <div className="input-container form-group">
              <label htmlFor="">Password</label>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "password")
                }
                value={this.state.password}
              />
            </div>
            <div className="input-container form-group">
              <label htmlFor="">First name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "firstName")
                }
                value={this.state.firstName}
              />
            </div>
            <div className="input-container form-group">
              <label htmlFor="">Last name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "lastName")
                }
                value={this.state.lastName}
              />
            </div>

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
              >
                <option value="2">Unknown</option>
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </div>

            <div className="input-container form-group ">
              <label htmlFor="">Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "address")}
                value={this.state.address}
              />
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            className="px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add new{" "}
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
