import actionTypes from "./actionTypes";
//goi api o trong actions
import { getAllCodeService } from "../../services/userService";
// export const fetchGenderStart = () => ({
//   type: actionTypes.FETCH_GENDER_START,

// });
// muon fire 1 action cua redux phai dung dispatch
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      let response = await getAllCodeService("GENDER");
      if (response && response.data && response.data.errCode === 0) {
        console.log(getState);
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
