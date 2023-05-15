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
  getKeyUser,
  // getKeyGender,
  createNewUserService,
  deleteUserService,
  editUserService,
} from "../../services/userService";
//import emitter
import { emitter } from "../../utils/emitter";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModaEditUser: false,
      userEdit: {},
      keySearch: {
        keySearchName: "",
        keySearchGender: "ALL",
      },
    };
  }

  async componentDidMount() {
    // console.log("didmount");
    await this.getAllUsersFromReact();
  }

  /**
   * Life cycle(Luong Mounting)
   * Run component:
   1 Run constructor->init state
   2 Render lan dau tien(chua quan tam den state)
   3 Did mount(set state thay doi de render lan 2)
   4 Render lan 2 sau khi da set state ...(re-render)
   Moi khi thuc hien 1 dieu kien nao vi du co ham setState, ham render se chay 2 lan, lan 1 chay k quan tam den state, lan 2 update state va chay lai
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
      // console.log(response);
      //cap nhat lai all user ngay sau khi them ma k can refresh bang cach goi 2 api
      if (response && response.errCode !== 0) {
        alert(response.errMessage);
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
      //ham setState la ham bat dong bo, tuy nhien 1 so truong hop it data se k anh huong
      //khi co setState component se tu dong render lai them 1 lan
      this.setState({
        arrUsers: response.users,
      });
    }
  };
  //xu li su kien onChange thanh search nguoi dung
  //setState la ham bat dong bo, goi call back, sau khi setState xong moi goi den ham RequestSearch
  handleSearch = (e, id) => {
    let copySearchState = { ...this.state.keySearch };
    copySearchState[id] = e.target.value;
    this.setState(
      {
        keySearch: { ...copySearchState },
      },
      async () => await this.RequestSearch()
    );
  };
  //handle search gender
  // handleSearchGender = (e) => {
  //   this.setState(
  //     {
  //       keySearchGender: e.target.value,
  //     },
  //     async () => await this.RequestSearchGender()
  //   );
  // };
  //gui searchKey toi api
  RequestSearch = async () => {
    // console.log(this.state.keySearch);
    let response = await getKeyUser(this.state.keySearch);
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }

    if (this.state.keySearch === "") {
      await this.getAllUsersFromReact();
    }
  };
  //gui search gender toi api
  // RequestSearchGender = async () => {
  //   let response = await getKeyGender(this.state.keySearchGender);
  //   if (response && response.errCode === 0) {
  //     this.setState({
  //       arrUsers: response.users,
  //     });
  //   }
  // };

  render() {
    //  console.log("render");
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
        {/* khi nao an vao nut sua thi moi mount component modaedituser, de su dung duoc ham component didupdate ben modaledituser */}
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
          <div className="mx1 mt-3">
            <input
              placeholder="Enter name to find"
              onChange={(e) => this.handleSearch(e, "keySearchName")}
            ></input>
            {/* <button
              className="mx1"
              type="submit"
              onClick={() => this.getUserFromKey()}
            >
              Search
            </button> */}
            <select
              name=""
              id=""
              className="p-1"
              onChange={(e) => this.handleSearch(e, "keySearchGender")}
            >
              <option value="ALL">ALL</option>
              <option value="1">Male</option>
              <option value="0">Female</option>
            </select>
          </div>
          <div className="users-table mt-4 mx-4 ">
            <table id="customers">
              <tbody>
                <tr>
                  <th>Email</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Address</th>
                  <th>Gender</th>
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
                        {item.gender === 1 ? <td>Male</td> : <td>Female</td>}
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
