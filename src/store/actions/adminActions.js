import actionTypes from "./actionTypes";
//react toastify
import { toast } from "react-toastify";
//goi api o trong actions
import {
  createNewUserService,
  editUserService,
  getAllCodeService,
  getAllDoctors,
  getAllUsers,
  getTopDoctorHomeService,
  saveDetailDoctors,
} from "../../services/userService";
import { deleteUserService } from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,

// });
// muon fire 1 action cua redux phai dung dispatch
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let response = await getAllCodeService("GENDER");
      if (response && response.data && response.data.errCode === 0) {
        dispatch(fetchGenderSuccess(response.data.data));
      } else {
        dispatch(fetchGenderFailed());
      }
    } catch (error) {
      dispatch(fetchGenderFailed());
      console.log(error);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFailed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("POSITION");
      if (response && response.data && response.data.errCode === 0) {
        dispatch(fetchPositionSuccess(response.data.data));
      } else {
        dispatch(fetchPositionFailed());
      }
    } catch (error) {
      dispatch(fetchPositionFailed());
      console.log(error);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFailed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });
      let response = await getAllCodeService("ROLE");
      if (response && response.data && response.data.errCode === 0) {
        dispatch(fetchRoleSuccess(response.data.data));
      } else {
        dispatch(fetchRoleFailed());
      }
    } catch (error) {
      dispatch(fetchRoleFailed());
      console.log(error);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFailed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});
//create new user
export const createNewUser = (userData) => {
  return async (dispatch, getState) => {
    try {
      let response = await createNewUserService(userData);
      console.log("respose from api", response);
      if (response && response.errCode === 0) {
        dispatch(saveUserSuccess());
        //sau khi tao moi ng dung dispatch action getall de cap nhat lai luon
        dispatch(fetchAllUsersStart());
        toast.success("CREATE A NEW USER SUCCESS");
      } else {
        toast.error("CREATE A NEW USER FAILED");
        dispatch(saveUserFailed());
      }
    } catch (error) {
      toast.error("CREATE A NEW USER FAILED");
      dispatch(saveUserFailed());
      console.log(error);
    }
  };
};
export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});

export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});
//read user
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllUsers("ALL");

      // console.log("check top doctor", response1);
      // console.log(response.users);
      if (response && response.users && response.errCode === 0) {
        dispatch(fetchallUsersSuccess(response.users.reverse()));
      } else {
        toast.error("FETCH ALL USER ERROR");
        dispatch(fetchAllUsersFailed());
      }
    } catch (error) {
      toast.error("FETCH ALL USER ERROR");
      dispatch(fetchAllUsersFailed());
      console.log(error);
    }
  };
};
export const fetchallUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});
export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});
//delete user
export const deleteAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await deleteUserService(data);
      if (response && response.errCode === 0) {
        toast.success("DELETE THE USER SUCCESS");
        dispatch(deleteUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("DELETE THE USER ERROR");
        dispatch(deleteUserFailed());
      }
    } catch (error) {
      toast.error("DELETE THE USER ERROR");
      dispatch(deleteUserFailed());
      console.log(error);
    }
  };
};
export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
//edit user
export const editAUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await editUserService(data);
      if (response && response.errCode === 0) {
        toast.success("UPDATE THE USER SUCCESS");
        dispatch(editUserSuccess());
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("UPDATE THE USER ERROR");
        dispatch(editUserFailed());
      }
    } catch (error) {
      toast.error("UPDATE THE USER ERROR");
      dispatch(editUserFailed());
      console.log(error);
    }
  };
};
export const editUserSuccess = () => ({
  type: actionTypes.EDIT_USER_SUCCESS,
});
export const editUserFailed = () => ({
  type: actionTypes.EDIT_USER_FAILED,
});
export const fetchTopDoctor = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getTopDoctorHomeService("");
      // console.log(response);
      if (response && response.response.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
          dataDoctor: response.response.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_TOP_DOCTOR_FAILED,
      });
    }
  };
};
//get all doctors
export const fetchAllDoctors = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllDoctors();
      // console.log(response.doctors.data);
      if (response && response.doctors.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
          dataAllDoctors: response.doctors.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALL_DOCTOR_FAILED,
      });
    }
  };
};
//
export const saveDetailDoctor = (data) => {
  return async (dispatch, getState) => {
    try {
      let response = await saveDetailDoctors(data);
      console.log(response);
      if (response && response.response.errCode === 0) {
        toast.success("SAVE INFOR DETAIL DOCTOR SUCCESS");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
        });
        dispatch(fetchAllDoctors());
      } else {
        toast.error("SAVE INFOR DETAIL DOCTOR FAILED");
        dispatch({
          type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("SAVE INFOR DETAIL DOCTOR FAILED");
      dispatch({
        type: actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
      });
    }
  };
};
//fetch all time
export const fetchAllScheduleHours = (type) => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService(type);
      // console.log(response.doctors.data);
      if (response && response.data.errCode === 0) {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS,
          dataTimes: response.data.data,
        });
      } else {
        dispatch({
          type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
        });
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED,
      });
    }
  };
};
// let response1 = await getTopDoctorHomeService(2);
//fetch price doctor
export const getRequiredDoctorInfor = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START,
      });
      let responsePrice = await getAllCodeService("PRICE");
      let responsePayment = await getAllCodeService("PAYMENT");
      let responseProvince = await getAllCodeService("PROVINCE");
      if (
        responsePrice &&
        responsePrice.data &&
        responsePrice.data.errCode === 0 &&
        responsePayment &&
        responsePayment.data &&
        responsePayment.data.errCode === 0 &&
        responseProvince &&
        responseProvince.data &&
        responseProvince.data.errCode === 0
      ) {
        let data = {
          resPrice: responsePrice.data,
          resPayment: responsePayment.data,
          resProvince: responseProvince.data,
        };
        dispatch(fetchRequiredDoctorInforSuccess(data));
      } else {
        dispatch(fetchRequiredDoctorInforFailed());
      }
    } catch (error) {
      dispatch(fetchRequiredDoctorInforFailed());
      console.log(error);
    }
  };
};
export const fetchRequiredDoctorInforSuccess = (allRequiredData) => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
  data: allRequiredData,
});
export const fetchRequiredDoctorInforFailed = () => ({
  type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
});
