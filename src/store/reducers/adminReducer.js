// xu li cac actions lien quan den app(app khoi dong thanh cong, chuyen doi ngon ngu,...)
import actionTypes from "../actions/actionTypes";

const initialState = {
  isLoadingGender: false,
  genders: [],
  roles: [],
  positions: [],
  users: [],
  topDoctor: [],
  allDoctors: [],
  scheduleTimes: [],
  allRequiredDoctorInfor: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      state.isLoadingGender = true;
      return { ...state };
    case actionTypes.FETCH_GENDER_SUCCESS:
      state.genders = action.data;
      state.isLoadingGender = false;
      return { ...state };
    case actionTypes.FETCH_GENDER_FAILED:
      state.genders = [];
      state.isLoadingGender = false;
      return { ...state };
    case actionTypes.FETCH_POSITION_SUCCESS:
      state.positions = action.data;
      return { ...state };
    case actionTypes.FETCH_POSITION_FAILED:
      state.positions = [];
      return { ...state };
    case actionTypes.FETCH_ROLE_SUCCESS:
      state.roles = action.data;
      return { ...state };
    case actionTypes.FETCH_ROLE_FAILED:
      state.roles = [];
      return { ...state };
    case actionTypes.FETCH_ALL_USER_SUCCESS:
      state.users = action.users;
      return { ...state };
    case actionTypes.FETCH_ALL_USER_FAILED:
      state.users = [];
      return { ...state };
    case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
      state.topDoctor = action.dataDoctor;
      return { ...state };
    case actionTypes.FETCH_TOP_DOCTOR_FAILED:
      state.topDoctor = [];
      return { ...state };
    case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
      state.allDoctors = action.dataAllDoctors;
      return { ...state };
    case actionTypes.FETCH_ALL_DOCTOR_FAILED:
      state.allDoctors = [];
      return { ...state };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_SUCCESS:
      state.scheduleTimes = action.dataTimes;
      return { ...state };
    case actionTypes.FETCH_ALLCODE_SCHEDULE_HOURS_FAILED:
      state.scheduleTimes = [];
      return { ...state };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
      // console.log("check get all", action);
      state.allRequiredDoctorInfor = action.data;
      return { ...state };
    case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
      state.allRequiredDoctorInfor = [];
      return { ...state };
    default:
      return state;
  }
};

export default adminReducer;
