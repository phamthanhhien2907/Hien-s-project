import actionType from "../actions/actionType";
const initState = {
  isLoggedIn: false,
  token: null,
  refreshToken: null,
  current: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionType.LOGIN_SUCCESS:
      console.log(action);
      return {
        ...state,
        isLoggedIn: action.data ? true : false,
        token: action?.data?.access ? action?.data?.access : null,
        refreshToken: action?.data?.refresh ? action?.data?.refresh : null,
        typeLogin: action?.typeLogin,
      };
    case actionType.REGISTER:
      return {
        ...state,
        data: action.data,
      };
    case actionType.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        token: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};
export default authReducer;
