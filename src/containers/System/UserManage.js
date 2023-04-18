import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import "./UserManage.scss";
import { connect } from "react-redux";
//import modaluser
import ModalUser from "./ModalUser";
import ModalEditUser from "./ModalEditUser";
//get api
import {
  getAllUsers,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
//import emitter
import { emitter } from "../../utils/emitter";
import { relativeTimeThreshold } from "moment/moment";
class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModaEditUser: false,
      userEdit: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }
  /**
   * Life cycle
   * Run component:
   Đầu tiên khi component được gọi thì hàm hàm constructor() 
   được gọi, sau đó đến componentWillMount(), tiếp theo là reder() ra ngoài và 
   cuối cùng hàm componentDidMount được gọi khi đã render() xong.
   * 1 component co the render nhieu lan nhma chi didmount 1 lan, lan update component
   * sau khong chay vao didmount ma se chay vao ham khac de re-render
   * props giup lay duoc du lieu tu 1 component khac
   *Props cho phép chúng ta giao tiếp giữa các components với nhau bằng cách truyền tham số qua lại giữa các components.

    Khi một components cha truyền cho component con một props(props nay chinh la state cua thang cha co the lay duoc bang viec goi api) thì components con chỉ có thể đọc và
    không có quyền chỉnh sửa nó bên phía components cha.

    fire event:
    child->parent(props)
    parent->child(ref)
    emitter(event)
   */
  //click add new user
  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };
  //click edit user
  handleEditUser = (user) => {
    this.setState({
      isOpenModaEditUser: true,
      userEdit: user,
    });
  };
  //get api edit user sau khi click save user
  doEditUser = async (userUpdate) => {
    try {
      let response = await editUserService(userUpdate);
      if (response && response.errCode !== 0) {
        alert(response.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModaEditUser: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };
  //toggle
  toggleUserModal = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };
  toggleUserEditModal = () => {
    this.setState({
      isOpenModaEditUser: !this.state.isOpenModaEditUser,
    });
  };
  //add new user khi an vao add user
  createNewUser = async (data) => {
    try {
      let response = await createNewUserService(data);

      //cap nhat lai all user ngay sau khi them ma k can refresh bang cach goi 2 api
      if (response && response.message.errCode !== 0) {
        alert(response.message.errMessage);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: false,
        });
        // su dung emitter de clear data khi dien input
        //fire 1 event
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (e) {
      console.log(e);
    }
  };
  //delete user khi an vao thung rac
  handleDeleteUser = async (user) => {
    try {
      let response = await deleteUserService(user.id);
      if (response && response.errCode === 0) {
        await this.getAllUsersFromReact();
      } else {
        alert(response.errMessage);
      }
    } catch (e) {
      console.log(e);
    }
  };

  // lay tat ca user hien thi ra table
  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");

    if (response && response.errCode === 0) {
      // ham setState la ham bat dong bo, tuy nhien 1 so truong hop it data se k anh huong
      //khi co setState component se tu dong render lai them 1 lan
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="user-container">
        <ModalUser
          // truyen 1 state thong thuong
          isOpen={this.state.isOpenModalUser}
          // truyen 1 function
          toggleFromParent={this.toggleUserModal}
          createNewUser={this.createNewUser}
        />
        {this.state.isOpenModaEditUser && (
          <ModalEditUser
            isOpen={this.state.isOpenModaEditUser}
            toggleUserEditModal={this.toggleUserEditModal}
            currentUser={this.state.userEdit}
            editUser={this.doEditUser}
            // toggleFromParent={this.toggleUserModal}
            // createNewUser={this.createNewUser}
          />
        )}
        <div className="title text-center">
          Manage users
          <div className="mx-1 ">
            <button
              className="btn btn-primary px-3"
              onClick={() => this.handleAddNewUser()}
            >
              <i class="fas fa-plus px-3"></i>Add new user
            </button>
          </div>
          <div className="users-table mt-4 mx-4 ">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Actions</th>
                </tr>
                {arrUsers &&
                  arrUsers.length > 0 &&
                  arrUsers.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td> {item.email}</td>
                        <td>{item.firstName}</td>
                        <td>{item.lastName}</td>
                        <td>{item.address}</td>
                        <td>
                          <button
                            className="btn-edit"
                            onClick={() => this.handleEditUser(item)}
                          >
                            <i class="fas fa-edit"></i>
                          </button>
                          <button
                            className="btn-delete"
                            onClick={() => this.handleDeleteUser(item)}
                          >
                            <i class="fas fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
