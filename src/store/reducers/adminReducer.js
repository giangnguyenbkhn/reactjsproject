// xu li cac actions lien quan den app(app khoi dong thanh cong, chuyen doi ngon ngu,...)
import actionTypes from "../actions/actionTypes";

const initialState = {
  genders: [],
  roles: [],
  position: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_GENDER_START:
      return { ...state };
    case actionTypes.FETCH_GENDER_SUCCESS:
      let copyState = { ...state };
      copyState.genders = action.data;
      console.log("state", copyState);
      return { ...copyState };
    case actionTypes.FETCH_GENDER_FAILED:
      return { ...state };

    default:
      return state;
  }
};

export default adminReducer;
